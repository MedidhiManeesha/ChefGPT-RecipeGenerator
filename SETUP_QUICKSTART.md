## Project Setup Steps:

### Prerequisites

- **Google Colab**  (for model inference)
- **Node.js 16+** and npm (for frontend)
- **Python 3.8+** (for backend)
- **ngrok account** (free tier works fine)

My laptop has only 4GB RAM + no GPU, so I did Model training on Google Colab (free T4 GPU):  
- Downloaded and tested models  
- Fine-tuned TinyLlama, later switched to Zephyr 
- Run the final Zephyr-7B-β model  
- Made the FastAPI server publicly accessible via ngrok
- Connected it live to my local React frontend


## Two ways to run the project

## Option 1: Google Colab + Local Frontend

### Step 1: Backend Setup (Google Colab)

1. **Open Google Colab** and create a new notebook

2. **Upload the backend files**:
   - Upload `backend/requirements.txt` to Colab

3. **Install dependencies**:
   ```python
   !pip install -r requirements.txt
   ```

4. **Run the backend**:
   - **Zephyr-7B-β**: Open `notebooks/Zephyr_Model.ipynb` in Colab

5. **Copy the ngrok URL**:
   - The server will print a public URL (e.g., `https://xxxx.ngrok.io/api/generate-recipe`)

### Step 2: Frontend Setup (Local Machine)

1. **Navigate to frontend directory**:
   ```bash
   cd frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure API URL**:
   - Open `frontend/src/App.jsx`
   - Replace the `API_URL` constant with your ngrok URL from Step 1:
   ```javascript
   const API_URL = "https://xxxx.ngrok.io/api/generate-recipe";
   ```

4. **Start the frontend**:
   ```bash
   npm run dev
   ```

5. **Open your browser**:
   - Navigate to `http://localhost:3000`
   - Start generating recipes!

---

## Option 2: Run locally (only if you have 16GB+ RAM + good GPU)

1.  **Install Python dependencies for the backend**

``` bash
cd backend
pip install -r requirements.txt
```

### Download and run the Zephyr-7B-β model locally

When you start the server, it will automatically download the
4-bit quantized version of Zephyr (\~5--6 GB download).\
Make sure you have at least **12--14 GB VRAM free** (or **16GB+ system
RAM**).

### Start the FastAPI backend

``` bash
uvicorn main:app --reload --port 8000
```

You need to get this kind of output:

    Model loaded successfully!
    Server running at http://localhost:8000

### In another terminal, start the React frontend

``` bash
cd frontend
npm install
npm run dev
```

### Set the backend URL

When the frontend opens, it will ask for the API URL.\
Just type or paste this:

    http://localhost:8000/api/generate-recipe

Press Enter → the app connects instantly.

### Done!

Open **http://localhost:5173** (or the port Vite shows) and start
typing ingredients.


