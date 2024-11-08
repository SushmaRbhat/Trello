export const taskData = [
  {
    id: "todo",
    category: "To Do",
    tasks: [
      {
        id: "11",
        title: "To Do Task 1",
        desc: "Description",
        subTasks: [
          { id: 1731059104025, completed: false, text: "Item1" },
          { id: 1731059109513, completed: false, text: "Item2" },
        ],
        labels: [
          {
            color: "#ec423e",
            text: "Label1",
          },
          {
            color: "#ffca28",
            text: "Label2",
          },
        ],
        date: "2024-11-30",
      },
      {
        id: "12",
        title: "To Do Task 2",
        desc: "",
        subTasks: [],
        labels: [],
        date: "",
      },
    ],
  },
  {
    id: "inprogress",
    category: "In Progress",
    tasks: [
      {
        id: "21",
        title: "Progress Task 1",
        desc: "",
        subTasks: [
          { id: 1731059104025, completed: true, text: "Item1" },
          { id: 1731059109513, completed: false, text: "Item2" },
        ],
        labels: [
          {
            color: "#ec423e",
            text: "Label1",
          },
          {
            color: "#cf61a1",
            text: "Label2",
          },
        ],
        date: "2024-11-28",
      },
      {
        id: "22",
        title: "Progress Task 2",
        desc: "",
        subTasks: [],
        labels: [],
        date: "",
      },
    ],
  },
  {
    id: "completed",
    category: "Completed",
    tasks: [
      {
        id: "31",
        title: "Completed Task 1",
        desc: "Description",
        subTasks: [
          { id: 1731059104025, completed: true, text: "Item1" },
          { id: 1731059109513, completed: true, text: "Item2" },
        ],
        labels: [
          {
            color: "#9975bd",
            text: "Label1",
          },
          {
            color: "#6fd14e",
            text: "Label2",
          },
        ],
        date: "2024-11-05",
      },
    ],
  },
];

export const categoryOptions = [
  {
    label: "To Do",
    value: "todo",
  },
  { label: "In Progress", value: "inprogress" },
  {
    label: "Completed",
    value: "completed",
  },
];

export const colors = [
  "#ec423e",
  "#ffca28",
  "#6fd14e",
  "#1ebffa",
  "#8da377",
  "#9975bd",
  "#cf61a1",
  "#cdbebe",
];
