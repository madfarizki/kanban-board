import { useState } from "react";
import {Button, Input, InputLabel, ModalBody, ModalContent, ModalFooter} from "../index";

export default function ModalAddNewGroup({ show = false, onHideModal = () => {}, setStateReload }) {
    const [newGroup, setNewGroup] = useState({ title: "", description: "" });

    return (
        <ModalBody show={show} onHideModal={onHideModal} title="Add New Group">
            <ModalContent>
                <div style={{ marginBottom: "16px" }}>
                    <InputLabel>Title</InputLabel>
                    <Input
                        placeholder="Group title"
                        value={newGroup.title}
                        onChange={(e) => setNewGroup({ ...newGroup, title: e.target.value })}
                    />
                </div>
                <div>
                    <InputLabel>Description</InputLabel>
                    <Input
                        placeholder="Group description"
                        value={newGroup.description}
                        onChange={(e) => setNewGroup({ ...newGroup, description: e.target.value })}
                    />
                </div>
            </ModalContent>
            <ModalFooter>
                <Button onClick={() => onHideModal(false)}>Cancel</Button>
                <Button color="primary" onClick="">
                    Create Group
                </Button>
            </ModalFooter>
        </ModalBody>
    );
}
