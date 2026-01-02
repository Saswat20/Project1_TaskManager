const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

// Load tasks from localStorage on page load
document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === "") return;

  const task = {
    text: taskText,
    completed: false
  };

  saveTask(task);
  renderTask(task);
  taskInput.value = "";
}

function renderTask(task) {
  const li = document.createElement("li");
  li.textContent = task.text;

  if (task.completed) {
    li.classList.add("completed");
  }

  // Toggle complete
  li.addEventListener("click", () => {
    task.completed = !task.completed;
    li.classList.toggle("completed");
    updateStorage();
  });

  // Delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "X";
  deleteBtn.style.marginLeft = "10px";

  deleteBtn.onclick = () => {
    li.remove();
    removeTask(task.text);
  };

  li.appendChild(deleteBtn);
  taskList.appendChild(li);
}

function saveTask(task) {
  const tasks = getTasks();
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = getTasks();
  tasks.forEach(renderTask);
}

function getTasks() {
  return JSON.parse(localStorage.getItem("tasks")) || [];
}

function removeTask(text) {
  let tasks = getTasks();
  tasks = tasks.filter(t => t.text !== text);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateStorage() {
  const tasks = [];
  document.querySelectorAll("#taskList li").forEach(li => {
    tasks.push({
      text: li.firstChild.textContent,
      completed: li.classList.contains("completed")
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
