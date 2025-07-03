// DOM Elements
const sidebarToggle = document.getElementById('sidebarToggle');
const closeSidebar = document.getElementById('closeSidebar');
const sidebar = document.getElementById('sidebar');
const darkToggle = document.getElementById('darkmodeToggle');
const input = document.getElementById('new-task');
const addBtn = document.getElementById('add-btn');
const taskList = document.getElementById('task-list');

// Toggle sidebar
sidebarToggle.addEventListener('click', () => {
  sidebar.classList.add('active');
});

closeSidebar.addEventListener('click', () => {
  sidebar.classList.remove('active');
});

// Dark mode toggle
darkToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
});

// Set initial theme
if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark');
}

// Load tasks
function loadTasks() {
  const savedTasks = localStorage.getItem('tasks');
  if (savedTasks) {
    taskList.innerHTML = '';
    JSON.parse(savedTasks).forEach(task => {
      addTaskToDOM(task.text, task.checked);
    });
  }
}

// Add new task
function addTask() {
  const taskText = input.value.trim();
  if (!taskText) return;

  addTaskToDOM(taskText, false);
  input.value = '';
  saveTasks();
}

function addTaskToDOM(text, isChecked) {
  const li = document.createElement('li');
  li.innerHTML = `
    <input type="checkbox" ${isChecked ? 'checked' : ''}>
    <label>${text}</label>
    <button class="delete-btn">
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
      </svg>
    </button>
  `;

  const checkbox = li.querySelector('input');
  const deleteBtn = li.querySelector('.delete-btn');

  checkbox.addEventListener('change', saveTasks);
  deleteBtn.addEventListener('click', () => {
    li.remove();
    saveTasks();
  });

  taskList.appendChild(li);
}

// Save tasks to localStorage
function saveTasks() {
  const tasks = Array.from(taskList.children).map(li => ({
    text: li.querySelector('label').textContent,
    checked: li.querySelector('input').checked
  }));
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Event listeners
addBtn.addEventListener('click', addTask);
input.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') addTask();
});

// Close sidebar when clicking outside
document.addEventListener('click', (e) => {
  if (!sidebar.contains(e.target) && e.target !== sidebarToggle) {
    sidebar.classList.remove('active');
  }
});

// Prevent event bubbling
sidebarToggle.addEventListener('click', (e) => {
  console.log('Button clicked');
  e.stopPropagation(); 
});

// Toggle sidebar and button visibility
sidebarToggle.addEventListener('click', function() {
  sidebar.classList.add('active');
  this.style.opacity = '0';
  this.style.pointerEvents = 'none';
});

// Close sidebar and show toggle button
closeSidebar.addEventListener('click', function() {
  sidebar.classList.remove('active');
  sidebarToggle.style.opacity = '1';
  sidebarToggle.style.pointerEvents = 'auto';
});

// Close when clicking outside
document.addEventListener('click', function(e) {
  if (!sidebar.contains(e.target) && e.target !== sidebarToggle) {
    sidebar.classList.remove('active');
    sidebarToggle.style.opacity = '1';
    sidebarToggle.style.pointerEvents = 'auto';
  }
});

// Initialize
loadTasks();