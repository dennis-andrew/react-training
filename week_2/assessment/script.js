const todoList = document.querySelector("#todo-list");
const addButton = document.querySelector("#add-button");
const deleteButton = document.querySelector("#delete-button");
const inputField = document.querySelector("#new-todo");
const STORAGE_KEY = "week2Todos";
let todos = [];

function createTodoItem(todo, index) {
    const newItem = document.createElement("li");
    const label = document.createElement("label");
    const input = document.createElement("input");

    input.type = "checkbox";
    input.checked = todo.completed;
    input.dataset.index = index;

    if (todo.completed) {
        label.style.textDecoration = "line-through";
    }

    label.append(input);
    label.append(` ${todo.text}`);
    newItem.appendChild(label);
    todoList.appendChild(newItem);
}

function getDefaultTodos() {
    return Array.from(todoList.querySelectorAll("li")).map(function (item) {
        const checkbox = item.querySelector('input[type="checkbox"]');

        return  {
            text: item.textContent.trim(),
            completed: checkbox.checked,
        };
    });
}

function renderTodos() {
    todoList.innerHTML = "";

    todos.forEach(function (todo, index) {
        createTodoItem(todo, index);
    });
}

function saveTodos() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

function loadTodos() {
    const savedTodos = JSON.parse(localStorage.getItem(STORAGE_KEY));

    if (savedTodos) {
        todos = savedTodos;
    } else {
        todos = getDefaultTodos();
        saveTodos();
    }

    renderTodos();
}

loadTodos();

addButton.addEventListener("click", function () {
    const todoText = inputField.value.trim();

    if (todoText.length > 0) {
        todos.push({
            text: todoText,
            completed: false,
        });
        saveTodos();
        renderTodos();
        inputField.value = "";
    }
});

deleteButton.addEventListener("click", function () {
    todos = todos.filter(function (todo) {
        return !todo.completed;
    });

    saveTodos();
    renderTodos();
});

todoList.addEventListener("change", function (e) {
    const todoIndex = Number(e.target.dataset.index);
    todos[todoIndex].completed = e.target.checked;

    saveTodos();
    renderTodos();
});
