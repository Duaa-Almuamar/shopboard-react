import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Same order as the original shopboard (shared styles first)
import './styles/base.css'
import './styles/layout.css'
import './styles/products.css'
import './styles/cart.css'
import './styles/toast.css'
import './styles/react-root.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
