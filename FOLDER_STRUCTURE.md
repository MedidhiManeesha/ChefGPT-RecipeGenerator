## Project Structure

```
ai-recipe-generator/
├── notebooks/              # Colab notebooks for model training & inference
│
│   ├── TinyLlama_Model.ipynb      # (Experimental)
│   ├── TinyLlama_Backend.ipynb    
│   └── Zephyr_Model.ipynb         # (Final Model used in project)
│
├── backend/                
│   ├── main.py             # Server implementation
│   ├── requirements.txt    # Python dependencies
│   └── README.md           # Backend documentation
│
├── frontend/               
│   ├── src/
│   │   ├── App.jsx         # Main app component
│   │   ├── components/
│   │   │   ├── Chat.jsx    # Chat interface
│   │   │   └── RecipeDisplay.jsx  # Recipe display component
│   │   └── index.css       # Global styles
│   ├── package.json        
│   └── vite.config.js      
│
├── datasets/               # Recipe datasets
│   ├── recipe_dataset_200.jsonl    
│   └── indian_recipes_1000.jsonl  
│ 
├── README.md               # current file
└── .gitignore             
```
