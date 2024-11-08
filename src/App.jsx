import { useEffect, useState } from "react";
import "./App.css";
import { BsPersonWorkspace } from "react-icons/bs";
import { taskData } from "./data";
import TaskSectionBoard from "./components/TaskSectionBoard";
import TaskCard from "./components/TaskCard/TaskCard";
import TaskForm from "./components/TaskForm/TaskForm";

function App() {
  const [taskList, setTaskList] = useState(
    JSON.parse(localStorage.getItem("trello-data")) || taskData
  );

  const [editTaskObj, setEditTaskObj] = useState(null);
  const [draggableTask, setDraggableTask] = useState(null);
  const [openEditForm, setEditOpenForm] = useState(false);

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
  return (
    <>
      <div className="header">
        <BsPersonWorkspace fontSize={30} />
        <h2>Trello{editTaskObj?.desc}</h2>
      </div>
      <div className="task-main-container">
        {taskList &&
          taskList?.map((ele, index) => (
            <TaskSectionBoard
              key={index}
              id={ele.id}
              title={ele.category}
              handleDragOver={handleDragOver}
              handleDrop={handleDrop}
            >
              <div className="card-container custom-scroll">
                {ele?.tasks.map((task) =>
                  openEditForm && task.id === editTaskObj?.id ? (
                    <TaskForm
                      key={task.id}
                      addTask={handleAddTask}
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
      </div>
    </>
  );
}

export default App;
