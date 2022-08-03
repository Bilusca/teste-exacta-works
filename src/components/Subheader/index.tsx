import { Info, InfoList, SubheaderContainer } from './styles'

export function Subheader() {
  return (
    <SubheaderContainer>
      <InfoList>
        <li>
          <Info>Me chamo:</Info>
          <Info isPersonInfo>Paul Irish</Info>
          <Info isCpf>
            <b>CPF:</b> 123.456.789-10
          </Info>
        </li>
        <li>
          <Info>Preciso de:</Info>
          <Info isPersonInfo>R$ 2.000</Info>
        </li>
        <li>
          <Info>Quero parcelar em:</Info>
          <Info isPersonInfo>12 vezes</Info>
        </li>
        <li>
          <Info>Para:</Info>
          <Info isPersonInfo>Comprar uma bike</Info>
        </li>
      </InfoList>
    </SubheaderContainer>
  )
}
