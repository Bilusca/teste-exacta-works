import { CaretRight } from 'phosphor-react'
import { RegistrationContainer } from './styles'

export function Registration() {
  return (
    <RegistrationContainer>
      <h1>Dados pessoais</h1>
      <form action="">
        <div>
          <label htmlFor="rg">Número do RG</label>
          <input name="rg" type="text" />
          <label htmlFor="emissionDate">Data de emissão</label>
          <input name="emissionDate" type="date" />
          <label htmlFor="expedition">Orgão expedidor</label>
          <select name="expedition">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
          <label htmlFor="gender">Sexo</label>
          <input type="radio" name="gender" value="M" />
          <input type="radio" name="gender" value="F" />
          <button type="submit">
            Continuar <CaretRight size={24} weight="duotone" />
          </button>
        </div>
      </form>
    </RegistrationContainer>
  )
}
