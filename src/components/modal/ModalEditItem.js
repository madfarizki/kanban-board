import {useEffect, useState} from "react";
import {Button, Input, InputLabel, ModalBody, ModalContent, ModalFooter} from "../index";
import {editItem} from "../../apis/ItemAPI";

export default function ModalEditItem({
  show = false,
  onHideModal = () => {},
  item = {},
  setStateLoad,
}) {
    const [editedItem, setEditedItem] = useState({ name: item.name, progress_percentage: item.progress_percentage });

    useEffect(() => {
      setEditedItem({ name: item.name, progress_percentage: item.progress_percentage });
    }, [item]);

  const updateItem = () => {

    // Check if item todo_id, item id, editedItem name, or progress_percentage is empty
    if (!item.todo_id || !item.id || !editedItem.name || !editedItem.progress_percentage) {
      alert("Task Name dan Progress harus diisi!");
      return;
    }

    // Call API function to edit the item
    editItem(item.id, item.todo_id, editedItem)
      .then((response) => {
        alert('Task berhasil diedit.');
        setEditedItem({ name: "", progress_percentage: "" });
        if (setStateLoad) setStateLoad(new Date().getTime());
        onHideModal(false);
      })
      .catch((error) => {
        alert("Error saat mengubah task.", error);
      });
  };

    return (
        <ModalBody show={show} onHideModal={onHideModal} title="Edit Task">
            <ModalContent>
                <div style={{ marginBottom: "16px" }}>
                    <InputLabel>Task Name</InputLabel>
                    <Input
                        placeholder="Type your task"
                        value={editedItem.name}
                        onChange={(e) => setEditedItem({ ...editedItem, name: e.target.value })}
                    />
                </div>
                <div style={{ width: "143px" }}>
                    <InputLabel>Progress</InputLabel>
                    <Input
                        type="number"
                        placeholder="70%"
                        value={editedItem.progress_percentage}
                        onChange={(e) => setEditedItem({ ...editedItem, progress_percentage: e.target.value })}
                    />
                </div>
            </ModalContent>
            <ModalFooter>
                <Button onClick={() => onHideModal(false)}>Cancel</Button>
                <Button color="primary" onClick={updateItem}>
                    Save Task
                </Button>
            </ModalFooter>
        </ModalBody>
    );
}
