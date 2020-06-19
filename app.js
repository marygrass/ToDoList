

const todoInput = document.querySelector('.todo-input');
const todoBtn = document.querySelector('.todo-btn');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

document.addEventListener('DOMContentLoaded', getTodos);
todoBtn.addEventListener('click', addTodo);
filterOption.addEventListener('click', filterTodo);
todoList.addEventListener('click', deleteCheck);


function addTodo(event) {

    //todo list
    event.preventDefault();
    //todo DIV
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    //create LI
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    //add todo to local storage
    saveLocalTodos(todoInput.value);
    //Check Mark Button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = "<i class='fas fa-check'></i>";

    completedButton.classList.add('complete-btn');
    todoDiv.appendChild(completedButton);
    //Check trash  Button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = "<i class='fas fa-trash'></i>";

    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton);


    //append to list
    todoList.appendChild(todoDiv);
    //clear todoInput value
    todoInput.value = "";
}

function deleteCheck(e) {

    const item = e.target;
    //DELETE TODO
    if (item.classList[0] === 'trash-btn') {
        const todo = item.parentElement;
        //animation

        todo.classList.add('fall');
        todo.addEventListener('transitionend', function () {
            todo.remove();
        });
        let text= todo.childNodes[0].innerText;
removeLocalTodos(text);
    }

    else if (item.classList[0] === 'complete-btn') {
        item.parentElement.classList.toggle('completed');
    }
}

function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function (todo) {
        switch (e.target.value) {
            case 'all':
                todo.style.display = 'flex';
                break;
            case 'completed':
                if (todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = "none";
                }
                break;

            case 'uncompleted':
                if (!todo.classList.contains('completed')) {
                    todo.style.display = "flex";
                }

                else {
                    todo.style.display = "none";
                }
                break;


        }
    });
}

function saveLocalTodos(todo) {
    //check content
    let todos;
    if (localStorage.getItem('todos') === null){
    todos=[];   
    }

    else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));

}

function getTodos(){
    let todos;
    if (localStorage.getItem('todos') === null){
    todos=[];   
    }

    else {
        todos = JSON.parse(localStorage.getItem('todos'));
        todos.forEach(function(todo){
            //todo DIV
            const todoDiv = document.createElement("div");
            todoDiv.classList.add("todo");
            
            //create LI
            const newTodo = document.createElement('li');
            newTodo.innerText = todo;
            newTodo.classList.add('todo-item');
            todoDiv.appendChild(newTodo);
            
            //Check Mark Button
            const completedButton = document.createElement('button');
            completedButton.innerHTML = "<i class='fas fa-check'></i>";
            
            completedButton.classList.add('complete-btn');
            todoDiv.appendChild(completedButton);
            //Check trash  Button
            const trashButton = document.createElement('button');
            trashButton.innerHTML = "<i class='fas fa-trash'></i>";
            
            trashButton.classList.add('trash-btn');
            todoDiv.appendChild(trashButton);
            
            
            //append to list
            todoList.appendChild(todoDiv);
              });
    }  


}

function removeLocalTodos(todo){
    let todos;
  
        todos = JSON.parse(localStorage.getItem('todos'));
    

const index= todos.indexOf(todo);
todos.splice(index,1);
localStorage.setItem('todos', JSON.stringify(todos));

}