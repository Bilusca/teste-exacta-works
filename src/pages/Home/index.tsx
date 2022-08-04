import { useEffect, useState } from 'react'
import { format } from 'date-fns'

import { BlankState } from '@/components/BlankState'
import { Documents } from '@/components/Documents'
import { HomeContainer } from './styles'
import { api } from '@/lib/api'
import { selectGender } from '@/lib/selectGender'
import toast from 'react-hot-toast'
import { Loading } from '@/components/Loading'

interface Document {
  emissionDate: string
  expedition: string
  id: string
  rg: string
  gender: string
}

export function Home() {
  const [documents, setDocuments] = useState<Document[]>()
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    setLoading(true)
    api
      .get<Document[]>('documents')
      .then((resp) => {
        const response = resp.data.map((document) => {
          return {
            ...document,
            emissionDate: format(new Date(document.emissionDate), 'dd/MM/yyy'),
            gender: selectGender(document.gender),
          }
        })

        setDocuments(response)
      })
      .catch(() => {
        toast.error('Não foi possível carregar os documentos')
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  return (
    <HomeContainer>
      <h1>Documentos cadastrados</h1>
      {loading ? (
        <Loading />
      ) : documents?.length && !loading ? (
        <Documents documents={documents} />
      ) : (
        <BlankState />
      )}
    </HomeContainer>
  )
}
