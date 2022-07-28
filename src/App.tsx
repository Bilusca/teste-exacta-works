import { ThemeProvider } from 'styled-components'
import { defaultTheme } from '@/styles/themes/default'

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <div>
        <h1>Olá mundo</h1>
      </div>
    </ThemeProvider>
  )
}

export default App
