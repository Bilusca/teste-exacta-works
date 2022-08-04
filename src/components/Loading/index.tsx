import { CircleNotch } from 'phosphor-react'
import { LoadingContainer } from './styles'

export function Loading() {
  return (
    <LoadingContainer>
      <CircleNotch className="animate" size={120} weight="duotone" />
      <p>Carregando...</p>
    </LoadingContainer>
  )
}
