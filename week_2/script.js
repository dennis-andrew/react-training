const todoList = document.querySelector("#todo-list");
const addButton = document.querySelector("#add-button");
const deleteButton = document.querySelector("#delete-button");
const inputField = document.querySelector("#new-todo");

addButton.addEventListener("click", function(){
    if(inputField.value.length>0){
        const newItem= document.createElement("li");
        const label=document.createElement("label");
        const input= document.createElement("input");
        input.type="checkbox";
        label.append(input);
        label.append(` ${inputField.value}`);
        newItem.appendChild(label);
        todoList.appendChild(newItem);
        inputField.value = "";
    }
});

deleteButton.addEventListener("click",function(){
    const checkedBoxes = todoList.querySelectorAll('input[type="checkbox"]:checked');

    checkedBoxes.forEach(function (checkbox) {
        checkbox.closest("li").remove();
    });
});

todoList.addEventListener("change", function(e){
    if(e.target.checked){
        e.target.parentElement.style.textDecoration = "line-through";
    } else {
        e.target.parentElement.style.textDecoration = "none";
    }
});
