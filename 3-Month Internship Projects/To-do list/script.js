let tasks = [];
let taskCounter = 1;

document.addEventListener("DOMContentLoaded", loadTasks);

function toggleTheme() {
  document.body.classList.toggle("dark-mode");
  const lightIcon = document.getElementById("light-icon");
  const darkIcon = document.getElementById("dark-icon");
  [lightIcon.style.display, darkIcon.style.display] = [
    darkIcon.style.display,
    lightIcon.style.display,
  ];
}

function handleEnter(event) {
  if (event.key === "Enter") {
    addTask();
  }
}

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const text = taskInput.value.trim();
  if (!text) return;

  const task = {
    id: taskCounter++,
    text: text,
    completed: false,
    timestamp: new Date().getTime(),
  };
  tasks.push(task);
  renderTasks();
  taskInput.value = "";
  saveTasks();
}

function renderTasks() {
  const container = document.getElementById("taskContainer");
  container.innerHTML = `
        <div class="task-controls">
            <div>
                <button class="sort-btn" onclick="sortTasks('new-to-old')">New to Old</button>
                <button class="sort-btn" onclick="sortTasks('old-to-new')">Old to New</button>
                <button class="sort-btn" onclick="sortTasks('a-to-z')">A to Z</button>
            </div>
            <button class="clear-btn" onclick="clearAllTasks()">Clear All</button>
        </div>
    `;

  tasks.forEach((task) => {
    const taskItem = document.createElement("div");
    taskItem.className = "task-item";
    taskItem.innerHTML = `
            <input type="checkbox" ${
              task.completed ? "checked" : ""
            } onchange="toggleTaskCompletion(${task.id})">
            <span class="${task.completed ? "completed" : ""}">${task.id}. ${
      task.text
    }</span>
            <button class="delete-btn" onclick="deleteTask(${task.id})">
                <svg class="delete-icon" viewBox="0 0 24 24">
                    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                </svg>
            </button>
        `;
    container.appendChild(taskItem);
  });
}

function toggleTaskCompletion(id) {
  const task = tasks.find((task) => task.id === id);
  task.completed = !task.completed;
  saveTasks();
  renderTasks();
}

function deleteTask(id) {
  tasks = tasks.filter((task) => task.id !== id);
  saveTasks();
  renderTasks();
}

function clearAllTasks() {
  tasks = [];
  taskCounter = 1;
  saveTasks();
  renderTasks();
}

function sortTasks(mode) {
  if (mode === "new-to-old") {
    tasks.sort((a, b) => b.timestamp - a.timestamp);
  } else if (mode === "old-to-new") {
    tasks.sort((a, b) => a.timestamp - b.timestamp);
  } else if (mode === "a-to-z") {
    tasks.sort((a, b) => a.text.localeCompare(b.text));
  }
  renderTasks();
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  localStorage.setItem("taskCounter", taskCounter);
}

function loadTasks() {
  tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  taskCounter = parseInt(localStorage.getItem("taskCounter")) || 1;
  renderTasks();
}
