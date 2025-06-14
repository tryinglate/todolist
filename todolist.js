// Get the input box, button, and list
const input = document.getElementById("new-task");
const button = document.getElementById("add-btn");
const list = document.getElementById("task-list");

// Function to add a new task to the list
const addTask = () => {
    const taskText = input.value.trim();
    if (taskText === "") {
        console.log("Task input is empty. Not adding a new task.");
        return;
    }

    const uniqueId = `task-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    const li = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = uniqueId;

    const label = document.createElement("label");
    label.htmlFor = uniqueId;
    label.textContent = taskText;

    // ✅ CREATE DELETE BUTTON
    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = `
<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
        d="M3 6h18M8 6v12M16 6V6M5 6v12h14V6H5z"/>
</svg>
`;
    deleteBtn.className = "delete-btn";

    // 🧠 Event to remove the task item
    deleteBtn.addEventListener("click", () => {
        li.remove();
        console.log(`Deleted task: "${taskText}"`);
    });

    li.appendChild(checkbox);
    li.appendChild(label);
    li.appendChild(deleteBtn); // ✅ ADD delete button to the li

    checkbox.addEventListener("change", () => {
        console.log(`Task "${taskText}" is now ${checkbox.checked ? 'checked' : 'unchecked'}.`);
    });

    list.appendChild(li);
    input.value = "";
    console.log(`Added new task: "${taskText}"`);
};


// When the "Add" button is clicked, add the task
button.addEventListener("click", addTask);

// Allow adding task by pressing "Enter" in the input field
input.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        addTask();
        event.preventDefault(); // Prevent default Enter key behavior (e.g., form submission)
    }
});

// Initial log to confirm script loaded
console.log("Todo List JavaScript loaded successfully.");
