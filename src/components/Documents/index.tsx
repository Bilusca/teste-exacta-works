import { DocumentsContainer } from './styles'

interface Document {
  emissionDate: string
  expedition: string
  id: string
  rg: string
  gender: string
}

interface DocumentsProps {
  documents: Document[]
}

export function Documents({ documents }: DocumentsProps) {
  return (
    <DocumentsContainer>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Rg</th>
            <th>Orgão expedidor</th>
            <th>Data de emissão</th>
            <th>Sexo</th>
          </tr>
        </thead>
        <tbody>
          {documents.map((document) => (
            <tr key={document.id}>
              <td>{document.id}</td>
              <td>{document.rg}</td>
              <td>{document.expedition}</td>
              <td>{document.emissionDate}</td>
              <td>{document.gender}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </DocumentsContainer>
  )
}
