import {useEffect, useState} from "react";
import {Button, Input, InputLabel, ModalBody, ModalContent, ModalFooter} from "../index";

export default function ModalEditItem({
  show = false,
  onHideModal = () => {},
  item = {},
  setStateLoad,
}) {
    const [editItem, setEditItem] = useState({ name: item.name, progress: item.progress_percentage });

    useEffect(() => {
        setEditItem({ name: item.name, progress: item.progress_percentage });
    }, [item]);

    return (
        <ModalBody show={show} onHideModal={onHideModal} title="Edit Task">
            <ModalContent>
                <div style={{ marginBottom: "16px" }}>
                    <InputLabel>Task Name</InputLabel>
                    <Input
                        placeholder="Type your task"
                        value={editItem.name}
                        onChange={(e) => setEditItem({ ...editItem, name: e.target.value })}
                    />
                </div>
                <div style={{ width: "143px" }}>
                    <InputLabel>Progress</InputLabel>
                    <Input
                        type="number"
                        placeholder="70%"
                        value={editItem.progress}
                        onChange={(e) => setEditItem({ ...editItem, progress: e.target.value })}
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
    );
}
