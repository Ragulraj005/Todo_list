// script.js
const form = document.getElementById("form");
const input = document.getElementById("input");
const todosUl = document.getElementById("todos");

// Step 7: Adding event listener to form submit
form.addEventListener("submit", (e) => {
  e.preventDefault();
  addTodo();
});

// Step 12: Function to update localStorage
function updateLS() {
  const todosEl = document.querySelectorAll(".todos li");
  const todos = [];

  todosEl.forEach((todo) => {
    todos.push({
      text: todo.innerText,
      completed: todo.classList.contains('completed')
    });
  });

  localStorage.setItem('todos', JSON.stringify(todos));
}

// Step 13: Retrieving todos from localStorage and adding them to the list
const todos = JSON.parse(localStorage.getItem('todos'));

if (todos) {
  todos.forEach((todo) => {
    addTodo(todo);
  });
}

// Step 9: Function to add new todo
function addTodo(todo) {
  let todoText = input.value;

  if (todo) {
    todoText = todo.text;
  }

  if (todoText) {
    const todoEl = document.createElement("li");

    if (todo && todo.completed) {
      todoEl.classList.add('completed');
    }

    todoEl.innerText = todoText;

    todoEl.addEventListener('click', () => {
      todoEl.classList.toggle("completed");
      updateLS();
    });

    todoEl.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      todoEl.remove();
      updateLS();
    });

    todosUl.appendChild(todoEl);
    input.value = '';
    updateLS();
  }
}
