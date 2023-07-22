import React, { useState } from 'react'
import { BiTrash, BiEditAlt } from 'react-icons/bi'
import { FiArrowRight, FiArrowLeft } from 'react-icons/fi'
import { FaPlus } from 'react-icons/fa'
import {
  Header,
  HeaderText,
  Button,
  GroupLabel,
  BoxContainer,
  GroupDesc,
  BoxItem,
  ItemName,
  BorderLine,
  ProgressBar,
  Setting,
  SettingMenu,
  NewItemButton,
  ModalAddNewItem,
  ModalAddNewGroup,
  ModalEditItem,
  ModalDeleteItem
} from '../components'

import { useFetchGroups } from '../hooks/useFetchGroups'
import { useFetchItems } from '../hooks/useFetchItems'
import { useDragAndDrop } from '../hooks/useDragAndDrop'

// Import library for drag and drop TaskItem
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { useSignIn } from '../hooks/useSignIn.tsx'

const MODAL_SHOW = {
  ADD_NEW_GROUP: 'ADD_NEW_GROUP',
  ADD_NEW_ITEM: 'ADD_NEW_ITEM',
  DELETE_ITEM: 'DELETE_ITEM',
  EDIT_ITEM: 'EDIT_ITEM'
}

const Home: React.FC = () => {
  const [modalType, setModalType] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [groupID, setGroupID] = useState<number>(0)
  const [selectedItem, setSelectedItem] = useState({})
  const [load, setLoad] = useState(new Date().getTime())

  const isSignedIn = useSignIn()

  React.useEffect(() => {
    if (localStorage.getItem('token')) {
      setLoad(new Date().getTime());
    }
  }, [useSignIn()]);

  const groupData = useFetchGroups(load)
  const itemData = useFetchItems(groupData)

  const handleDataFetch = () => {
    setLoad(new Date().getTime());
  };

  const { handleDragEnd, moveTask } = useDragAndDrop(itemData, handleDataFetch)

  return (
    <>
      {isSignedIn ? (
        <>
          {/* Modal components for adding new TaskGroup, adding new TaskItem, editing TaskItem, and deleting TaskItem*/}
          {modalType === MODAL_SHOW.ADD_NEW_GROUP && (
            <ModalAddNewGroup
              show={showModal}
              onHideModal={() => setShowModal(false)}
              setStateLoad={setLoad}
            />
          )}

          {modalType === MODAL_SHOW.ADD_NEW_ITEM && (
            <ModalAddNewItem
              show={showModal}
              onHideModal={() => setShowModal(false)}
              groupID={groupID}
              setStateLoad={setLoad}
            />
          )}

          {modalType === MODAL_SHOW.EDIT_ITEM && (
            <ModalEditItem
              show={showModal}
              onHideModal={() => setShowModal(false)}
              item={selectedItem}
              setStateLoad={setLoad}
            />
          )}

          {modalType === MODAL_SHOW.DELETE_ITEM && (
            <ModalDeleteItem
              show={showModal}
              onHideModal={() => setShowModal(false)}
              groupID={groupID}
              itemID={selectedItem}
              setStateLoad={setLoad}
            />
          )}

          {/* Header section */}
          <section>
            <Header>
              <HeaderText>Product Roadmap</HeaderText>
              <Button
                color="primary"
                onClick={() => {
                  setModalType(MODAL_SHOW.ADD_NEW_GROUP)
                  setShowModal(true)
                }}>
                <FaPlus size="12" style={{ marginRight: '4px' }} /> Add New Group
              </Button>
            </Header>
          </section>

          {groupData.length === 0 && (
            <p style={{ textAlign: 'center' }}>
              Data belum tersedia, silahkan tambahkan group baru.
            </p>
          )}

          {/* Main section */}
          <DragDropContext onDragEnd={handleDragEnd}>
            <section className="main">
              {groupData.map((group, index) => {
                const groupItems = itemData[group.id] || []

                const idx = index + 1

                const colors = ['primary', 'secondary', 'danger', 'success']
                const color = colors[(idx - 1) % colors.length]

                return (
                  <BoxContainer color={color} key={index}>
                    <GroupLabel color={color}>{group.title}</GroupLabel>
                    <GroupDesc>{group.description}</GroupDesc>

                    <Droppable droppableId={group.id.toString()}>
                      {(provided: any) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '12px',
                            width: '100%'
                          }}>
                          {groupItems && groupItems.length > 0 ? (
                            groupItems.map((item, taskIndex) => (
                              <Draggable
                                draggableId={item.id.toString()}
                                index={taskIndex}
                                key={item.id}>
                                {(provided: any) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}>
                                    <BoxItem>
                                      <ItemName>{item.name}</ItemName>
                                      <BorderLine />
                                      <div className="container">
                                        <div style={{ width: '100%' }}>
                                          <ProgressBar
                                            progress={item.progress_percentage}
                                          />
                                        </div>
                                        <Setting>
                                          <div>
                                            {index !== groupData.length - 1 && (
                                              <SettingMenu
                                                color="PRIMARY"
                                                icon={<FiArrowRight />}
                                                onClick={() => {
                                                  moveTask(
                                                    groupData[index].id,
                                                    item.id,
                                                    taskIndex,
                                                    item,
                                                    'right',
                                                    setLoad,
                                                    groupData
                                                  )
                                                }}>
                                                Move Right
                                              </SettingMenu>
                                            )}
                                            {index !== 0 && (
                                              <SettingMenu
                                                color="PRIMARY"
                                                icon={<FiArrowLeft />}
                                                onClick={() => {
                                                  moveTask(
                                                    groupData[index].id,
                                                    item.id,
                                                    taskIndex,
                                                    item,
                                                    'left',
                                                    setLoad,
                                                    groupData
                                                  )
                                                }}>
                                                Move Left
                                              </SettingMenu>
                                            )}
                                            <SettingMenu
                                              color="PRIMARY"
                                              icon={<BiEditAlt />}
                                              onClick={() => {
                                                setGroupID(group?.id)
                                                setSelectedItem(item)
                                                setModalType(MODAL_SHOW.EDIT_ITEM)
                                                setShowModal(true)
                                              }}>
                                              Edit
                                            </SettingMenu>
                                            <SettingMenu
                                              color="DANGER"
                                              icon={<BiTrash />}
                                              onClick={() => {
                                                setGroupID(group?.id)
                                                setSelectedItem(item)
                                                setModalType(MODAL_SHOW.DELETE_ITEM)
                                                setShowModal(true)
                                              }}>
                                              Delete
                                            </SettingMenu>
                                          </div>
                                        </Setting>
                                      </div>
                                    </BoxItem>
                                  </div>
                                )}
                              </Draggable>
                            ))
                          ) : (
                            <BoxItem>No Task</BoxItem>
                          )}
                        </div>
                      )}
                    </Droppable>

                    <NewItemButton
                      onClick={() => {
                        setGroupID(group.id)
                        setModalType(MODAL_SHOW.ADD_NEW_ITEM)
                        setShowModal(true)
                      }}>
                      New Task
                    </NewItemButton>
                  </BoxContainer>
                )
              })}
            </section>
          </DragDropContext>

        </>
      ) : (
        <p style={{ textAlign: 'center' }}>Harap tunggu, sedang melakukan login otomatis.</p>
      )}
    </>
  )
}
export default Home
