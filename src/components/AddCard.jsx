import React, { useState } from "react";
import TaskForm from "./TaskForm";

const AddCard = ({
  addTask,
  category,
  categoryId,
  toggleForm,
  handleClose,
}) => {
  return (
    <>
      {categoryId === category ? (
        <TaskForm
          addTask={addTask}
          category={category}
          handleClose={handleClose}
        />
      ) : (
        <button className="add-button" onClick={() => toggleForm(category)}>
          + Add Card
        </button>
      )}
    </>
  );
};

export default AddCard;
