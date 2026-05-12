const todoList = document.querySelector("#todo-list");
const addButton = document.querySelector("#add-button");
const deleteButton = document.querySelector("#delete-button");
const inputField = document.querySelector("#new-todo");
const STORAGE_KEY = "week2Todos";

function createTodoItem(todoText, isCompleted = false) {
    const newItem = document.createElement("li");
    const label = document.createElement("label");
    const input = document.createElement("input");

    input.type = "checkbox";
    input.checked = isCompleted;

    if (isCompleted) {
        label.style.textDecoration = "line-through";
    }

    label.append(input);
    label.append(` ${todoText}`);
    newItem.appendChild(label);
    todoList.appendChild(newItem);
}

function getTodosFromPage() {
    const todoItems = todoList.querySelectorAll("li");

    return Array.from(todoItems).map(function (item) {
        const checkbox = item.querySelector('input[type="checkbox"]');

        return {
            text: item.textContent.trim(),
            completed: checkbox.checked,
        };
    });
}

function saveTodos() {
    const todos = getTodosFromPage();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

function loadTodos() {
    const savedTodos = JSON.parse(localStorage.getItem(STORAGE_KEY));

    if (savedTodos) {
        todoList.innerHTML = "";

        savedTodos.forEach(function (todo) {
            createTodoItem(todo.text, todo.completed);
        });
    } else {
        saveTodos();
    }
}

loadTodos();

addButton.addEventListener("click", function () {
    const todoText = inputField.value.trim();

    if (todoText.length > 0) {
        createTodoItem(todoText);
        saveTodos();
        inputField.value = "";
    }
});

deleteButton.addEventListener("click", function () {
    const checkedBoxes = todoList.querySelectorAll('input[type="checkbox"]:checked');

    checkedBoxes.forEach(function (checkbox) {
        checkbox.closest("li").remove();
    });

    saveTodos();
});

todoList.addEventListener("change", function (e) {
    if (e.target.checked) {
        e.target.parentElement.style.textDecoration = "line-through";
    } else {
        e.target.parentElement.style.textDecoration = "none";
    }

    saveTodos();
});
