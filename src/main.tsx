import '@/styles/fonts.scss'
import '@/styles/global.scss'
import '@mantine/core/styles.css'
import '@mantine/dates/styles.css'
import '@mantine/notifications/styles.css'
import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <React.Suspense>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.Suspense>
  </StrictMode>,
)
