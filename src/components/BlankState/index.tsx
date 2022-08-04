import { Files } from 'phosphor-react'
import { BlankStateContainer } from './styles'

export function BlankState() {
  return (
    <BlankStateContainer>
      <Files size={250} weight="duotone" />
      <p>Nenhum documento cadastrado</p>
    </BlankStateContainer>
  )
}
