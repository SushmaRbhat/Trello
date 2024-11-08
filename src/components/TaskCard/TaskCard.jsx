import React, { useState } from "react";
import { Chip, Dialog, DialogContent, Stack, Tooltip } from "@mui/material";
import {
  MdEdit,
  MdDelete,
  MdOutlineSchedule,
  MdFormatAlignLeft,
} from "react-icons/md";
import { FiCheckSquare } from "react-icons/fi";
import "./TaskCard.css";
import ModalForm from "../ModalForm";

const TaskCard = ({
  task,
  category,
  handleEditTask,
  handleDeleteTask,
  handleDragStart,
  updateTask,
  setEditOpenForm,
  setEditTaskObj,
}) => {
  const [open, setOpen] = useState(false);

  const handleModelOpen = () => {
    handleEditTask(task);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setEditTaskObj(null);
  };
  const totalSubTasks = task?.subTasks?.length || 0;
  const completedTasks =
    task?.subTasks?.filter((x) => x.completed)?.length || 0;
  const getFormatedDate = (dateVal) => {
    const formatedDate = new Date(dateVal).toDateString();
    const dateMonth = formatedDate.split(" ");
    return `${dateMonth[2]} ${dateMonth[1]}`;
  };
  return (
    <>
      <div
        className="card"
        draggable
        onDragStart={() => handleDragStart(task, category)}
        onClick={handleModelOpen}
      >
        <Stack direction="row" spacing={1} sx={{ my: 1 }}>
          {task?.labels?.map((x) => (
            <Chip
              key={x.text}
              sx={{ backgroundColor: x.color, color: "#fff" }}
              label={x.text}
              size="small"
            />
          ))}
        </Stack>
        <div className="card-top">
          <h3>{task.title}</h3>
          <div className="action-container">
            <button
              onClick={() => {
                setEditOpenForm(true);
                handleEditTask(task);
              }}
            >
              <MdEdit />
            </button>
            <button onClick={() => handleDeleteTask(task.id)}>
              <MdDelete />
            </button>
          </div>
        </div>
        <div className="action-container">
          {task.date && (
            <Chip
              size="medium"
              variant="outlined"
              icon={<MdOutlineSchedule />}
              label={getFormatedDate(task.date)}
            />
          )}
          {task.desc && (
            <Tooltip title="This card has description">
              <button>
                <MdFormatAlignLeft />
              </button>
            </Tooltip>
          )}
          {task.subTasks.length > 0 && (
            <Tooltip title="Checklist Item">
              <Chip
                size="medium"
                variant="outlined"
                icon={<FiCheckSquare />}
                label={`${completedTasks} / ${totalSubTasks}`}
              />
            </Tooltip>
          )}
        </div>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
      >
        <DialogContent>
          <ModalForm task={task} updateTask={updateTask} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TaskCard;
