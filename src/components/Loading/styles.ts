import styled, { keyframes } from 'styled-components'

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`

export const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;

  p {
    margin-top: 2rem;
    font-size: 2rem;
  }

  svg.animate {
    animation: ${rotate} 1s linear infinite;
  }
`
