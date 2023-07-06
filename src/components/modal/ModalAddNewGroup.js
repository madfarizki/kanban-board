import { useState } from "react";
import {Button, Input, InputLabel, ModalBody, ModalContent, ModalFooter} from "../index";
import { addGroup } from "../../apis/GroupAPI";

export default function ModalAddNewGroup({ show = false, onHideModal = () => {}, setStateLoad }) {
    const [newGroup, setNewGroup] = useState({ title: "", description: "" });

    const createGroup = () => {

        // Check if newGroup title or description is empty
        if (!newGroup.title || !newGroup.description) {
            alert("Group Title dan Description harus diisi!");
            return;
        }

        // Call API function to add new group
        addGroup(newGroup)
            .then((response) => {
                alert('Group baru berhasil dibuat.');
                setNewGroup({ title: "", description: "" });
                if (setStateLoad) setStateLoad(new Date().getTime());
                onHideModal(false);
            })
            .catch((error) => {
              alert("Error saat menambahkan data.", error);
            });
    };

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
                <Button color="primary" onClick={createGroup}>
                    Create Group
                </Button>
            </ModalFooter>
        </ModalBody>
    );
}
