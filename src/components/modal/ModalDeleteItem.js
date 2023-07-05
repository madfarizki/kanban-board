import { BsExclamationTriangle } from "react-icons/bs";
import { colors } from "../../constants";
import {Button,ModalBody, ModalContent, ModalFooter} from "../index";

export default function ModalDeleteItem({
    show = false,
    onHideModal = () => {},
    groupID = "",
    itemID = "",
    setStateLoad,
}) {
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
                <Button color="danger" onClick="">
                    Delete
                </Button>
            </ModalFooter>
        </ModalBody>
    );
}
