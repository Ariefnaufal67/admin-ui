import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ThemeContextProvider } from './context/themeContext.jsx'
import { AuthContextProvider } from './context/authContext.jsx'
import { DarkModeContextProvider } from './context/darkModeContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContextProvider>
      <DarkModeContextProvider>
        <ThemeContextProvider>
          <App />
        </ThemeContextProvider>
      </DarkModeContextProvider>
    </AuthContextProvider>
  </StrictMode>,
)
