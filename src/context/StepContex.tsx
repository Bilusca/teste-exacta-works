import { Steps } from '@/components/Steps'
import { createContext, ReactNode, useContext, useState } from 'react'

interface Step {
  label: string
  selected: boolean
  completed: boolean
  numberOfStep: number
}
interface StepContextProps {
  goToNextStep: () => void
  selectedStep: number
}

const StepContext = createContext({} as StepContextProps)

interface StepContextProviderProps {
  children: ReactNode
}

const STEPS: Step[] = [
  {
    numberOfStep: 1,
    label: 'Simule',
    completed: false,
    selected: true,
  },
  {
    numberOfStep: 2,
    label: 'Preencha o cadastro',
    completed: false,
    selected: false,
  },
  {
    numberOfStep: 3,
    label: 'Revise seu pedido',
    completed: false,
    selected: false,
  },
  {
    numberOfStep: 4,
    label: 'Finalize o pedido',
    completed: false,
    selected: false,
  },
]

export function StepContextProvider({ children }: StepContextProviderProps) {
  const [steps, setSteps] = useState<Step[]>(STEPS)
  const [selectedStep, setSelectedStep] = useState<number>(1)

  function goToNextStep() {
    const indexOfStep = steps.findIndex(
      (step) => step.numberOfStep === selectedStep,
    )

    const stepsMutated = steps.map((step, index) => {
      if (index === indexOfStep) {
        return {
          ...step,
          selected: false,
          completed: true,
        }
      }

      if (indexOfStep + 1 === index) {
        return {
          ...step,
          selected: true,
        }
      }

      return step
    })

    setSteps(stepsMutated)
    setSelectedStep(selectedStep + 1)
  }

  return (
    <StepContext.Provider value={{ goToNextStep, selectedStep }}>
      <Steps steps={steps} />
      {children}
    </StepContext.Provider>
  )
}

export const useStepContext = () => useContext(StepContext)
