import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';

// Create the root
const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement); // Declare root after rootElement

// Render the App component
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
