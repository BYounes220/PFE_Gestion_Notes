import React from 'react';
import ReactDOM from 'react-dom/client'; // Updated import for React 18
import './index.css'; // Optional: Only if you have this file
import App from './App.jsx'; // Ensure the filename and extension are correct

// Use ReactDOM.createRoot for React 18
const root = ReactDOM.createRoot(document.getElementById('root')); // Matches the `div` in `public/index.html`

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
