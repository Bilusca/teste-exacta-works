import styled from 'styled-components'

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
  display: grid;
  width: 60rem;

  grid-template-columns: repeat(3, 1fr);
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

  &:nth-child(1),
  &:nth-child(2) {
  }
`

export const InputBase = styled.input`
  height: 3.125rem;
  border-radius: ${(props) => props.theme.radius};
  border: 2px solid ${(props) => props.theme['gray-700']};
  padding: 0.75rem 0;
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
`

export const RadioController = styled.div`
  input[type='radio'] {
    display: none;

    & ~ label {
      cursor: pointer;
    }
  }

  label {
    height: 100%;
    display: block;
    background: white;
    border: 2px solid ${(props) => props.theme['gray-700']};
    border-radius: ${(props) => props.theme.radius};
    padding: 1rem;
    margin-bottom: 1rem;
    text-align: center;
    position: relative;
  }

  input[type='radio']:checked + label {
    background: hsla(150, 75%, 50%, 1);
    color: hsla(215, 0%, 100%, 1);
    box-shadow: 0px 0px 20px hsla(150, 100%, 50%, 0.75);
  }
`
