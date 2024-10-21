import React from "react";

const TaskSectionBoard = ({
  id,
  title,
  handleDragOver,
  handleDrop,
  children,
}) => {
  return (
    <div
      className="task-section-board"
      onDragOver={handleDragOver} // Allow dropping by preventing default behavior
      onDrop={(e) => handleDrop(e, title)} // Handle drop
    >
      <h2 className={`section-header ${id}`}>{title}</h2>
      {children}
    </div>
  );
};

export default TaskSectionBoard;
