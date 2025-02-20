import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { AuthProvider } from "./hooks/useAuth";
import { FavoriteProvider } from './context/FavoriteContext';
import { CartProvider } from './context/CartContext';


import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <FavoriteProvider>
        <CartProvider>
        <App />
        </ CartProvider>
      </FavoriteProvider>
    </AuthProvider>
  </React.StrictMode>,
)
