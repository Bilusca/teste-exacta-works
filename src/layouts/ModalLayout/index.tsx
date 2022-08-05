import Modal from 'react-modal'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: '1rem 2rem',
    border: '2px solid #202020',
    outline: 'none',
    boxShadow: 'none',
  },
}

interface ModalLayoutProps {
  isOpen: boolean
  selectedId: string
  setClose: () => void
  handleDelete: (id: string) => void
}

export function ModalLayout({
  isOpen,
  selectedId,
  setClose,
  handleDelete,
}: ModalLayoutProps) {
  return (
    <Modal
      isOpen={isOpen}
      style={customStyles}
      shouldCloseOnEsc={true}
      shouldCloseOnOverlayClick={true}
    >
      <h2>Excluir registro</h2>
      <p>Deseja excluir esse registro?</p>
      <div className="actions">
        <button onClick={() => handleDelete(selectedId)}>Sim</button>
        <button onClick={() => setClose()}>Não</button>
      </div>
    </Modal>
  )
}
