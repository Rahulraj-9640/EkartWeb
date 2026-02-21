import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Toaster } from './components/ui/sonner'
import { Provider } from 'react-redux'
import store from './redux/store'
import { PersistGate } from 'redux-persist/integration/react'
import persistStore from 'redux-persist/es/persistStore'

let persistor = persistStore(store)

// Debug: Log environment variables
console.log('🌍 Environment Configuration:')
console.log('Backend URL:', import.meta.env.VITE_URL || 'http://localhost:8000')
console.log('Razorpay Key:', import.meta.env.VITE_RAZORPAY_KEY_ID || 'Not set')
console.log('Environment:', import.meta.env.MODE)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
        <Toaster />
      </PersistGate>
    </Provider>
  </StrictMode>,
)
