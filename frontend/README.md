# AI Chef Frontend

Beautiful, modern React chatbot frontend for the AI Chef recipe generation application. Built with React, Vite, and pure JavaScript (no TypeScript).

## Features

- 🎨 Beautiful, responsive UI with dark/light mode support
- 💬 Clean chat interface with message bubbles
- 📝 Recipe formatting with markdown-style rendering
- 🔄 Real-time connection status indicator
- 📱 Fully responsive design for mobile and desktop

## Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Navigate to the frontend directory**:
   ```bash
   cd frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure the API URL**:
   - Open `src/App.jsx`
   - Find the line: `const API_URL = "YOUR_NGROK_URL_HERE";`
   - Replace `"YOUR_NGROK_URL_HERE"` with your ngrok URL from the Colab backend
   - Example: `const API_URL = "https://abcd-1234-5678.ngrok.io";`

4. **Start the development server**:
   ```bash
   npm run dev
   ```

5. **Open your browser**:
   - The app will automatically open at `http://localhost:3000`
   - Or manually navigate to that URL

## Usage

1. **Enter Ingredients**:
   - Type your ingredients in the input field, separated by commas
   - Example: `chicken, rice, garlic, onions, tomatoes`
   - Press Enter or click the Send button (🚀)

2. **Get Recipes**:
   - The AI will generate a complete recipe with:
     - Creative title
     - Full ingredient list with quantities
     - 5-7 numbered cooking steps

3. **View Connection Status**:
   - Check the header for connection status
   - Green dot = Connected to backend
   - Red dot = Disconnected

## Project Structure

```
frontend/
├── src/
│   ├── App.jsx              # Main app component
│   ├── main.jsx             # React entry point
│   ├── index.css            # Global styles
│   └── components/
│       └── Chat.jsx         # Chat UI component
├── public/
│   └── index.html           # HTML template
├── package.json             # Dependencies
├── vite.config.js           # Vite configuration
└── README.md                # This file
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Styling

The app uses CSS custom properties for theming and automatically adapts to:
- **Light mode**: Clean, bright interface
- **Dark mode**: Dark theme based on system preferences

All colors, spacing, and animations are defined in `src/index.css` using CSS variables.

## Troubleshooting

### Connection Issues

- **"Please configure the API URL"**: Make sure you've replaced `YOUR_NGROK_URL_HERE` in `App.jsx`
- **Connection Status shows Disconnected**: 
  - Verify your backend is running in Colab
  - Check that the ngrok URL is correct
  - Make sure there are no typos in the URL

### Build Issues

- **Module not found**: Run `npm install` again
- **Port already in use**: Change the port in `vite.config.js` or kill the process using port 3000

### API Errors

- Check the browser console (F12) for detailed error messages
- Verify your backend logs in Colab
- Ensure CORS is properly configured on the backend

## Development Notes

- The frontend is built with **pure JavaScript and JSX** - no TypeScript
- Uses React 18 with functional components and hooks
- Styling is done with pure CSS (no CSS-in-JS libraries)
- The chat interface is fully custom-built for optimal UX

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

