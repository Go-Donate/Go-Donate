import { useContext } from 'react'
import { IoClose } from 'react-icons/io5'
import { CompanyContext } from '../../../providers/CompanyContext'
import DonationForm from '../../ModalForm/DonationForm'
import ModalBackground from '../style'

function DonationModal() {
  const { setShowModal, selectedCard } = useContext(CompanyContext);

  return (
    <ModalBackground>
      <div>
        <div>
          <h1>{selectedCard.title}</h1>
          <button onClick={() => setShowModal(null)}>
            <IoClose />
          </button>
        </div>

        <DonationForm />
      </div>
    </ModalBackground>
  )
}

export default DonationModal