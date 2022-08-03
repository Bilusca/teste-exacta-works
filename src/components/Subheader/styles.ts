import styled, { css } from 'styled-components'

export const SubheaderContainer = styled.div`
  display: flex;
  width: 100%;
  background-color: ${(props) => props.theme['gray-700']};
`

export const InfoList = styled.ul`
  display: flex;
  list-style: none;
  width: ${(props) => props.theme.pageWidth};
  margin: 0.75rem auto;
  gap: 2.5rem;

  li {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;

    &:first-child {
      flex: 1;
    }
  }
`

interface InfoProps {
  isPersonInfo?: boolean
  isCpf?: boolean
}

export const Info = styled.span<InfoProps>`
  text-transform: uppercase;
  font-weight: bold;
  color: ${(props) => props.theme['blue-500']};
  font-size: 0.65rem;

  ${(props) =>
    props.isPersonInfo &&
    css`
      font-size: 1.75rem;
      color: ${(props) => props.theme.white};
    `}

  ${(props) =>
    props.isCpf &&
    css`
      color: ${(props) => props.theme.white};

      b {
        color: ${(props) => props.theme['blue-500']};
      }
    `}
`
