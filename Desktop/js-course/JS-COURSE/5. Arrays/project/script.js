let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let error = "";
//choose ui elements
const inputTask = document.getElementById("taskInput");
const inputCategory = document.getElementById("taskCategory");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskTime = document.getElementById("taskTime");
const taskList = document.getElementById("taskList");
const uiError = document.getElementById("error");
const addTask = () => {
  let taskString = inputTask.value;
  let taskCategory = inputCategory.value;
  let time = taskTime.value;
  if (!taskString || !taskCategory || !time) {
    error = "Please fill in all the fields";
    uiError.textContent = error;
  }
  const task = {
    name: taskString,
    category: taskCategory,
    time: time,
    id: Date.now(),
  };
  tasks.push(task);
  inputTask.value = "";
  inputCategory.value = "";
  taskTime.value = "";
  uiError.textContent = "";
  console.log(tasks);
  renderTasks();
};
const renderTasks = () => {
  taskList.innerHTML = "";
  tasks.forEach((task) => {
    const li = document.createElement("li");
    li.className = `task-item ${task.completed ? "completed" : ""}`;

    li.innerHTML = `
    <span class="task-category category-${task.category}">${task.category}</span>
    <div>
        <span class="task-text">${task.name}</span>
        <div class="task-time">${task.time}</div>
    </div>
    <div class="task-actions">
        <button onclick="toggleComplete(${task.id})">✔️</button>
        <button onclick="editTask(${task.id})">✏️</button>
        <button onclick="deleteTask(${task.id})">🗑️</button>
    </div>
`;
    taskList.appendChild(li);
  });
};
function toggleComplete(id) {
  const task = tasks.find((t) => t.id === id);
  if (task) {
    task.completed = !task.completed;
    saveTasks();
    renderTasks();
  }
}

function editTask(id) {
  const task = tasks.find((t) => t.id === id);
  if (task) {
    const newText = prompt("Edit task:", task.text);
    if (newText !== null) {
      task.name = newText;
      saveTasks();
      renderTasks();
    }
  }
}

function deleteTask(id) {
  tasks = tasks.filter((t) => t.id !== id);
  saveTasks();
  renderTasks();
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

addTaskBtn.addEventListener("click", addTask);
