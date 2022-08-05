import { Steps } from '@/components/Steps'
import { createContext, ReactNode, useContext, useState } from 'react'

interface Step {
  label: string
  selected: boolean
  completed: boolean
  numberOfStep: number
}

type FromTo = {
  from: number
  to: number
}

interface StepContextProps {
  moveStep: ({ from, to }: FromTo) => void
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

  function goToNextStep({ from, to }: FromTo) {
    const indexStepFrom = steps.findIndex((step) => step.numberOfStep === from)
    const indexStepTo = steps.findIndex((step) => step.numberOfStep === from)

    const stepsMutated = steps.map((step, index) => {
      if (index === indexOfStep) {
        return {
          ...step,
          selected: false,
          completed: true,
        }
      }

      return step
    })

    setSteps(stepsMutated)
  }

  return (
    <StepContext.Provider value={{ goToNextStep }}>
      <Steps steps={steps} />
      {children}
    </StepContext.Provider>
  )
}

export const useStepContext = () => useContext(StepContext)
