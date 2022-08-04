import styled, { css } from 'styled-components'

export const StepsContainer = styled.div`
  width: 100%;
  padding: 0.75rem 0;
  background-color: ${(props) => props.theme['gray-300']};

  ul {
    width: ${(props) => props.theme.pageWidth};
    margin: 0 auto;
    list-style: none;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`

interface StepProps {
  completed?: boolean
  selected?: boolean
}

export const Step = styled.li<StepProps>`
  text-transform: uppercase;
  font-size: 0.85rem;
  font-weight: bold;
  color: ${(props) => props.theme['gray-900']};

  span {
    display: inline-block;
    margin-right: 0.75rem;
    border: 2px solid ${(props) => props.theme['gray-900']};
    border-radius: 50%;
    padding: 0.25rem 0.5rem;
  }

  ${(props) =>
    props.selected &&
    css`
      span {
        background-color: ${(props) => props.theme['gray-900']};
        color: ${(props) => props.theme['blue-500']};
      }
    `}

  ${(props) =>
    props.completed &&
    css`
      opacity: 0.5;

      span {
        background-color: ${(props) => props.theme['gray-900']};
        color: ${(props) => props.theme['blue-500']};
      }
    `}
`
