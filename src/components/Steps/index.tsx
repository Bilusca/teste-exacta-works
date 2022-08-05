import { Step, StepsContainer } from './styles'

interface StepData {
  label: string
  selected: boolean
  completed: boolean
  numberOfStep: number
}

interface StepsProps {
  steps: StepData[]
}

export function Steps({ steps }: StepsProps) {
  return (
    <StepsContainer>
      <ul>
        {steps.map((step) => (
          <Step
            key={step.numberOfStep}
            completed={step.completed}
            selected={step.selected}
          >
            <span>{step.numberOfStep}</span> {step.label}
          </Step>
        ))}
      </ul>
    </StepsContainer>
  )
}
