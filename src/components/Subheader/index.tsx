import { Info, InfoList, SubheaderContainer } from './styles'

interface Document {
  name: string
  cpf: string
  amount: number
  installments: number
  description: string
}

interface SubheaderProps {
  document: Document
}

export function Subheader({ document }: SubheaderProps) {
  return (
    <SubheaderContainer>
      <InfoList>
        <li>
          <Info>Me chamo:</Info>
          <Info isPersonInfo>{document.name}</Info>
          <Info isCpf>
            <b>CPF:</b> {document.cpf}
          </Info>
        </li>
        <li>
          <Info>Preciso de:</Info>
          <Info isPersonInfo>{document.amount}</Info>
        </li>
        <li>
          <Info>Quero parcelar em:</Info>
          <Info isPersonInfo>
            {document.installments > 1
              ? document.installments + ' vezes'
              : document.installments + ' vez'}
          </Info>
        </li>
        <li>
          <Info>Para:</Info>
          <Info isPersonInfo>{document.description}</Info>
        </li>
      </InfoList>
    </SubheaderContainer>
  )
}
