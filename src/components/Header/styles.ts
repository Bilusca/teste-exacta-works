import styled from 'styled-components'

export const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  padding: 1.5rem;
  flex-direction: row-reverse;
  background-color: ${(props) => props.theme['gray-900']};

  nav {
    display: flex;
    align-items: center;
    gap: 1.25rem;

    a {
      color: ${(props) => props.theme.white};
      font-size: ${(props) => props.theme.fontSize};
      line-height: ${(props) => props.theme.lineHeight};
      font-weight: 700;
      text-decoration: none;
      outline: none;
      transition: color 0.2s ease-in-out;

      &:hover,
      &.active {
        color: ${(props) => props.theme['blue-500']};
      }
    }
  }
`
