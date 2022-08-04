import { BrowserRouter } from 'react-router-dom'

import { ThemeProvider } from 'styled-components'
import { defaultTheme } from '@/styles/themes/default'
import { GlobalStyle } from '@/styles/global'
import { Router } from './Router'
import { Toaster } from 'react-hot-toast'
import { DocumentContextProvider } from './context/DocumentContext'

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <DocumentContextProvider>
          <Router />
        </DocumentContextProvider>
      </BrowserRouter>
      <GlobalStyle />
      <Toaster position="top-right" />
    </ThemeProvider>
  )
}

export default App
