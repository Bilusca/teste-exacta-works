import { useState } from 'react'
import toast from 'react-hot-toast'
import { format } from 'date-fns'

import { useDocumentContext } from '@/context/DocumentContext'
import { api } from '@/lib/api'
import { Form } from '@/components/Form'
import { StepContextProvider } from '@/context/StepContex'

import { RegistrationContainer } from './styles'

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

export function Registration() {
  const { handleSetDocuments } = useDocumentContext()

  const [loading, setLoading] = useState<boolean>(false)

  const onSubmit = async (data: Inputs) => {
    setLoading(true)

    try {
      const response = await api.post<DocumentsApiResponse>('documents', data)
      const document = {
        ...response.data.document,
        emissionDate: format(
          new Date(response.data.document.emissionDate),
          'dd/MM/yyy',
        ),
      }
      handleSetDocuments(document)

      toast.success(response.data.message)
    } catch {
      toast.error('Não foi possível cadastrar o documento')
    } finally {
      setLoading(false)
    }
  }

  return (
    <RegistrationContainer>
      <StepContextProvider>
        <>
          <h1>Dados pessoais</h1>
          <Form loading={loading} onSubmitForm={onSubmit} />
        </>
      </StepContextProvider>
    </RegistrationContainer>
  )
}
