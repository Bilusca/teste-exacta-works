import styled from 'styled-components'

export const DocumentsContainer = styled.div`
  width: 100%;
  overflow: auto;

  table {
    width: 100%;
    border-collapse: collapse;

    th {
      background-color: ${(props) => props.theme['gray-700']};
      padding: 1rem;
      text-align: left;
      color: ${(props) => props.theme.white};
      font-size: 0.875rem;
      line-height: 1.6;
      &:first-child {
        border-top-left-radius: 8px;
        padding-left: 1.5rem;
      }
      &:last-child {
        border-top-right-radius: 8px;
        padding-right: 1.5rem;
      }
    }

    td {
      background-color: ${(props) => props.theme['gray-300']};
      border-top: 4px solid ${(props) => props.theme['gray-900']};
      padding: 1rem;
      font-size: 0.875rem;
      line-height: 1.6;

      &:first-child {
        padding-left: 1.5rem;
      }

      &:last-child {
        padding-right: 1.5rem;
      }
    }
  }
`

export const ActionsCell = styled.td`
  a,
  button {
    width: 1.85rem;
    height: 1.85rem;
    cursor: pointer;
    outline: none;
    text-decoration: none;
  }

  a {
    margin-right: 0.5rem;
    svg {
      color: ${(props) => props.theme['blue-500']};
      transition: filter 0.3s ease-in-out;
      &:hover {
        filter: brightness(0.8);
      }
    }
  }

  button {
    border: none;
    background: none;
    svg {
      color: ${(props) => props.theme['red-500']};
      transition: filter 0.3s ease-in-out;
      &:hover {
        filter: brightness(0.8);
      }
    }
  }
`
