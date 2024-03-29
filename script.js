let taskList = [];

// Load tasks on page load
window.addEventListener("load", loadTask);

// Add task when add button is clicked
const addBtn = document.getElementById("addbtn");
addBtn.addEventListener("click", addTask);

// Load tasks from local storage
function loadTask() {
  const storedTask = localStorage.getItem("taskList");

  if (storedTask) {
    taskList = JSON.parse(storedTask);
    showList();
  }
}

// Add task to list
function addTask(e) {
  e.preventDefault();

  const input = document.getElementById("inputfield");
  const task = input.value.trim().toLowerCase(); // Convert new task to lowercase

  // Check if input is empty
  if (task === "") {
    alert("Please enter a task!");
    return;
  }
  // Check if task already exists in the list (case-insensitive)
  if (taskList.some(existingTask => existingTask.toLowerCase() === task)) {
    alert("Task already exists in the list!");
    return;
  }

  // Add task to list
  taskList.push(input.value);
  localStorage.setItem("taskList", JSON.stringify(taskList));
  input.value = "";

  // Show updated list
  showList();
  showToast("Task Added Successfully");
}


// Show task list
function showList() {
  const ul = document.getElementById("list");
  ul.innerHTML = "";

  // Add tasks to list

  taskList.forEach((task, index) => {
    const li = document.createElement("li");
    li.textContent = task;
    ul.appendChild(li);

    // Add delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete");
    deleteBtn.addEventListener("click", () => confirmDelete(index));
    li.appendChild(deleteBtn);
    
    // Add edit button
    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.classList.add("edit");
    editBtn.addEventListener("click", () => editTask(index));
    li.appendChild(editBtn);
  });
}

// Confirm task deletion
function confirmDelete(index) {
  const confirmDelete = confirm(`Are you sure you want to delete Task ?`);

  if (confirmDelete) {
    deleteTask(index);
  }
}

// Delete task
function deleteTask(index) {
  taskList.splice(index, 1);
  localStorage.setItem("taskList", JSON.stringify(taskList));
  deleteToast("Task Deleted Successfully")

  // Show updated list
  showList();
}

// Edit task
function editTask(index) {
  const input = document.getElementById("inputfield");
  input.value = taskList[index];
  taskList.splice(index, 1);
  localStorage.setItem("taskList", JSON.stringify(taskList));

  // Change add button to save button
  const addBtn = document.getElementById("addbtn");
  addBtn.textContent = "Save";
  addBtn.removeEventListener("click", addTask);
  addBtn.addEventListener("click", () => saveTask(index));
}

// Save task after editing
function saveTask(index) {
  event.preventDefault(); // prevent page reload

  const input = document.getElementById("inputfield");
  const task = input.value.trim();

  // Check if input is empty
  if (task === "") {
    alert("Please enter a task!");
      return;
  }

  // Save task to list
  taskList.splice(index, 0, task);
  localStorage.setItem("taskList", JSON.stringify(taskList));
  input.value = "";

  // Change save button to add button
  const addBtn = document.getElementById("addbtn");
  addBtn.textContent = "Add";
  addBtn.removeEventListener("click", saveTask);
  addBtn.addEventListener("click", addTask);

  // Show updated list
  showList();
  showToast("Task Updated Successfully");
}

function deleteToast(notification) {
  const toastDel = document.createElement('div');  //is to shows the toast in a form  
  toastDel.classList.add('toastDel');
  toastDel.textContent = notification;
  document.body.appendChild(toastDel);
  setTimeout(() => {
    toastDel.remove();
  }, 2000)
}

function showToast(notification) {
  const toastAdd = document.createElement('div');  //is to shows the toast in a form  
  toastAdd.classList.add('toastAdd');
  toastAdd.textContent = notification;
  document.body.appendChild(toastAdd);
  setTimeout(() => {
    toastAdd.remove();
  }, 2000)
}

const input = document.getElementById("inputfield");
input.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    addTask();
    event.preventDefault(); // Prevent default behavior
  }
});
