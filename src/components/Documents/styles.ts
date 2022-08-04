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
