import {useEffect, useState} from "react";
import { BiTrash, BiEditAlt } from "react-icons/bi";
import { FiArrowRight, FiArrowLeft } from "react-icons/fi";
import { FaPlus } from "react-icons/fa";
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
    ModalDeleteItem,
} from "../components";
import { signIn } from "../apis/AuthAPI";
import { getGroups } from "../apis/GroupAPI";
import {editItem, getItems} from "../apis/ItemAPI";

// Import library for drag and drop item
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const MODAL_SHOW = {
    ADD_NEW_GROUP: "ADD_NEW_GROUP",
    ADD_NEW_ITEM: "ADD_NEW_ITEM",
    DELETE_ITEM: "DELETE_ITEM",
    EDIT_ITEM: "EDIT_ITEM"
};

export default function Home() {
    const [modalType, setModalType] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [groupData, setGroupData] = useState([]);
    const [groupID, setGroupID] = useState("");
    const [itemData, setItemData] = useState({});
    const [selectedItem, setSelectedItem] = useState({});
    const [load, setLoad] = useState(new Date().getTime());

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token) {
            const payload = {
                email: 'mad@email.com',
                password: 'password',
            };

            signIn(payload)
              .then(() => {
                  console.log('Login success');
                  fetchGroups();
              })
              .catch((error) => {
                  console.error(error.response.data.message);
              });
        } else {
            fetchGroups();
        }
    }, [load]);

    const fetchGroups = () => {
        getGroups()
          .then((response) => {
              const data = response.data;
              setGroupData(data);
          })
          .catch((error) => {
              console.error(error);
          });
    };

    useEffect(() => {
        getItemsForGroups();
    }, [groupData]);

    const getItemsForGroups = () => {
        groupData.forEach((group) => {
            getItems(group.id)
                .then((response) => {
                    const data = response.data;
                    setItemData((prevItems) => ({
                        ...prevItems,
                        [group.id]: data,
                    }));
                })
                .catch((error) => {
                    console.error(error);
                });
        });
    };

    const handleDragEnd = (result) => {
        const { source, destination } = result;

        // Check if the item is dropped to a valid position
        if (!destination) {
            return;
        }

        // Check if the item is dropped to a different position
        if (
            source.droppableId === destination.droppableId &&
            source.index === destination.index
        ) {
            return;
        }

        // Check if the item is dragged within the same group
        if (source.droppableId === destination.droppableId) {
            return;
        }

        // Get the source group and destination group
        const sourceGroupID = source.droppableId;
        const destinationGroupID = destination.droppableId;

        // Get the item that is being dragged
        const draggedItem = itemData[sourceGroupID][source.index];

        // Remove the item from the source group
        const updatedSourceItems = [...itemData[sourceGroupID]];
        updatedSourceItems.splice(source.index, 1);

        // Add the item to the destination group at the appropriate index
        const updatedDestinationItems = [
            ...itemData[destinationGroupID].slice(0, destination.index),
            draggedItem,
            ...itemData[destinationGroupID].slice(destination.index),
        ];

        // Update the itemData state
        setItemData((prevItemData) => ({
            ...prevItemData,
            [sourceGroupID]: updatedSourceItems,
            [destinationGroupID]: updatedDestinationItems,
        }));

        // Send API request to update the item target_todo_id
        editItem(draggedItem.id, sourceGroupID, {
            targetID: destinationGroupID,
            name: draggedItem.name,
            progress_percentage: draggedItem.progress_percentage,
        })
            .then(() => {
                if (setLoad) setLoad(new Date().getTime());
            })
            .catch((error) => {
                alert("Error saat memindahkan task.", error);
            });
    };

    const moveTask = (groupID, taskID, taskIndex, task, direction) => {
        const availableGroups = groupData.map((group) => group.id);
        const currentIndex = availableGroups.indexOf(groupID);

        let targetGroupID;
        if (direction === "left") {
            targetGroupID = findPreviousGroup(availableGroups, currentIndex);
        } else if (direction === "right") {
            targetGroupID = findNextGroup(availableGroups, currentIndex);
        }

        // Get the source group items and remove the task
        const sourceGroupItems = [...itemData[groupID]];
        const updatedSourceItems = sourceGroupItems.filter((item) => item.id !== taskID);

        // Add the task to the destination group
        const destinationGroupItems = [...(itemData[targetGroupID] || [])];
        const updatedDestinationItems = [...destinationGroupItems, task];

        // Update the itemData state
        setItemData((prevItemData) => ({
            ...prevItemData,
            [groupID]: updatedSourceItems,
            [targetGroupID]: updatedDestinationItems,
        }));

        // Send API request to update the task group_id
        editItem(taskID, groupID, {
            targetID: targetGroupID,
            name: task.name,
            progress_percentage: task.progress_percentage,
        })
          .then(() => {
              if (setLoad) setLoad(new Date().getTime());
          })
          .catch((error) => {
              console.error("Error moving task:", error);
          });
    };

    // Find previous group
    const findPreviousGroup = (groups, currentIndex) => {
        for (let i = currentIndex - 1; i >= 0; i--) {
            if (groups[i]) {
                return groups[i];
            }
        }
        return groups[currentIndex]; // Return the same group if no previous group found
    };

    // Find next group
    const findNextGroup = (groups, currentIndex) => {
        for (let i = currentIndex + 1; i < groups.length; i++) {
            if (groups[i]) {
                return groups[i];
            }
        }
        return groups[currentIndex]; // Return the same group if no next group found
    };

    return (
        <>
            {/* Modal components for adding new group, adding new item, editing item, and deleting item*/}
            {modalType === MODAL_SHOW.ADD_NEW_GROUP && (
                <ModalAddNewGroup
                    show={showModal}
                    onHideModal={setShowModal}
                    setStateLoad={setLoad}
                />
            )}

            {modalType === MODAL_SHOW.ADD_NEW_ITEM && (
                <ModalAddNewItem
                    show={showModal}
                    onHideModal={setShowModal}
                    groupID={groupID}
                    setStateLoad={setLoad}
                />
            )}

            {modalType === MODAL_SHOW.EDIT_ITEM && (
                <ModalEditItem
                    show={showModal}
                    onHideModal={setShowModal}
                    item={selectedItem}
                    setStateLoad={setLoad}
                />
            )}

            {modalType === MODAL_SHOW.DELETE_ITEM && (
                <ModalDeleteItem
                    show={showModal}
                    onHideModal={setShowModal}
                    groupID={groupID}
                    itemID={selectedItem.id}
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
                            setModalType(MODAL_SHOW.ADD_NEW_GROUP);
                            setShowModal(true);
                        }}
                    >
                        <FaPlus size="12" style={{ marginRight: '4px' }}/> Add New Group
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
                    {groupData.map((group , index) => {
                        const groupItems = itemData[group.id] || [];

                        const idx = index + 1;

                        const colors = ["primary", "secondary", "danger", "success"];
                        const color = colors[(idx - 1) % colors.length];

                        return (
                            <BoxContainer color={color} key={index}>
                                <GroupLabel color={color}>{group.title}</GroupLabel>
                                <GroupDesc>{group.description}</GroupDesc>

                                <Droppable droppableId={group.id.toString()}>
                                    {(provided) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.droppableProps}
                                            style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%' }}
                                        >
                                            {groupItems && groupItems.length > 0 ? (
                                                groupItems.map((item, taskIndex) => (
                                                    <Draggable draggableId={item.id.toString()} index={taskIndex} key={item.id}>
                                                        {(provided) => (
                                                            <div
                                                                ref={provided.innerRef}
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}
                                                            >
                                                                <BoxItem>
                                                                    <ItemName>{item.name}</ItemName>
                                                                    <BorderLine />
                                                                    <div className="container">
                                                                        <div style={{ width: "100%" }}>
                                                                            <ProgressBar progress={item.progress_percentage} />
                                                                        </div>
                                                                        <Setting>
                                                                            <div>
                                                                                {index !== groupData.length - 1 && (
                                                                                    <SettingMenu color="primary" icon={<FiArrowRight />}
                                                                                                onClick={() => {
                                                                                                moveTask(groupData[index].id, item.id, taskIndex, item, "right");
                                                                                    }} >
                                                                                        Move Right
                                                                                    </SettingMenu>
                                                                                )}
                                                                                {index !== 0 && (
                                                                                    <SettingMenu color="primary" icon={<FiArrowLeft />}
                                                                                                onClick={() => {
                                                                                                moveTask(groupData[index].id, item.id, taskIndex, item, "left");
                                                                                    }}>
                                                                                        Move Left
                                                                                    </SettingMenu>
                                                                                )}
                                                                                <SettingMenu color="primary" icon={<BiEditAlt />}
                                                                                             onClick={() => {
                                                                                                 setGroupID(group?.id);
                                                                                                 setSelectedItem(item);
                                                                                                 setModalType(MODAL_SHOW.EDIT_ITEM);
                                                                                                 setShowModal(true);
                                                                                             }}>
                                                                                    Edit
                                                                                </SettingMenu>
                                                                                <SettingMenu color="danger" icon={<BiTrash />}
                                                                                             onClick={() => {
                                                                                                 setGroupID(group?.id);
                                                                                                 setSelectedItem(item);
                                                                                                 setModalType(MODAL_SHOW.DELETE_ITEM);
                                                                                                 setShowModal(true);
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
                                        setGroupID(group.id);
                                        setModalType(MODAL_SHOW.ADD_NEW_ITEM);
                                        setShowModal(true);
                                    }}
                                >
                                    New Task
                                </NewItemButton>
                            </BoxContainer>
                        );
                    })}
                </section>
            </DragDropContext>
        </>
    );
}