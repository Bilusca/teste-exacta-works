import styled, { css, keyframes } from 'styled-components'

export const RegistrationContainer = styled.main`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  h1 {
    margin: 5rem 0;
    text-transform: uppercase;
  }
`

export const FormContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: ${(props) => props.theme.pageWidth};

  gap: 1.75rem;

  margin: 0 auto;
`
interface FormControllerProps {
  isRow?: boolean
  flex?: number
}

export const FormController = styled.div<FormControllerProps>`
  display: flex;
  flex-direction: ${(props) => (props.isRow ? 'row' : 'column')};

  ${(props) =>
    props.flex &&
    css`
      flex: ${props.flex};
    `}

  &:focus-within {
    label {
      color: ${(props) => props.theme['blue-500']};
    }
  }

  label {
    font-size: 1.25rem;
    font-weight: bold;
    margin-bottom: 0.75rem;
    text-transform: uppercase;

    &.error {
      color: ${(props) => props.theme['red-500']};
    }
  }

  span {
    display: flex;
    align-items: center;
    font-size: 1.25rem;
    font-weight: bold;
    margin-right: 1.25rem;
    text-transform: uppercase;
  }
`

interface InputContainerProps {
  centered?: boolean
}

export const InputContainer = styled.div<InputContainerProps>`
  display: flex;
  justify-content: space-between;
  width: 100%;
  gap: 1.25rem;

  ${(props) =>
    props.centered &&
    css`
      align-items: center;
      justify-content: center;
    `}
`

export const InputBase = styled.input`
  height: 3.125rem;
  font-size: 1rem;
  border-radius: ${(props) => props.theme.radius};
  border: 2px solid ${(props) => props.theme['gray-700']};
  padding: 0.75rem 0.75rem;
  background-color: ${(props) => props.theme.white};

  &::after {
    content: '';
    width: 1.25rem;
    height: 2px;
    background: red;
    position: relative;
    bottom: 50%;
    right: -100%;
  }

  &.error {
    border: 2px solid ${(props) => props.theme['red-500']};
    box-shadow: 0 0 2px ${(props) => props.theme['red-500']};
  }

  &:focus {
    border: 2px solid ${(props) => props.theme['blue-500']};
    box-shadow: 0 0 2px ${(props) => props.theme['blue-500']};
  }
`

export const RadioController = styled.div`
  input[type='radio'] {
    display: none;

    & ~ label {
      cursor: pointer;
    }
  }

  label {
    height: 3.125rem;
    width: 18rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background: white;
    border: 2px solid ${(props) => props.theme['gray-700']};
    border-radius: ${(props) => props.theme.radius};
    padding: 1rem;
    margin-bottom: 0;
    text-align: center;
    position: relative;
    margin-right: 1.25rem;
  }

  input[type='radio']:checked + label {
    background: ${(props) => props.theme['blue-500']};
    color: hsla(215, 0%, 100%, 1);
    border-color: ${(props) => props.theme['blue-500']};
  }
`

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`

export const SubmitButton = styled.button`
  height: 3.125rem;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  padding: 0 3rem;
  cursor: pointer;
  text-transform: uppercase;

  svg {
    margin-left: 1rem;
  }

  svg.animate {
    animation: ${rotate} 1s linear infinite;
  }
`

export const ErrorMessage = styled.p`
  color: ${(props) => props.theme['red-500']};
  font-size: 0.75rem;
  display: inline-block;
  font-weight: 500;
  margin-top: 0.5rem;
  margin-bottom: -1.5rem;
`
