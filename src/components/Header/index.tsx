import { NavLink } from 'react-router-dom'
import { HeaderContainer } from './styles'

export function Header() {
  return (
    <HeaderContainer>
      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="cadastro">Cadastro</NavLink>
      </nav>
    </HeaderContainer>
  )
}
