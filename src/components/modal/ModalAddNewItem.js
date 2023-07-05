import { useState } from "react";
import {Button, Input, InputLabel, ModalBody, ModalContent, ModalFooter} from "../index";

export default function ModalAddNewItem({
    show = false,
    onHideModal = () => {},
    groupID = "",
    setStateReload,
}) {
    const [newItem, setNewItem] = useState({ name: "", progress_percentage: "" });

    return (
        <ModalBody show={show} onHideModal={onHideModal} title="Create Task">
            <ModalContent>
                <div style={{ marginBottom: "16px" }}>
                    <InputLabel>Task Name</InputLabel>
                    <Input
                        placeholder="Type your Task"
                        value={newItem.name}
                        onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                    />
                </div>
                <div style={{ width: "143px" }}>
                    <InputLabel>Progress</InputLabel>
                    <Input
                        type="number"
                        placeholder="70%"
                        value={newItem.progress_percentage}
                        onChange={(e) => setNewItem({ ...newItem, progress_percentage: e.target.value })}
                    />
                </div>
            </ModalContent>
            <ModalFooter>
                <Button onClick={() => onHideModal(false)}>Cancel</Button>
                <Button color="primary" onClick="">
                    Save Task
                </Button>
            </ModalFooter>
        </ModalBody>
    )
}