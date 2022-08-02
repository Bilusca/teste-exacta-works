import styled, { css } from 'styled-components'

export const RegistrationContainer = styled.main`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  h1 {
    margin-bottom: 5rem;
  }
`

export const FormContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 60rem;

  gap: 1.25rem;

  margin: 0 auto;
`
interface FormControllerProps {
  isRow?: boolean
}

export const FormController = styled.div<FormControllerProps>`
  display: flex;
  flex-direction: ${(props) => (props.isRow ? 'row' : 'column')};

  label {
    font-size: 1.25rem;
    font-weight: bold;
    margin-bottom: 0.75rem;
  }

  span {
    display: flex;
    align-items: center;
    font-size: 1.25rem;
    font-weight: bold;
    margin-right: 1.25rem;
  }

  &:nth-child(1),
  &:nth-child(2) {
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

  & > div {
    flex: 1;
  }
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
    background: hsla(150, 75%, 50%, 1);
    color: hsla(215, 0%, 100%, 1);
    box-shadow: 0px 0px 20px hsla(150, 100%, 50%, 0.75);
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

  svg {
    margin-left: 1rem;
  }
`

export const ErrorMessage = styled.p`
  color: ${(props) => props.theme['red-500']};
  font-size: 0.75rem;
  display: inline-block;
  font-weight: 500;
  margin-top: 0.5rem;
  margin-bottom: -1.125rem;
`
