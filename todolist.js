const input = document.getElementById("new-task");
const button = document.getElementById("add-btn");
const list = document.getElementById("task-list");
const darkToggle = document.getElementById("darkmode-toggle");

// Load from localStorage
window.onload = () => {
    const saved = JSON.parse(localStorage.getItem("tasks")) || [];
    saved.forEach(task => renderTask(task.text, task.checked));
    const theme = localStorage.getItem("theme") || "light";
    document.body.className = theme;
};

// Save tasks to localStorage
function saveTasks() {
    const tasks = [];
    list.querySelectorAll("li").forEach(li => {
        const text = li.querySelector("label").textContent;
        const checked = li.querySelector("input[type='checkbox']").checked;
        tasks.push({ text, checked });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Render a single task
function renderTask(taskText, isChecked = false) {
    const uniqueId = `task-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    const li = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = uniqueId;
    checkbox.checked = isChecked;

    const label = document.createElement("label");
    label.htmlFor = uniqueId;
    label.textContent = taskText;

    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none"
    viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
        d="M3 6h18M8 6v12M16 6V6M5 6v12h14V6H5z"/>
    </svg>`;
    deleteBtn.className = "delete-btn";

    deleteBtn.addEventListener("click", () => {
        li.remove();
        saveTasks();
    });

    checkbox.addEventListener("change", saveTasks);

    li.appendChild(checkbox);
    li.appendChild(label);
    li.appendChild(deleteBtn);

    list.appendChild(li);
    saveTasks();
}

// Add new task
function addTask() {
    const taskText = input.value.trim();
    if (taskText === "") return;
    renderTask(taskText);
    input.value = "";
}

button.addEventListener("click", addTask);

input.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        addTask();
        event.preventDefault();
    }
});

// Dark mode toggle
darkToggle.addEventListener("click", () => {
    const current = document.body.className;
    const next = current === "dark" ? "light" : "dark";
    document.body.className = next;
    localStorage.setItem("theme", next);
});
