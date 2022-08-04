import { Step, StepsContainer } from './styles'

export function Steps() {
  return (
    <StepsContainer>
      <ul>
        <Step completed>
          <span>1</span> Simule
        </Step>
        <Step selected>
          <span>2</span> Preencha o cadástro
        </Step>
        <Step>
          <span>3</span> Revise seu pedido
        </Step>
        <Step>
          <span>4</span> Finalize o pedido
        </Step>
      </ul>
    </StepsContainer>
  )
}
