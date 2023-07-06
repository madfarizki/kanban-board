import { BsExclamationTriangle } from "react-icons/bs";
import { colors } from "../../constants";
import {Button,ModalBody, ModalContent, ModalFooter} from "../index";
import {deleteItem} from "../../apis/ItemAPI";

export default function ModalDeleteItem({
    show = false,
    onHideModal = () => {},
    groupID = "",
    itemID = "",
    setStateLoad,
}) {

    const destroyItem = () => {

        // Check if groupID or itemID is missing
        if (!groupID || !itemID) {
            alert("Group ID atau Item ID tidak ditemukan!");
            return;
        }

        // Call API function for delete the item
        deleteItem(groupID, itemID)
            .then((response) => {
                alert('Task berhasil dihapus.');
                if (setStateLoad) setStateLoad(new Date().getTime());
                onHideModal(false);
            })
            .catch((error) => {
                alert("Error saat menghapus data.", error);
            });
    };

    return (
        <ModalBody
            show={show}
            onHideModal={onHideModal}
            title={
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <BsExclamationTriangle
                        color={colors.DANGER.MAIN}
                        size={24}
                        style={{ marginRight: "8px" }}
                    />
                    Delete Task
                </div>
            }
        >
            <ModalContent>
                Are you sure want to delete this task? your action can't be reverted.
            </ModalContent>
            <ModalFooter>
                <Button onClick={() => onHideModal(false)}>Cancel</Button>
                <Button color="danger" onClick={destroyItem}>
                    Delete
                </Button>
            </ModalFooter>
        </ModalBody>
    );
}
