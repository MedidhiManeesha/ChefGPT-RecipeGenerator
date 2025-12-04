// src/components/Chat.jsx
import React, { useState, useRef, useEffect } from 'react';

function Chat({ apiUrl, onRecipeGenerated, onConnectionChange }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'assistant',
      content: 'Hi! What ingredients do you have? (e.g., chicken, rice, garlic, lemon)',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Check backend health on mount
  useEffect(() => {
    if (apiUrl) {
      fetch(apiUrl.replace('/api/generate-recipe', '/health'))
        .then(r => onConnectionChange(r.ok))
        .catch(() => onConnectionChange(false));
    }
  }, [apiUrl, onConnectionChange]);

  const parseIngredients = (text) => text.split(',').map(i => i.trim()).filter(Boolean);

  // Simple, fast recipe parser — works perfectly with Zephyr-7B-β
  const parseRecipe = (text) => {
    const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
    let title = lines[0] || "Delicious Recipe";
    let time = "30–45 min";
    let servings = "2–4 servings";
    let ingredients = [];
    let steps = [];
    let inIngredients = false;
    let inSteps = false;

    for (const line of lines) {
      if (line.toLowerCase().includes("serving")) servings = line;
      if (line.match(/\d+ ?(min|hour)/i)) time = line;
      if (line.toLowerCase().includes("ingredient")) inIngredients = true;
      if (line.match(/^\d+\.\s/) || line.toLowerCase().includes("step")) inSteps = true, inIngredients = false;

      if (inIngredients && /[•*-]/.test(line)) {
        const clean = line.replace(/[•*-]\s*/, '').trim();
        const [qty, ...nameParts] = clean.split(/\s{2,}|\s+[-·]\s+/);
        const name = nameParts.join(' ') || clean;
        ingredients.push({ name: name.trim(), quantity: qty?.trim() || "as needed" });
      }

      if (inSteps && line.match(/^\d+\.\s/)) {
        steps.push(line.replace(/^\d+\.\s*/, '').trim());
      }
    }

    return { title, time, servings, ingredients, steps: steps.length ? steps : ["Enjoy your meal!"] };
  };

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMsg = { id: Date.now(), type: 'user', content: inputValue.trim() };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);

    const ingredients = parseIngredients(userMsg.content);

    try {
      const res = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ingredients })
      });

      if (!res.ok) throw new Error("Backend error");

      const { recipe: rawRecipe } = await res.json();
      const parsed = parseRecipe(rawRecipe);

      onRecipeGenerated(parsed);

      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        type: 'assistant',
        content: rawRecipe,
        timestamp: new Date()
      }]);

    } catch (err) {
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        type: 'assistant',
        content: "Sorry, the chef is offline. Please check your connection or try again later.",
        timestamp: new Date()
      }]);
      onConnectionChange(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-amber-50 to-orange-50">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-20">
        {messages.map(msg => (
          <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-md px-5 py-3 rounded-2xl shadow-md ${
              msg.type === 'user'
                ? 'bg-orange-500 text-white'
                : 'bg-white text-gray-800 border border-orange-100'
            }`}>
              <p className="text-sm lg:text-base whitespace-pre-wrap leading-relaxed">{msg.content}</p>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white px-5 py-3 rounded-2xl shadow-md border border-orange-100">
              <div className="flex gap-2">
                <span className="w-2 h-2 bg-orange-500 rounded-full animate-bounce"></span>
                <span className="w-2 h-2 bg-orange-500 rounded-full animate-bounce delay-100"></span>
                <span className="w-2 h-2 bg-orange-500 rounded-full animate-bounce delay-200"></span>
              </div>
              <p className="text-sm text-gray-600 mt-2">Chef is cooking...</p>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="bg-white border-t border-orange-200 p-4">
        <div className="max-w-4xl mx-auto flex gap-3">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="chicken, rice, garlic, lemon..."
            className="flex-1 px-6 py-4 rounded-full border border-orange-300 focus:outline-none focus:border-orange-500 text-lg shadow-inner"
            disabled={isLoading}
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !inputValue.trim()}
            className="px-8 py-4 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 text-white rounded-full font-bold shadow-lg transition hover:scale-105 disabled:scale-100"
          >
            {isLoading ? "Cooking..." : "Generate"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chat;