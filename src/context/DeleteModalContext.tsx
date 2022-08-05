import { createContext, ReactNode, useContext, useState } from 'react'
import toast from 'react-hot-toast'

import { api } from '@/lib/api'
import { ModalLayout } from '@/layouts/ModalLayout'
import { useDocumentContext } from './DocumentContext'

interface DeleteModalContextProps {
  closeModal: () => void
  openModal: (id: string) => void
}

const DeleteModalContext = createContext({} as DeleteModalContextProps)

interface DocumentsApiResponse {
  message: string
}

interface DeleteModalContextProviderProps {
  children: ReactNode
}

export function DeleteModalContextProvider({
  children,
}: DeleteModalContextProviderProps) {
  const { handleDeleteDocument } = useDocumentContext()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [selectedId, setSelectedId] = useState<string>('')

  function closeModal() {
    setIsOpen(false)
    setSelectedId('')
  }

  function openModal(id: string) {
    setIsOpen(true)
    setSelectedId(id)
  }

  const onDelete = async (id: string) => {
    try {
      const response = await api.delete<DocumentsApiResponse>(`documents/${id}`)

      handleDeleteDocument(String(id))

      toast.success(response.data.message)
      closeModal()
    } catch {
      toast.error('Não foi possível excluir o documento')
    }
  }

  return (
    <DeleteModalContext.Provider value={{ closeModal, openModal }}>
      {children}
      <ModalLayout
        isOpen={isOpen}
        setClose={closeModal}
        selectedId={selectedId}
        handleDelete={onDelete}
      />
    </DeleteModalContext.Provider>
  )
}

export const useDeleteModalContext = () => useContext(DeleteModalContext)
