// I connected the frontend to Colab backend URL

import React, { useState } from 'react';
import RecipeDisplay from './components/RecipeDisplay';
import Chat from './components/Chat';
import './index.css';

const API_URL = "https://ava-electrostrictive-transitorily.ngrok-free.dev/api/generate-recipe"; // If using colab backend
// const API_URL = "http://localhost:8000/api/generate-recipe"; // If using local backend 

function App() {
  const [recipeData, setRecipeData] = useState(null);

  return (
    <div className="h-screen bg-orange-50 flex flex-col lg:flex-row overflow-hidden">
      {/* LEFT: Scrollable Recipe Display */}
      <div className="w-full lg:w-1/2 h-screen overflow-y-auto bg-white shadow-xl">
        <div className="p-6 lg:p-10">
          <RecipeDisplay recipe={recipeData} />
        </div>
      </div>

      {/* RIGHT: Fixed Chat Interface */}
      <div className="w-full lg:w-1/2 h-screen bg-linear-to-br from-amber-50 to-orange-100 flex flex-col overflow-hidden">
        <div className="bg-white shadow-md p-4 border-b shrink-0">
          <h2 className="text-2xl font-bold text-orange-700 flex items-center gap-3">
            AI Recipe Assistant
          </h2>
        </div>
        <Chat 
          apiUrl={API_URL} 
          onRecipeGenerated={(data) => setRecipeData(data)}
        />
      </div>
    </div>
  );
}

export default App;