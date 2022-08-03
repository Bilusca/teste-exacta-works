import { BrowserRouter } from 'react-router-dom'

import { ThemeProvider } from 'styled-components'
import { defaultTheme } from '@/styles/themes/default'
import { GlobalStyle } from '@/styles/global'
import { Router } from './Router'
import { Toaster } from 'react-hot-toast'

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
      <GlobalStyle />
      <Toaster position="top-right" />
    </ThemeProvider>
  )
}

export default App
