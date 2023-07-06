import { useState } from "react";
import { Button, Input, InputLabel, ModalBody, ModalContent, ModalFooter } from "../index";
import { addItem } from "../../apis/ItemAPI";

export default function ModalAddNewItem({
    show = false,
    onHideModal = () => {},
    groupID = "",
    setStateLoad,
}) {
    const [newItem, setNewItem] = useState({ name: "", progress_percentage: "" });

    const createItem = () => {

        // Check if groupID, newItem name, or progress_percentage is empty
        if (!groupID || !newItem.name || !newItem.progress_percentage) {
            alert("Task Name dan Progress harus diisi!");
            return;
        }

        // Call API function to add new item
        addItem(groupID, newItem)
          .then((response) => {
              alert('Task baru berhasil dibuat.');
              setNewItem({ name: "", progress_percentage: "" });
              if (setStateLoad) setStateLoad(new Date().getTime());
              onHideModal(false);
          })
          .catch((error) => {
              alert("Error saat menambahkan data.", error);
          });
    };

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
                <Button color="primary" onClick={createItem}>
                    Save Task
                </Button>
            </ModalFooter>
        </ModalBody>
    )
}