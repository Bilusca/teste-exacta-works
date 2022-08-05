import { BlankState } from '@/components/BlankState'
import { Documents } from '@/components/Documents'
import { Loading } from '@/components/Loading'
import { useDocumentContext } from '@/context/DocumentContext'
import { HomeContainer } from './styles'

import { DeleteModalContextProvider } from '@/context/DeleteModalContext'

export function Home() {
  const { documents, loading } = useDocumentContext()

  return (
    <HomeContainer>
      <h1>Documentos cadastrados</h1>
      {loading ? (
        <Loading />
      ) : documents?.length && !loading ? (
        <DeleteModalContextProvider>
          <Documents documents={documents} />
        </DeleteModalContextProvider>
      ) : (
        <BlankState />
      )}
    </HomeContainer>
  )
}
