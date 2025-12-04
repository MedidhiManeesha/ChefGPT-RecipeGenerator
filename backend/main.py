import nest_asyncio
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import torch
from transformers import AutoTokenizer, AutoModelForCausalLM, BitsAndBytesConfig
import uvicorn

# to fix async issues in local environments
nest_asyncio.apply()

# FastAPI app
app = FastAPI(title="AI Recipe Generator - Local Zephyr-7B")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 4-bit quantization config
print("Setting up 4-bit quantization...")
quant_config = BitsAndBytesConfig(
    load_in_4bit=True,
    bnb_4bit_quant_type="nf4",
    bnb_4bit_compute_dtype=torch.float16,
    bnb_4bit_use_double_quant=True,
)

# ZEPHYR-7B-β Model Load
MODEL_ID = "HuggingFaceH4/zephyr-7b-beta"

print(f"Loading {MODEL_ID} in 4-bit... (first run takes ~2–4 minutes)")
print("This will use ~10–12GB VRAM/RAM — perfect for 16GB+ systems")

tokenizer = AutoTokenizer.from_pretrained(MODEL_ID)
model = AutoModelForCausalLM.from_pretrained(
    MODEL_ID,
    quantization_config=quant_config,
    device_map="auto",           # Auto uses GPU if available, else CPU
    torch_dtype=torch.float16,
    low_cpu_mem_usage=True,
)

if tokenizer.pad_token is None:
    tokenizer.pad_token = tokenizer.eos_token

print("ZEPHYR-7B-β Loaded Successfully")

# Request model
class RecipeRequest(BaseModel):
    ingredients: list[str]

# Recipe Generation Function
def generate_recipe(ingredients: list[str]) -> str:
    ings = ", ".join(ingredients)
    
    prompt = f"""<|system|>
You are a world-class creative chef. Create ONE stunning recipe using ONLY these ingredients: {ings}

Requirements:
- Catchy, creative title
- Servings and cooking time
- Full ingredient list with realistic quantities
- 5–8 detailed, numbered steps
- Optional: plating suggestion
- NEVER repeat. NEVER add extra ingredients.
</|system|>
<|user|>
Generate the recipe now.
</|user|>
<|assistant|>"""

    inputs = tokenizer(prompt, return_tensors="pt").to(model.device)
    
    outputs = model.generate(
        **inputs,
        max_new_tokens=600,
        temperature=0.75,
        top_p=0.90,
        repetition_penalty=1.25,
        do_sample=True,
        eos_token_id=tokenizer.eos_token_id,
        pad_token_id=tokenizer.pad_token_id
    )
    
    full_text = tokenizer.decode(outputs[0], skip_special_tokens=True)
    recipe = full_text.split("<|assistant|>")[-1].strip()
    
    return recipe

# API Endpoints
@app.get("/")
def root():
    return {"message": "AI Recipe Generator is running!", "model": "Zephyr-7B-β", "status": "ready"}

@app.get("/health")
def health():
    return {"status": "healthy", "model": "Zephyr-7B-β (4-bit)"}

@app.post("/api/generate-recipe")
async def create_recipe(request: RecipeRequest):
    if not request.ingredients or len(request.ingredients) == 0:
        raise HTTPException(status_code=400, detail="Please provide at least one ingredient")
    
    print(f"Generating recipe for: {', '.join(request.ingredients)}")
    recipe = generate_recipe(request.ingredients)
    return {"recipe": recipe, "status": "success"}

# Run server
if __name__ == "__main__":
    PORT = 8000
    print("\n" + "═" * 80)
    print("AI Recipe Generator (LOCAL) IS STARTING...")
    print(f"Open your frontend and set API_URL to: http://localhost:{PORT}/api/generate-recipe")
    print("Or visit: http://127.0.0.1:8000/health to test")
    print("═" * 80)
    
    uvicorn.run(
        app,
        host="127.0.0.1",
        port=PORT,
        log_level="info"
    )