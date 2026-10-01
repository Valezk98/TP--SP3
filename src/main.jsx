import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { CarritoProvider } from './context/CarritoContext.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'
import { CheckoutProvider } from './context/CheckoutContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <CarritoProvider>
        <CheckoutProvider>
          <App />
        </CheckoutProvider>
      </CarritoProvider>
    </ThemeProvider>
  </StrictMode>,
)
