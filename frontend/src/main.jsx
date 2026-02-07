import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AppContentProvider } from './content/AppContent.jsx'
import {BrowserRouter} from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <AppContentProvider>
    <App />
  </AppContentProvider>
  </BrowserRouter>
)
