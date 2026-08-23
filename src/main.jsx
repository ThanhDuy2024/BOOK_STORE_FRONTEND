import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { IntlProvider } from "react-intl";
import { BrowserRouter } from "react-router";
import en from "./locales/en.json";
import vi from "./locales/vi.json";
import { LangContextProvider } from './contexts/langContext.jsx';
import { AdminContextProvider } from './contexts/adminContext.jsx';
import { CartContextProvider } from './contexts/cartContext.jsx';
import { CustomerContextProvider } from './contexts/customerContext.jsx';
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <LangContextProvider>
      <CartContextProvider>
        <AdminContextProvider>
          <CustomerContextProvider>
            <App />
          </CustomerContextProvider>
        </AdminContextProvider>
      </CartContextProvider>
    </LangContextProvider>
  </BrowserRouter>
)
