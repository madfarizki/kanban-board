import React from 'react'
import { Button, ModalBody, ModalContent, ModalFooter } from '../index'
import { deleteItem } from '../../apis/ItemAPI'

interface ModalDeleteItemProps {
  show?: boolean
  onHideModal: (value: boolean) => void
  groupID: number
  itemID: any
  setStateLoad?: (timestamp: number) => void
}

const ModalDeleteItem: React.FC<ModalDeleteItemProps> = ({
  show = false,
  onHideModal,
  groupID,
  itemID,
  setStateLoad
}) => {
  const destroyItem = () => {
    // Check if groupID or itemID is missing
    if (!groupID || !itemID) {
      alert('Group ID atau Item ID tidak ditemukan!')
      return
    }

    // Call API function for delete the TaskItem
    deleteItem(groupID, itemID.id)
      .then(() => {
        alert('Task berhasil dihapus.')
        if (setStateLoad) setStateLoad(new Date().getTime())
        onHideModal(false)
      })
      .catch(() => {
        alert('Error saat menghapus data.')
      })
  }

  return (
    <ModalBody show={show} onHideModal={onHideModal} title="Delete Task">
      <ModalContent>
        Are you sure want to delete this task? Your action can`t be reverted.
      </ModalContent>
      <ModalFooter>
        <Button onClick={() => onHideModal(false)} color="">
          Cancel
        </Button>
        <Button color="danger" onClick={destroyItem}>
          Delete
        </Button>
      </ModalFooter>
    </ModalBody>
  )
}

export default ModalDeleteItem
