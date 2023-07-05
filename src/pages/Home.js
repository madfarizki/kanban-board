import { useState } from "react";
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
import { groups, items } from "../constants";

const MODAL_SHOW = {
    ADD_NEW_GROUP: "ADD_NEW_GROUP",
    ADD_NEW_ITEM: "ADD_NEW_ITEM",
    DELETE_ITEM: "DELETE_ITEM",
    EDIT_ITEM: "EDIT_ITEM"
};

export default function Home() {
    const [modalType, setModalType] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [groupID, setGroupID] = useState("");
    const [selectedItem, setSelectedItem] = useState({});
    const [load, setLoad] = useState(new Date().getTime());

    return (
        <>
            // Modal components for adding new group, adding new item, editing item, and deleting item
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
                    taskID={selectedItem.id}
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

            {/* Main section */}
            <section className="main">
                {groups.map((group) => {
                    const groupItems = items[group.id];

                    return (
                        <BoxContainer color="primary" key={group.id}>
                            <GroupLabel color="primary">{group.title}</GroupLabel>
                            <GroupDesc>{group.description}</GroupDesc>

                            {groupItems && groupItems.length > 0 ? (
                                groupItems.map((item, index) => (
                                    <BoxItem key={index}>
                                        <ItemName>{item.name}</ItemName>
                                        <BorderLine />
                                        <div className="container">
                                            <div style={{ width: "100%" }}>
                                                <ProgressBar progress={item.progress_percentage} />
                                            </div>
                                            <Setting>
                                                <div>
                                                    <SettingMenu color="primary" icon={<FiArrowRight />} >
                                                        Move Right
                                                    </SettingMenu>
                                                    <SettingMenu color="primary" icon={<FiArrowLeft />} >
                                                        Move Left
                                                    </SettingMenu>
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
                                ))
                            ) : (
                                <BoxItem>No Task</BoxItem>
                            )}

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
        </>
    );
}