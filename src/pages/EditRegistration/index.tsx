import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import toast from 'react-hot-toast'
import { format } from 'date-fns'

import { StepContextProvider } from '@/context/StepContex'
import { useDocumentContext } from '@/context/DocumentContext'
import { api } from '@/lib/api'
import { Form } from '@/components/Form'
import { EditRegistrationContainer } from './styles'
import { Subheader } from '@/components/Subheader'

type Inputs = {
  name: string
  cpf: string
  amount: number
  installments: number
  rg: string
  emissionDate: Date
  expedition: string
  gender: 'male' | 'female'
  description: string
}

interface DocumentsApiResponse {
  message: string
  document: {
    emissionDate: Date
    expedition: string
    gender: string
    id: string
    rg: string
    name: string
    cpf: string
    amount: number
    installments: number
    description: string
  }
}

export function EditRegistration() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { selectDocument, handleUpdateDocuments } = useDocumentContext()

  const document = selectDocument(String(id))

  const [loading, setLoading] = useState(false)

  const onSubmit = async (data: Inputs) => {
    setLoading(true)

    try {
      const response = await api.put<DocumentsApiResponse>(
        `documents/${id}`,
        data,
      )
      const document = {
        ...response.data.document,
        emissionDate: format(
          new Date(response.data.document.emissionDate),
          'dd/MM/yyy',
        ),
      }
      handleUpdateDocuments(String(id), document)

      toast.success(response.data.message)
      navigate('/')
    } catch {
      toast.error('Não foi possível atulizar o documento')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Subheader document={document} />
      <EditRegistrationContainer>
        <StepContextProvider>
          <>
            <h1>Editar dados pessoais</h1>
            <Form
              loading={loading}
              onSubmitForm={onSubmit}
              document={document}
            />
          </>
        </StepContextProvider>
      </EditRegistrationContainer>
    </>
  )
}
