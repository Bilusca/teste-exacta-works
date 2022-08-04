import styled from 'styled-components'

export const HomeContainer = styled.main`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: ${(props) => props.theme.pageWidth};
  margin: 0 auto;

  h1 {
    margin: 5rem 0;
    text-transform: uppercase;
  }
`
