import format from 'date-fns/format'
import { DateTime } from 'luxon'
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'

import { api } from '@/lib/api'
import { selectGender } from '@/lib/selectGender'
import toast from 'react-hot-toast'

import DATA from '../../data.json'

interface Document {
  name: string
  cpf: string
  amount: number
  installments: number
  description: string
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

interface DocumentContextProps {
  expeditionOrg: ExpeditionOrg[]
  loading: boolean
  documents: Document[]
  handleSetDocuments: (document: Document) => void
  handleUpdateDocuments: (id: string, document: Document) => void
  selectDocument: (id: string) => Document
  handleDeleteDocument: (id: string) => void
}

const DocumentContext = createContext({} as DocumentContextProps)

interface DocumentContextProviderProps {
  children: ReactNode
}

export function DocumentContextProvider({
  children,
}: DocumentContextProviderProps) {
  const shouldFetch = useRef(true)
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
      expedition: expeditionOrg.filter(
        (org) => document.expedition === org.value,
      )[0].label,
    }

    setDocuments([...documents, documentToSave])
  }

  function handleUpdateDocuments(id: string, document: Document) {
    const filteredDocs = documents.filter((doc) => doc.id !== id)

    const documentToSave = {
      ...document,
      id,
      emissionDate: format(
        DateTime.fromFormat(document.emissionDate, 'dd/MM/yyyy').toJSDate(),
        'dd/MM/yyyy',
      ),
      gender: selectGender(document.gender),
      expedition: expeditionOrg.filter(
        (org) => document.expedition === org.value,
      )[0].label,
    }

    setDocuments([...filteredDocs, documentToSave])
  }

  function selectDocument(id: string) {
    const indexOfDoc = documents.findIndex((doc) => doc.id === id)
    const selectedDocument = documents[indexOfDoc]

    const docToEdit = {
      ...selectedDocument,
      expedition: expeditionOrg.filter(
        (org) => selectedDocument.expedition === org.label,
      )[0].value,
      emissionDate: format(
        DateTime.fromFormat(
          selectedDocument.emissionDate,
          'dd/MM/yyyy',
        ).toJSDate(),
        'yyyy-MM-dd',
      ),
      gender: selectedDocument.gender === 'Masculino' ? 'male' : 'female',
    }

    return docToEdit
  }

  function handleDeleteDocument(id: string) {
    const filteredDocuments = documents.filter((document) => document.id !== id)

    setDocuments(filteredDocuments)
  }

  useEffect(() => {
    if (shouldFetch.current) {
      shouldFetch.current = false
      setExpeditionOrg(DATA.orgao_emissor)
    }
  }, [])

  useEffect(() => {
    if (!expeditionOrg.length) return

    setLoading(true)
    api
      .get<Document[]>('documents')
      .then((resp) => {
        const response = resp.data.map((document) => {
          return {
            ...document,
            emissionDate: format(new Date(document.emissionDate), 'dd/MM/yyyy'),
            gender: selectGender(document.gender),
            expedition: expeditionOrg.filter(
              (org) => document.expedition === org.value,
            )[0].label,
          }
        })

        setDocuments(response)
      })
      .catch((e) => {
        console.log(e)
        toast.error('Não foi possível carregar os documentos')
      })
      .finally(() => {
        setLoading(false)
      })
  }, [expeditionOrg])

  return (
    <DocumentContext.Provider
      value={{
        expeditionOrg,
        loading,
        documents,
        handleSetDocuments,
        selectDocument,
        handleUpdateDocuments,
        handleDeleteDocument,
      }}
    >
      {children}
    </DocumentContext.Provider>
  )
}

export const useDocumentContext = () => useContext(DocumentContext)
