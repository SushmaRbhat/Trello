import React from "react";

const TaskSectionBoard = ({
  id,
  title,
  handleDragOver,
  handleDrop,
  bgColor,
  children,
}) => {
  return (
    <div
      className="task-section-board"
      onDragOver={handleDragOver} // Allow dropping by preventing default behavior
      onDrop={(e) => handleDrop(e, title)} // Handle drop
    >
      <h2
        className="section-header"
        style={{
          backgroundColor: bgColor,
        }}
      >
        {title}
      </h2>
      {children}
    </div>
  );
};

export default TaskSectionBoard;
