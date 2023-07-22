import React, { useState } from 'react'
import {
  Button,
  Input,
  InputLabel,
  ModalBody,
  ModalContent,
  ModalFooter
} from '../index'
import { addItem } from '../../apis/ItemAPI'

interface ModalAddNewItemProps {
  show?: boolean
  onHideModal: (value: boolean) => void
  groupID: number
  setStateLoad?: (timestamp: number) => void
}

const ModalAddNewItem: React.FC<ModalAddNewItemProps> = ({
  show = false,
  onHideModal,
  groupID,
  setStateLoad
}) => {
  const [newItem, setNewItem] = useState({
    name: '',
    progress_percentage: ''
  })

  const createItem = () => {
    if (!groupID || !newItem.name || !newItem.progress_percentage) {
      alert('Task Name dan Progress harus diisi!')
      return
    }

    const parsedGroupID = parseInt(groupID.toString(), 10)

    if (isNaN(parsedGroupID)) {
      alert('Invalid Group ID!')
      return
    }

    addItem(parsedGroupID, newItem)
      .then(() => {
        alert('Task baru berhasil dibuat.')
        setNewItem({ name: '', progress_percentage: '' })
        if (setStateLoad) setStateLoad(new Date().getTime())
        onHideModal(false)
      })
      .catch(() => {
        alert('Error saat menambahkan data.')
      })
  }

  return (
    <ModalBody show={show} onHideModal={onHideModal} title="Create Task">
      <ModalContent>
        <div style={{ marginBottom: '16px' }}>
          <InputLabel>Task Name</InputLabel>
          <Input
            placeholder="Type your Task"
            value={newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
          />
        </div>
        <div style={{ width: '143px' }}>
          <InputLabel>Progress</InputLabel>
          <Input
            type="number"
            placeholder="70%"
            value={newItem.progress_percentage}
            onChange={(e) =>
              setNewItem({
                ...newItem,
                progress_percentage: e.target.value
              })
            }
          />
        </div>
      </ModalContent>
      <ModalFooter>
        <Button onClick={() => onHideModal(false)} color="">
          Cancel
        </Button>
        <Button color="primary" onClick={createItem}>
          Save Task
        </Button>
      </ModalFooter>
    </ModalBody>
  )
}

export default ModalAddNewItem
