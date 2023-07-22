import React, { useEffect, useState } from 'react'
import {
  Button,
  Input,
  InputLabel,
  ModalBody,
  ModalContent,
  ModalFooter
} from '../index'
import { editItem } from '../../apis/ItemAPI'

interface Item {
  id?: number
  todo_id?: number
  name?: string
  progress_percentage?: number
}

interface ModalEditItemProps {
  show?: boolean
  onHideModal: (value: boolean) => void
  item: Item
  setStateLoad?: (timestamp: number) => void
}

const ModalEditItem: React.FC<ModalEditItemProps> = ({
  show = false,
  onHideModal,
  item,
  setStateLoad
}) => {
  const [editedItem, setEditedItem] = useState<Item>({
    id: item.id,
    todo_id: item.todo_id,
    name: item.name,
    progress_percentage: item.progress_percentage
  })

  useEffect(() => {
    setEditedItem({
      id: item.id,
      todo_id: item.todo_id,
      name: item.name,
      progress_percentage: item.progress_percentage
    })
  }, [item])

  const updateItem = () => {
    // Check if TaskItem todo_id, TaskItem id, editedItem name, or progress_percentage is empty
    if (
      !editedItem.todo_id ||
      !editedItem.id ||
      !editedItem.name ||
      !editedItem.progress_percentage
    ) {
      alert('Task Name dan Progress harus diisi!')
      return
    }

    // Call API function to edit the TaskItem
    editItem(editedItem.id, editedItem.todo_id, editedItem)
      .then(() => {
        alert('Task berhasil diedit.')
        setEditedItem({
          id: 0,
          todo_id: 0,
          name: '',
          progress_percentage: 0
        })
        if (setStateLoad) setStateLoad(new Date().getTime())
        onHideModal(false)
      })
      .catch(() => {
        alert('Error saat mengubah task.')
      })
  }

  return (
    <ModalBody show={show} onHideModal={onHideModal} title="Edit Task">
      <ModalContent>
        <div style={{ marginBottom: '16px' }}>
          <InputLabel>Task Name</InputLabel>
          <Input
            placeholder="Type your task"
            value={editedItem.name}
            onChange={(e) =>
              setEditedItem({ ...editedItem, name: e.target.value })
            }
          />
        </div>
        <div style={{ width: '143px' }}>
          <InputLabel>Progress</InputLabel>
          <Input
            type="number"
            placeholder="70%"
            value={editedItem.progress_percentage}
            onChange={(e) =>
              setEditedItem({
                ...editedItem,
                progress_percentage: Number(e.target.value)
              })
            }
          />
        </div>
      </ModalContent>
      <ModalFooter>
        <Button onClick={() => onHideModal(false)} color="">
          Cancel
        </Button>
        <Button color="primary" onClick={updateItem}>
          Save Task
        </Button>
      </ModalFooter>
    </ModalBody>
  )
}

export default ModalEditItem
