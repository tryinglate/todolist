// Get the input box, button, and list
const input = document.getElementById("new-task");
const button = document.getElementById("add-btn");
const list = document.getElementById("task-list");

// Function to add a new task to the list
const addTask = () => {
    const taskText = input.value.trim(); // Get the text from the box and remove leading/trailing whitespace

    // If the input is empty, do nothing
    if (taskText === "") {
        console.log("Task input is empty. Not adding a new task.");
        return;
    }

    // Create a unique ID for the checkbox and label
    // Using Date.now() and a random number ensures a high probability of uniqueness
    const uniqueId = `task-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    // Create a list item (li) for the new task
    const li = document.createElement("li");

    // Create the checkbox input element
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = uniqueId; // Assign the unique ID to the checkbox

    // Create the label element for the task text
    // The 'for' attribute links the label to its corresponding checkbox by ID
    const label = document.createElement("label");
    label.htmlFor = uniqueId; // Link the label to the checkbox
    label.textContent = taskText; // Set the text content of the label

    // Append the checkbox and the label to the list item
    li.appendChild(checkbox);
    li.appendChild(label);

    // Add an event listener to the checkbox to handle state changes
    // This listener is crucial for the CSS line-through effect to work
    checkbox.addEventListener("change", () => {
        // The CSS rule 'input[type="checkbox"]:checked + label' handles the styling
        // So, no direct JS manipulation of text decoration is needed here for that specific effect.
        console.log(`Task "${taskText}" is now ${checkbox.checked ? 'checked' : 'unchecked'}.`);
    });

    // Append the new list item to the task list (ul)
    list.appendChild(li);

    // Clear the input box after adding the task
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
