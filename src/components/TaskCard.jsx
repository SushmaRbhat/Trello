import React from "react";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";

const TaskCard = ({
  task,
  category,
  handleEditTask,
  handleDeleteTask,
  handleDragStart,
}) => {
  return (
    <div
      className="card"
      draggable
      onDragStart={() => handleDragStart(task, category)}
    >
      <div className="card-top">
        <h3>{task.title}</h3>
        <div className="action-container">
          <button onClick={() => handleEditTask(task)}>
            <MdEdit />
          </button>
          <button onClick={() => handleDeleteTask(task.id)}>
            <MdDelete />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
