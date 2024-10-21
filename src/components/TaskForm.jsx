import React, { useEffect, useState } from "react";
import { categoryOptions } from "../data";

const TaskForm = ({
  addTask,
  category,
  editTaskObj,
  handleClose,
  handleUpdateTask,
}) => {
  const [taskName, setTaskName] = useState("");
  const [taskCategory, setTaskCategory] = useState("");

  useEffect(() => {
    if (editTaskObj) {
      setTaskName(editTaskObj.title);
    } else {
      setTaskName("");
    }
  }, [editTaskObj]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editTaskObj) {
      handleUpdateTask(taskName, taskCategory);
    } else {
      addTask(taskName, category);
    }
    setTaskName("");
  };

  return (
    <>
      <form className="input-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Task Name"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          autoFocus
        />
        {/* <select
            onChange={(e) => setTaskCategory(e.target.value)}
            value={taskCategory}
          >
            <option value="Select category">Select category</option>
            {categoryOptions &&
              categoryOptions?.map((opt) => (
                <option key={opt.label} value={opt.label}>
                  {opt.label}
                </option>
              ))}
          </select> */}
        <div className="buttons-container">
          <button className="submit-button" type="submit">
            {editTaskObj ? "Save" : "Add"}
          </button>
          {!editTaskObj ? (
            <button
              className="close-button"
              type="button"
              onClick={handleClose}
            >
              x
            </button>
          ) : null}
        </div>
      </form>
    </>
  );
};

export default TaskForm;
