import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box
  }

  :focus {
    outline: 0;
    box-shadow: none;
  }

  body {
    background-color: #fff;
    color: #333;
    -webkit-font-smoothing: antialiased;
  }

  body, input-security, textarea, button {
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-style: ${(props) => props.theme.fontSize};
  }

  .ReactModal__Content h2 {
    font-size: 2rem;
    margin-bottom: 0.75rem;
  }

  .ReactModal__Content p {
    font-size: 1.2rem;
    margin-bottom: 1.85rem;
  }

  .ReactModal__Content .actions {
    display: flex;
    gap: 0.85rem;
    justify-content: flex-end;
  }

  .ReactModal__Content .actions button {
    font-size: 1.25rem;
    font-weight: bold;
    padding: 0.725rem 0.85rem;
    cursor: pointer;
    outline: none;
    border: none;
    background: ${(props) => props.theme['blue-500']};
    color: ${(props) => props.theme.white};
    transition: filter 0.2s ease-in-out;
  }

  .ReactModal__Content .actions button:hover {
    filter: brightness(0.8);
  }

  .ReactModal__Content .actions button:first-child {
    background: ${(props) => props.theme['red-500']};
  }
`
