const fs = require("fs");
const path = require("path");

const tasksPath = path.join(__dirname, "tasks.json");

let tasks = loadTasks();

const list = document.getElementById("task-list");
const input = document.getElementById("task-input");
const addButton = document.getElementById("add-task");

function loadTasks() {
  try {
    const raw = fs.readFileSync(tasksPath, "utf-8");
    return JSON.parse(raw);
  } catch (error) {
    console.error("Failed to load tasks.json:", error);
    return [];
  }
}

function saveTasks() {
  try {
    fs.writeFileSync(tasksPath, JSON.stringify(tasks, null, 2));
  } catch (error) {
    console.error("Failed to save tasks.json:", error);
  }
}

function addTask() {
  const text = input.value.trim();

  if (!text) return;

  tasks.push({
    text: text,
    done: false
  });

  saveTasks();
  input.value = "";
  renderTasks();
}

function renderTasks() {
  list.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = "mb-3";

    li.innerHTML = `
          <div class="flex items-center gap-3">
            <input
              type="checkbox"
              class="checkbox checkbox-primary task-checkbox no-drag"
              ${task.done ? "checked" : ""}
            />

            <div class="flex-1 min-w-0">
              <p class="font-medium break-words ${
                task.done ? "line-through opacity-50" : ""
              }">
                ${escapeHtml(task.text)}
              </p>
            </div>

            <button class="btn btn-sm btn-ghost btn-circle text-error task-delete" title="Delete task">
              x
            </button>
          </div>
    `;

    const checkbox = li.querySelector(".task-checkbox");
    const deleteButton = li.querySelector(".task-delete");

    checkbox.addEventListener("change", () => {
      tasks[index].done = checkbox.checked;
      saveTasks();
      renderTasks();
    });

    deleteButton.addEventListener("click", () => {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    });

    list.appendChild(li);
  });
}

function escapeHtml(text) {
  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

addButton.addEventListener("click", addTask);

input.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    addTask();
  }
});

renderTasks();