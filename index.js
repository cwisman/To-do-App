let todos = [];
let completedTodos = [];

const addButton = document.getElementById("add-todo-btn");
const todoInput = document.getElementById("new-todo");

addButton.addEventListener("click", function () {
  const todoText = todoInput.value;

  if (todoText.trim() !== "") {
    todos.push({ text: todoText, completed: false });
    renderTodos();
  }

  todoInput.value = "";
});

function deleteTodoFromArray(array, index) {
  array.splice(index, 1);
  renderTodos();
}

function toggleComplete(index, array) {
  array[index].completed = !array[index].completed;
  renderTodos();
}
// Load todos from localStorage when the page is loaded
window.addEventListener("load", function () {
  const storedTodos = JSON.parse(localStorage.getItem("todos"));
  if (storedTodos) {
    todos = storedTodos;
    renderTodos();
  }
});

// Save todos to localStorage whenever they are modified
function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

// Add event listener to save todos whenever they are modified
document.addEventListener("DOMContentLoaded", function () {
  document.addEventListener("click", function () {
    saveTodos();
  });
});
function renderTodos() {
  const incompleteTodoListContainer = document.getElementById(
    "incomplete-todo-list"
  );
  const completedTodoListContainer = document.getElementById(
    "completed-todo-list"
  );

  incompleteTodoListContainer.innerHTML = "<h3>Incomplete Todos</h3>";
  completedTodoListContainer.innerHTML = "<h3>Completed Todos</h3>";

  todos.forEach((todo, index) => {
    const todoItem = document.createElement("div");
    todoItem.className = "todo-item";
    todoItem.innerHTML = `
        <span class="todo-title" contenteditable="${!todo.completed}" ondblclick="enableEditing(this)">${
      todo.text
    }</span>
        <div class="todo-actions">
          ${
            !todo.completed
              ? `
            <button class="todo-btn complete" onclick="toggleComplete(${index}, todos)">Complete</button>
            <button class="todo-btn update" onclick="updateTodoFromArray(todos, ${index}, this.parentNode.previousElementSibling)">Update</button>
            <button class="todo-btn delete" onclick="deleteTodoFromArray(todos, ${index})">Delete</button>
          `
              : ""
          }
        </div>
      `;

    if (todo.completed) {
      completedTodoListContainer.appendChild(todoItem);
    } else {
      incompleteTodoListContainer.appendChild(todoItem);
    }
  });
}

function enableEditing(element) {
  element.contentEditable = true;
  element.focus();
}

function updateTodoFromArray(array, index, element) {
  const updatedText = element.textContent;
  if (updatedText.trim() !== "") {
    array[index].text = updatedText;
    renderTodos();
  } else {
    alert("To-do text cannot be empty.");
  }
}

function updateTodoInIncomplete(index, element) {
  updateTodoFromArray(todos, index, element);
}

function updateTodoInCompleted(index, element) {
  updateTodoFromArray(completedTodos, index, element);
}
// Select the refresh button
const refreshButton = document.getElementById("refresh-btn");

// Add event listener to the refresh button
refreshButton.addEventListener("click", function () {
  // Clear the todos array
  todos = [];
  // Clear todos from localStorage
  localStorage.removeItem("todos");
  // Render an empty todo list
  renderTodos();
});
