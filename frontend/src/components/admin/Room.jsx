import { useState } from "react";
import { useData } from "../context/DataContext";
import Header from "./Room/header";
import RoomGrid from "../ui/rooms/RoomGrid";
import RoomFormModal from "../ui/rooms/RoomFormModal";

export default function Room() {
  const { rooms, addRoom, updateRoom, deleteRoom } = useData();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingRoom, setEditingRoom] = useState(null);

  const [formName, setFormName] = useState("");
  const [formType, setFormType] = useState("workspace");
  const [formCapacity, setFormCapacity] = useState("1");
  const [formAvailable, setFormAvailable] = useState(true);

  // OPEN DIALOG
  const handleOpenDialog = (room = null) => {
      console.log(room);
    if (room) {
      setEditingRoom(room);
      setFormName(room.name);
      setFormType(room.type);
      setFormCapacity(room.capacity.toString());
      setFormAvailable(room.available);
    } else {
      setEditingRoom(null);
      setFormName("");
      setFormType("workspace");
      setFormCapacity("1");
      setFormAvailable(true);
    }

    setIsDialogOpen(true);
  };


  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  // SUBMIT (ADD / UPDATE)
  const handleSubmit = (e) => {
    e.preventDefault();

    const roomData = {
      name: formName,
      type: formType,
      capacity: Number(formCapacity),
      available: formAvailable,
    };

    if (editingRoom) {
      updateRoom(editingRoom.id, roomData);
    } else {
      addRoom(roomData);
    }

    setIsDialogOpen(false);
  };

  // DELETE
  const handleDelete = (id) => {
    deleteRoom(id);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Header handleOpenDialog={handleOpenDialog} />

      <RoomGrid
        rooms={rooms}
        onEdit={handleOpenDialog}
        onDelete={handleDelete}
        onAddFirst={() => handleOpenDialog()}
      />

      <RoomFormModal
        open={isDialogOpen}
        onClose={handleCloseDialog}
        onSubmit={handleSubmit}
        editingRoom={editingRoom}
        formName={formName}
        setFormName={setFormName}
        formType={formType}
        setFormType={setFormType}
        formCapacity={formCapacity}
        setFormCapacity={setFormCapacity}
        formAvailable={formAvailable}
        setFormAvailable={setFormAvailable}
      />
    </div>
  );
}