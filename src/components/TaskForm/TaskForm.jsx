import React, { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import "./TaskForm.css";

const TaskForm = ({
  editTaskObj,
  placeholder,
  onSubmit,
  buttonText,
  open = false,
  customClass = "editable-button",
}) => {
  const [taskName, setTaskName] = useState("");
  const [openForm, setOpenForm] = useState(false);
  useEffect(() => {
    if (editTaskObj) {
      setTaskName(editTaskObj);
    } else {
      setTaskName("");
    }
  }, [editTaskObj]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskName.trim() === "") return;
    onSubmit(taskName);
    setTaskName("");
    setOpenForm(false);
  };

  return (
    <>
      {openForm || open ? (
        <form className="input-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder={placeholder}
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            autoFocus
          />
          <div className="buttons-container">
            <button className="submit-button" type="submit">
              {editTaskObj ? "Save" : "Add"}
            </button>
            {!editTaskObj ? (
              <button
                className="close-button"
                type="button"
                onClick={() => setOpenForm(false)}
              >
                <MdClose />
              </button>
            ) : null}
          </div>
        </form>
      ) : (
        <button className={customClass} onClick={() => setOpenForm(true)}>
          {buttonText}
        </button>
      )}
    </>
  );
};

export default TaskForm;
