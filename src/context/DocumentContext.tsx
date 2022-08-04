import axios from 'axios'
import format from 'date-fns/format'
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'

import { api } from '@/lib/api'
import { selectGender } from '@/lib/selectGender'
import toast from 'react-hot-toast'

interface Document {
  emissionDate: string
  expedition: string
  id: string
  rg: string
  gender: string
}

type ExpeditionOrg = {
  label: string
  value: string
}

type ReponseProps = {
  orgao_emissor: ExpeditionOrg[]
}

interface DocumentContextProps {
  expeditionOrg: ExpeditionOrg[]
  loading: boolean
  documents: Document[]
  handleSetDocuments: (document: Document) => void
}

const DocumentContext = createContext({} as DocumentContextProps)

interface DocumentContextProviderProps {
  children: ReactNode
}

export function DocumentContextProvider({
  children,
}: DocumentContextProviderProps) {
  const [documents, setDocuments] = useState<Document[]>([] as Document[])
  const [loading, setLoading] = useState<boolean>(false)
  const [expeditionOrg, setExpeditionOrg] = useState<ExpeditionOrg[]>(
    [] as ExpeditionOrg[],
  )

  function handleSetDocuments(document: Document) {
    const documentToSave = {
      ...document,
      emissionDate: format(new Date(document.emissionDate), 'dd/MM/yyy'),
      gender: selectGender(document.gender),
    }

    setDocuments([...documents, documentToSave])
  }

  useEffect(() => {
    axios.get<ReponseProps>('data.json').then((response) => {
      setExpeditionOrg(response.data.orgao_emissor)
    })
  }, [])

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
            expedition: expeditionOrg.filter(
              (org) => document.expedition === org.value,
            )[0].label,
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
    <DocumentContext.Provider
      value={{ expeditionOrg, loading, documents, handleSetDocuments }}
    >
      {children}
    </DocumentContext.Provider>
  )
}

export const useDocumentContext = () => useContext(DocumentContext)
