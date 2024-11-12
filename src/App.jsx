import { useEffect, useState } from "react";
import "./App.css";
import { colors, taskData } from "./data";
import Header from "./components/Header/Header";
import TaskSectionBoard from "./components/TaskSectionBoard";
import TaskCard from "./components/TaskCard/TaskCard";
import TaskForm from "./components/TaskForm/TaskForm";
import { Dialog, DialogContent } from "@mui/material";
import ModalForm from "./components/ModalForm";
import { MdClose } from "react-icons/md";

function App() {
  const [taskList, setTaskList] = useState(
    JSON.parse(localStorage.getItem("trello-data")) || taskData
  );
  const [editTaskObj, setEditTaskObj] = useState(null);
  const [draggableTask, setDraggableTask] = useState(null);
  const [openEditForm, setEditOpenForm] = useState(false);
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
    setEditTaskObj(null);
  };

  useEffect(() => {
    localStorage.setItem("trello-data", JSON.stringify(taskList));
  }, [taskList]);

  /*when category is used as input field below are the functions to update task*/

  //Approach-1 update task using findIndex and splice function
  /* const handleUpdateTask1 = (name, category) => {
    const updatedList = [...taskList];
    ///find the orinalcategoryindex
    const originalcategoryindex = updatedList.findIndex((x) =>
      x.tasks.find((y) => y.id === editTaskObj.id)
    );
    if (originalcategoryindex === -1) return;
    const taskIndex = updatedList[originalcategoryindex].tasks.findIndex(
      (x) => x.id === editTaskObj.id
    );
    //check if old category  and new target category is same
    if (updatedList[originalcategoryindex].category === category) {
      updatedList[originalcategoryindex].tasks[taskIndex].title = name;
    } else {
      // If the category has changed, remove the task from the original category
      updatedList[originalcategoryindex].tasks.splice(taskIndex, 1);
      //find index of nw category
      const targetCategoryIndex = updatedList.findIndex(
        (x) => x.category === category
      );
      ///add task to new category new
      if (targetCategoryIndex !== -1) {
        updatedList[targetCategoryIndex].tasks.push({
          id: editTaskObj.id,
          title: name,
        });
      }
    }
    setTaskList(updatedList);
    setEditOpenForm(false);
    setEditTaskObj(null);
  };*/

  //Approach 2 update task using find and filter function
  /*const handleUpdateTask2 = (name, category) => {
    console.log("dd", category, name);
    const newList = [...taskList];
    ///finf category
    const oldCategory = newList.find((x) =>
      x.tasks.find((y) => y.id === editTaskObj.id)
    );
    console.log("hh", oldCategory);
    const taskToUpdate = oldCategory.tasks.find((x) => x.id === editTaskObj.id);
    //if the category changing remove the task from original category
    console.log("checl", oldCategory && oldCategory.category !== category);
    if (oldCategory && oldCategory.category !== category) {
      console.log("if", oldCategory && oldCategory.category !== category);
      oldCategory.tasks = oldCategory.tasks.filter(
        (x) => x.id !== editTaskObj.id
      );

      const targetCategory = newList.find(
        (categoryItem) => categoryItem.category === category
      );
      console.log("hhh", targetCategory);
      // If the task is being moved to a new category, add the task to that category
      if (targetCategory) {
        // If it's being moved, add the task to the target category
        targetCategory.tasks.push({
          id: editTaskObj.id,
          title: name,
        });
      }
    } else {
      console.log("else", oldCategory && oldCategory.category !== category);
      taskToUpdate.title = name;
    }

    // Update the state with the new task list
    setTaskList(newList);
    setEditOpenForm(false);
  };
  */
  const handleAddCategory = (category) => {
    const payload = {
      id: category,
      category: category,
      tasks: [],
      bgColor: colors[Math.floor(Math.random() * colors.length)],
    };
    console.log("cate", category, payload);
    setTaskList((prev) => [...prev, payload]);
  };

  const handleAddTask = (name, category) => {
    const newList = [...taskList];
    const index = newList.findIndex((ele) => ele.category === category);
    const payload = {
      id: crypto.randomUUID(),
      title: name,
      desc: "",
      subTasks: [],
      labels: [],
    };
    newList[index].tasks.push(payload);
    setTaskList(newList);
  };

  const handleDragStart = (task, category) => {
    setDraggableTask({ ...task, fromCategory: category });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, toCategory) => {
    e.preventDefault();
    console.log("from", toCategory);
    if (!draggableTask) return;
    const { id, fromCategory } = draggableTask;
    ///if souce and target category is same return
    if (fromCategory === toCategory) return;
    const updatedList = [...taskList];
    const sourceCategoryIndex = updatedList.findIndex(
      (x) => x.category === fromCategory
    );
    const taskIndex = updatedList[sourceCategoryIndex].tasks.findIndex(
      (x) => x.id === id
    );
    // remove tasks from original category
    updatedList[sourceCategoryIndex].tasks.splice(taskIndex, 1);
    const targetCategoryIndex = updatedList.findIndex(
      (x) => x.category === toCategory
    );

    updatedList[targetCategoryIndex].tasks.push(draggableTask);
    setTaskList(updatedList);
  };

  const handleUpdateTask = (payload) => {
    const updatedList = [...taskList];
    ///find the original categoryindex
    const originalcategoryindex = updatedList.findIndex((x) =>
      x.tasks.find((y) => y.id === editTaskObj?.id)
    );
    const taskIndex = updatedList[originalcategoryindex].tasks.findIndex(
      (x) => x.id === editTaskObj?.id
    );

    updatedList[originalcategoryindex].tasks[taskIndex] = payload;
    setTaskList(updatedList);
    setEditOpenForm(false);
  };

  const handleEditTask = (item) => {
    const category = taskList.find((x) =>
      x.tasks.find((y) => y.id === item.id)
    );
    setEditTaskObj({ ...item, category: category.category });
  };

  const handleDeleteTask = (id) => {
    const newList = [...taskList];
    const filteredList = newList.find((x) => x.tasks.find((y) => y.id === id));
    filteredList.tasks = filteredList.tasks.filter((x) => x.id !== id);
    setTaskList(newList);
  };

  const updateTitle = (value) => {
    const payload = { ...editTaskObj, title: value };
    handleUpdateTask(payload);
    setEditTaskObj(null);
  };

  const handleSuggestionClick = (value) => {
    handleEditTask(value);
    setOpen(true);
  };
  return (
    <>
      <Header
        taskList={taskList}
        handleSuggestionClick={handleSuggestionClick}
      />
      <div className="app-container">
        <div className="task-main-container">
          {taskList &&
            taskList?.map((ele, index) => (
              <TaskSectionBoard
                key={index}
                id={ele.id}
                bgColor={ele.bgColor}
                title={ele.category}
                handleDragOver={handleDragOver}
                handleDrop={handleDrop}
              >
                <div className="card-container custom-scroll">
                  {ele?.tasks.map((task) =>
                    openEditForm && task.id === editTaskObj?.id ? (
                      <TaskForm
                        key={task.id}
                        editTaskObj={editTaskObj?.title}
                        category={ele.category}
                        onSubmit={updateTitle}
                        open={openEditForm}
                      />
                    ) : (
                      <TaskCard
                        key={task.id}
                        category={ele.category}
                        task={task}
                        setEditOpenForm={setEditOpenForm}
                        setEditTaskObj={setEditTaskObj}
                        handleEditTask={handleEditTask}
                        handleDeleteTask={handleDeleteTask}
                        handleDragStart={handleDragStart}
                        updateTask={handleUpdateTask}
                      />
                    )
                  )}
                  <TaskForm
                    editTaskObj={editTaskObj?.title}
                    category={ele.category}
                    placeholder={"Enter title"}
                    buttonText={"+ Add Card"}
                    customClass="add-button"
                    onSubmit={(value) => handleAddTask(value, ele.category)}
                  />
                </div>
              </TaskSectionBoard>
            ))}
          <div className="task-section-board">
            <TaskForm
              onSubmit={(value) => handleAddCategory(value)}
              placeholder={"Enter list name"}
              buttonText={"+ Add another list"}
            />
          </div>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            fullWidth
          >
            <DialogContent>
              <MdClose className="modal-close-button" onClick={handleClose} />
              <ModalForm task={editTaskObj} updateTask={handleUpdateTask} />
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </>
  );
}

export default App;
