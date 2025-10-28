// frontend/src/index.js

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Importa o seu App.js principal

// Este 'root' é um ID que está no arquivo frontend/public/index.html
const root = ReactDOM.createRoot(document.getElementById('root'));

// Isso "renderiza" (desenha) o seu App.js na página
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);