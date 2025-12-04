# ChefGPT - AI Recipe Generator

> An AI recipe generation system by utilizing fine-tuned language models, creating authentic Indian recipes from your available ingredients.


## Demo Video

**[Watch the Demo](https://drive.google.com/file/d/1DqydFOn9Qj6VbHZ9TQs6bVsTFYG1lS64/view?usp=sharing)** 


---

## Project Overview

This project demonstrates an end-to-end AI system for generating authentic Indian recipes using fine-tuned language models. I experimented with two different models—**TinyLlama-1.1B-chat-v1.0** and **Zephyr-7B-β**—to find the best approach for creative, structured recipe generation.

---

### Key Features

- **Fine-tuned LLM Models**: Used Zephyr-7B-β, an open-source LLM model.
- **Dynamic Recipe Generation**: Creates unique, authentic Indian recipes from ingredient lists
- **Modern React Frontend**: Chat UI with real-time recipe display
- **FastAPI Backend**: Model serving with ngrok tunneling
- **Colab Integration**: Model training and inference pipeline in Google Colab

---

## Model Selection

### Phase 1: TinyLlama (Experimental)

I started by fine-tuning **TinyLlama-1.1B-chat-v1.0** on my custom 1000-recipe Indian dataset using QLoRA in Google Colab. The first training run was a disaster—loss dropped to 0.0000 due to wrong hyperparameters (too high learning rate, no weight decay). After fixing the training arguments (lowered LR, added weight decay, proper batch size + gradient accumulation), I achieved a final loss of ~1.14. The model learned the format but outputs felt repetitive and lacked creativity.

### Phase 2: Zephyr-7B-β (Final Model)

I switched to **Zephyr-7B-β** because it's currently one of the best open models for structured, creative text generation. Running it in Colab (T4 GPU) with 4-bit quantization + ngrok tunneling, I connected it to my local React frontend. The results were stunning—dynamic, authentic Indian recipes with proper unique steps and natural language, all without any fine-tuning!

---

## Model Comparison

| Feature | TinyLlama-1.1B-chat-v1.0 | Zephyr-7B-β (Final) |
|---------|---------------------------|---------------------|
| **Model Size** | 1.1B parameters | 7B parameters |
| **Training** | Fine-tuned with QLoRA | Zero-shot (no fine-tuning) |
| **Dataset** | 1000 Indian recipes | Pre-trained |
| **Training Loss** | ~1.14 (after fixes) | Pre-trained |
| **Output Quality** | Repetitive steps | Authentic & Unique recipes |
| **VRAM Usage** | ~2GB (merged model) | ~8GB (4-bit quantized) |
| **Inference Speed** | Fast (~2-3 seconds) | Moderate (~5-8 seconds) |
| **Best For** | Learning fine-tuning | Production-quality recipes |

---



---

## Tech Stack

### Backend
- **FastAPI** - Modern Python web framework
- **Hugging Face Transformers** - Model loading and inference
- **PyTorch** - Deep learning framework
- **pyngrok** - Public URL tunneling for Colab
- **Pydantic** - Data validation

### Frontend
- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first styling
- **Axios** - HTTP client

### ML/Infrastructure
- **Google Colab** - Training and inference environment
- **QLoRA** - Parameter-efficient fine-tuning (TinyLlama)
- **BitsAndBytes** - 4-bit quantization (Zephyr)
- **Hugging Face Hub** - Model hosting
---
