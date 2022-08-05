import { useDeleteModalContext } from '@/context/DeleteModalContext'
import { Pen, Trash } from 'phosphor-react'
import { NavLink } from 'react-router-dom'
import { ActionsCell, DocumentsContainer } from './styles'

interface Document {
  name: string
  emissionDate: string
  expedition: string
  id: string
  rg: string
  gender: string
  description: string
  amount: number
  installments: number
  cpf: string
}

interface DocumentsProps {
  documents: Document[]
}

export function Documents({ documents }: DocumentsProps) {
  const { openModal } = useDeleteModalContext()

  return (
    <DocumentsContainer>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Nome</th>
            <th>Cpf</th>
            <th>Rg</th>
            <th>Orgão expedidor</th>
            <th>Data de emissão</th>
            <th>Sexo</th>
            <th>Valor pedido</th>
            <th>Nº de parcelas</th>
            <th>Descrição</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {documents.map((document) => (
            <tr key={document.id}>
              <td>{document.id}</td>
              <td>{document.name}</td>
              <td>{document.cpf}</td>
              <td>{document.rg}</td>
              <td>{document.expedition}</td>
              <td>{document.emissionDate}</td>
              <td>{document.gender}</td>
              <td>{document.amount}</td>
              <td>{document.installments}x</td>
              <td>{document.description}</td>
              <ActionsCell>
                <NavLink to={`/cadastro/${document.id}`} title="Editar">
                  <Pen size={24} weight="duotone" />
                </NavLink>
                <button title="Excluir" onClick={() => openModal(document.id)}>
                  <Trash size={24} weight="duotone" />
                </button>
              </ActionsCell>
            </tr>
          ))}
        </tbody>
      </table>
    </DocumentsContainer>
  )
}
