import { useEffect, useState } from "react";
import "./App.css";
import { taskData } from "./data";
import TaskSectionBoard from "./components/TaskSectionBoard";
import TaskCard from "./components/TaskCard";
import TaskForm from "./components/TaskForm";
import AddCard from "./components/AddCard";

function App() {
  const [taskList, setTaskList] = useState(
    JSON.parse(localStorage.getItem("kanban-data")) || taskData
  );
  const [editTaskObj, setEditTaskObj] = useState(null);
  const [draggableTask, setDraggableTask] = useState(null);
  const [categoryId, setCategoryId] = useState(null);
  const [openEditForm, setEditOpenForm] = useState(false);

  useEffect(() => {
    localStorage.setItem("kanban-data", JSON.stringify(taskList));
  }, [taskList]);

  const toggleForm = (category) => {
    setCategoryId(category);
    setEditOpenForm(false);
  };

  const handleClose = () => {
    setCategoryId(null);
  };

  const handleAddTask = (name, category) => {
    const newList = [...taskList];
    const index = newList.findIndex((ele) => ele.category === category);
    const payload = {
      id: crypto.randomUUID(),
      title: name,
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

  const handleUpdateTask = (name) => {
    const updatedList = [...taskList];
    ///find the original categoryindex
    const originalcategoryindex = updatedList.findIndex((x) =>
      x.tasks.find((y) => y.id === editTaskObj.id)
    );
    const taskIndex = updatedList[originalcategoryindex].tasks.findIndex(
      (x) => x.id === editTaskObj.id
    );

    updatedList[originalcategoryindex].tasks[taskIndex].title = name;

    setTaskList(updatedList);
    setEditOpenForm(false);
    setEditTaskObj(null);
  };

  const handleEditTask = (item) => {
    setEditOpenForm(true);
    setCategoryId(null);
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

  return (
    <>
      <div className="header">
        <h1>Trello</h1>
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
                  openEditForm && task.id === editTaskObj.id ? (
                    <TaskForm
                      key={task.id}
                      addTask={handleAddTask}
                      editTaskObj={editTaskObj}
                      categoryId={categoryId}
                      category={ele.category}
                      handleUpdateTask={handleUpdateTask}
                    />
                  ) : (
                    <TaskCard
                      key={task.id}
                      category={ele.category}
                      task={task}
                      handleEditTask={handleEditTask}
                      handleDeleteTask={handleDeleteTask}
                      handleDragStart={handleDragStart}
                    />
                  )
                )}

                <AddCard
                  addTask={handleAddTask}
                  category={ele.category}
                  categoryId={categoryId}
                  toggleForm={toggleForm}
                  handleClose={handleClose}
                />
              </div>
            </TaskSectionBoard>
          ))}
      </div>
    </>
  );
}

export default App;
