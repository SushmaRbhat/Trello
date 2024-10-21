import React, { useState } from "react";
import TaskForm from "./TaskForm";

const AddCard = ({ addTask, category }) => {
  const [openForm, setOpenForm] = useState(false);

  const handleClose = () => {
    setOpenForm(false);
  };

  return (
    <>
      {openForm ? (
        <TaskForm
          addTask={addTask}
          category={category}
          handleClose={handleClose}
        />
      ) : (
        <button
          className="add-button"
          onClick={() => {
            setOpenForm(true);
          }}
        >
          + Add Card
        </button>
      )}
    </>
  );
};

export default AddCard;
