import React, { useState } from "react";
import {
  Box,
  Checkbox,
  Chip,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import {
  MdDelete,
  MdFormatAlignLeft,
  MdOutlineDateRange,
  MdOutlineLabel,
  MdOutlineSubtitles,
} from "react-icons/md";
import TaskForm from "./TaskForm/TaskForm";
import ProgressBar from "./ProgressBar";
import { colors } from "../data";
import { FiCheckSquare } from "react-icons/fi";

const ModalForm = ({ task, updateTask }) => {
  const [showDate, setShowDate] = useState(false);
  const [selectedColor, setSelectedColor] = useState(null);
  const [dateVal, setDateVal] = useState("");
  const [values, setValues] = useState({
    ...task,
  });

  const updateTitle = (value) => {
    setValues({ ...values, title: value });
    const payload = { ...values, title: value };
    updateTask(payload);
  };

  const updateDesc = (value) => {
    setValues({ ...values, desc: value });
    const payload = { ...values, desc: value };
    updateTask(payload);
  };

  const addLabel = (value) => {
    if (task.labels.some((x) => x.text === value)) return;
    const taskItem = {
      color: selectedColor,
      text: value,
    };
    setValues({
      ...values,
      labels: [...values.labels, taskItem],
    });
    const payload = { ...values, labels: [...values.labels, taskItem] };
    updateTask(payload);
  };

  const deleteLabel = (text) => {
    let newList = [...values.labels];
    const filteredList = newList.filter((x) => x.text !== text);
    newList = [...filteredList];
    setValues({ ...values, labels: newList });
    const payload = { ...values, labels: newList };
    updateTask(payload);
  };
  const updateDate = () => {
    if (!dateVal) return;

    setValues({
      ...values,
      date: dateVal,
    });
    const payload = { ...values, date: dateVal };
    updateTask(payload);
    setShowDate(false);
  };

  const addSubTask = (value) => {
    if (values.subTasks.some((x) => x.text === value)) return;
    const taskItem = {
      id: new Date().getTime(),
      completed: false,
      text: value,
    };
    setValues({
      ...values,
      subTasks: [...values.subTasks, taskItem],
    });
    const payload = { ...values, subTasks: [...values.subTasks, taskItem] };
    updateTask(payload);
  };

  const deleteSubTask = (id) => {
    let newList = [...values.subTasks];
    const filteredList = newList.filter((x) => x.id !== id);
    newList = [...filteredList];
    setValues({ ...values, subTasks: newList });
    const payload = { ...values, subTasks: newList };
    updateTask(payload);
  };

  const toggleSubTask = (id, e) => {
    const newList = [...values.subTasks];
    const idx = newList.findIndex((x) => x.id === id);
    if (idx === -1) return;
    newList[idx].completed = e.target.checked;
    setValues({
      ...values,
      subTasks: newList,
    });
    const payload = { ...values, subTasks: newList };
    updateTask(payload);
  };

  const calculateProgressPercent = () => {
    if (!values.subTasks?.length) return 0;
    const subtaskLength = values?.subTasks?.length;
    const completedResLength = values?.subTasks.filter(
      (x) => x.completed
    )?.length;

    const percentageCompleted = (completedResLength / subtaskLength) * 100;
    return percentageCompleted;
  };

  return (
    <div>
      <Box sx={{ mb: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
          <MdOutlineSubtitles fontSize={20} />
          <Typography
            sx={{ color: "text.primary", fontWeight: "500", ml: 1 }}
            variant="h6"
          >
            Title
          </Typography>
        </Box>
        <TaskForm
          placeholder={"Enter title"}
          editTaskObj={values?.title}
          buttonText={values?.title || ""}
          onSubmit={updateTitle}
        />
      </Box>
      <Box sx={{ mb: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
          <MdOutlineLabel fontSize={20} />
          <Typography
            sx={{ color: "text.primary", fontWeight: "500", ml: 1 }}
            variant="h6"
          >
            Labels
          </Typography>
        </Box>
        <Stack direction="row" spacing={1}>
          {values?.labels?.map((x) => (
            <Chip
              key={x.text}
              sx={{ backgroundColor: x.color, color: "#fff" }}
              label={x.text}
              onDelete={() => deleteLabel(x.text)}
            />
          ))}
        </Stack>
        <ul className="color-circle-container">
          {colors &&
            colors.map((item) => (
              <li
                key={item}
                className={
                  selectedColor === item
                    ? "color-circle active-color-circle"
                    : "color-circle"
                }
                style={{ backgroundColor: item }}
                onClick={() => setSelectedColor(item)}
              ></li>
            ))}
        </ul>
        <TaskForm
          placeholder={"Add an label"}
          buttonText={"Add Labels"}
          onSubmit={addLabel}
        />
      </Box>
      <Box sx={{ mb: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
          <MdFormatAlignLeft fontSize={20} />
          <Typography
            sx={{ color: "text.primary", fontWeight: "500", ml: 1 }}
            variant="h6"
          >
            Description
          </Typography>
        </Box>
        <TaskForm
          placeholder={"Enter description"}
          editTaskObj={values?.desc || ""}
          buttonText={values?.desc || "Add a Description"}
          onSubmit={updateDesc}
        />
      </Box>
      <Box sx={{ mb: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
          <MdOutlineDateRange fontSize={20} />
          <Typography
            sx={{ color: "text.primary", fontWeight: "500", ml: 1 }}
            variant="h6"
          >
            Date
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "fit-content",
            gap: 1,
          }}
        >
          <input
            type="date"
            defaultValue={values.date}
            min={new Date().toISOString().substring(0, 10)}
            onChange={(event) => {
              setShowDate(true);
              setDateVal(event.target.value);
            }}
          />
          {showDate && (
            <div className="buttons-container">
              <button className="submit-button" onClick={updateDate}>
                Save
              </button>
            </div>
          )}
        </Box>
      </Box>
      <Box sx={{ mb: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
          <FiCheckSquare fontSize={20} />
          <Typography
            sx={{ color: "text.primary", fontWeight: "500", ml: 1 }}
            variant="h6"
          >
            Checklist
          </Typography>
        </Box>
        {values?.subTasks?.length > 0 && (
          <div>
            <ProgressBar
              variant="determinate"
              value={calculateProgressPercent()}
            />
          </div>
        )}
        <List sx={{ width: "100%", bgcolor: "background.paper" }}>
          {values?.subTasks?.map((item) => {
            const labelId = `checkbox-list-secondary-label-${item.id}`;
            return (
              <ListItem
                key={item.id}
                secondaryAction={
                  <IconButton edge="end" onClick={() => deleteSubTask(item.id)}>
                    <MdDelete />
                  </IconButton>
                }
                disablePadding
              >
                <ListItemButton>
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={item?.completed}
                      onChange={(event) => toggleSubTask(item.id, event)}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{ "aria-labelledby": labelId }}
                    />
                  </ListItemIcon>
                  <ListItemText
                    id={labelId}
                    primary={item.text}
                    sx={{
                      textDecoration: item.completed ? "line-through" : "",
                    }}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
        <TaskForm
          placeholder={"Add an item"}
          buttonText={"Add Checklist"}
          onSubmit={addSubTask}
        />
      </Box>
    </div>
  );
};

export default ModalForm;
