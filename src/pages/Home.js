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
import { groups, items } from "../constants";
import { signIn } from "../apis/AuthAPI";
import { getGroups } from "../apis/GroupAPI";
import { getItems } from "../apis/ItemAPI";

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
        // Auto login by using default user
        if (!localStorage.getItem('token')) {
            const payload = {
                email: 'mad@email.com',
                password: 'password',
            };

            signIn(payload)
                .then((response) => {
                    console.log('Login success');
                })
                .catch((error) => {
                    console.error(error.response.data.message);
                });
        }
    }, []);


    useEffect(() => {
        getGroups()
            .then((response) => {
                const data = response.data;
                setGroupData(data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

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
            <section className="main">
                {groupData.map((group , index) => {
                    const groupItems = itemData[group.id] || [];

                    const idx = index + 1;

                    const colors = ["primary", "secondary", "danger", "success"];
                    const color = colors[(idx - 1) % colors.length];

                    return (
                        <BoxContainer color={color} key={group.index}>
                            <GroupLabel color={color}>{group.title}</GroupLabel>
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