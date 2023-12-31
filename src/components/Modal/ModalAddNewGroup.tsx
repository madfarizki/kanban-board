import React, { useState } from 'react'
import {
  Button,
  Input,
  InputLabel,
  InputTextarea,
  ModalBody,
  ModalContent,
  ModalFooter
} from '../index'
import { addGroup } from '../../apis/GroupAPI'

interface ModalAddNewGroupProps {
  show?: boolean
  onHideModal: () => void
  setStateLoad: (timestamp: number) => void
}

const ModalAddNewGroup: React.FC<ModalAddNewGroupProps> = ({
  show = false,
  onHideModal,
  setStateLoad
}) => {
  const [newGroup, setNewGroup] = useState({ title: '', description: '' })

  const createGroup = () => {
    if (!newGroup.title || !newGroup.description) {
      alert('Group Title dan Description harus diisi!')
      return
    }

    addGroup(newGroup)
      .then(() => {
        alert('Group baru berhasil dibuat.')
        setNewGroup({ title: '', description: '' })
        if (setStateLoad) setStateLoad(new Date().getTime())
        onHideModal()
      })
      .catch(() => {
        alert('Error saat menambahkan data.')
      })
  }

  return (
    <ModalBody show={show} onHideModal={onHideModal} title="Add New Group">
      <ModalContent>
        <div style={{ marginBottom: '16px' }}>
          <InputLabel>Title</InputLabel>
          <Input
            placeholder="Group title"
            value={newGroup.title}
            onChange={(e) =>
              setNewGroup({ ...newGroup, title: e.target.value })
            }
          />
        </div>
        <div>
          <InputLabel>Description</InputLabel>
          <InputTextarea
            placeholder="Group description"
            value={newGroup.description}
            onChange={(e) =>
              setNewGroup({ ...newGroup, description: e.target.value })
            }
          />
        </div>
      </ModalContent>
      <ModalFooter>
        <Button onClick={() => onHideModal()} color="">
          Cancel
        </Button>
        <Button color="primary" onClick={createGroup}>
          Create Group
        </Button>
      </ModalFooter>
    </ModalBody>
  )
}

export default ModalAddNewGroup
