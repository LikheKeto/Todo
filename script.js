const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo")

document.addEventListener("DOMContentLoaded",getTodos)
todoButton.addEventListener("click",addTodo);
todoList.addEventListener("click",checkAndDelete)
filterOption.addEventListener("click",filterTodo)

function addTodo(event){
    event.preventDefault();
    if (todoInput.value === ""){
        return
    }

    //create new div
    const todoDiv = document.createElement("div")
    todoDiv.classList.add("todo")
    //create new line
    const newTodo = document.createElement("li")
    newTodo.innerText = todoInput.value
    newTodo.classList.add("todo-item")
    todoDiv.appendChild(newTodo)
    //add todo to local storage
    saveLocal(todoInput.value)
    //create completed buttons
    const completedButton = document.createElement("button")
    completedButton.innerHTML = ('<i class = "fas fa-check"></i>')
    completedButton.classList.add("completed-btn")
    todoDiv.appendChild(completedButton)
    //create trash button
    const trashButton = document.createElement("button")
    trashButton.innerHTML = ('<i class = "fas fa-trash"></i>')
    trashButton.classList.add("trash-btn")
    todoDiv.appendChild(trashButton)
    //append big div and list
    todoList.appendChild(todoDiv)
    todoInput.value = ""
    filterTodo()
}

function checkAndDelete(e){
    const item = e.target
    //delete
    if(item.classList[0]==="trash-btn"){
        const todo = item.parentElement
        deleteFromStorage(todo) 
        todo.classList.add("fall")
        todo.addEventListener("transitionend",()=>{
            todo.remove()
        })
    }
    //checkmark
    if(item.classList[0]==="completed-btn"){
        var todo = item.parentElement
        todo.classList.toggle("completed")
    }
    filterTodo()
}
function filterTodo(e){
    const todos = todoList.childNodes
    todos.forEach(function(todo){
        switch(filterOption.value){
            case "all":
                todo.style.display = "flex"
            break;
            case "completed":
                if(todo.classList.contains("completed")){
                    todo.style.display = "flex"
                }
                else{
                    todo.style.display = "none"
                }
                break;
            case "incomplete":
                if(todo.classList.contains("completed")){
                    todo.style.display = "none"
                }
                else{
                    todo.style.display = "flex"
                }
                break;
        }
    })


}

function saveLocal(todo){
    let todos;
    if(localStorage.getItem('todos')===null){
        todos = []
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"))}
    todos.push(todo)
    localStorage.setItem("todos",JSON.stringify(todos))
    
}

function getTodos(){
    let todos;
    if(localStorage.getItem('todos')===null){
        todos = []
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"))}
    todos.forEach(function(todo){
        //create new div
    const todoDiv = document.createElement("div")
    todoDiv.classList.add("todo")
    //create new line
    const newTodo = document.createElement("li")
    newTodo.innerText = todo
    newTodo.classList.add("todo-item")
    todoDiv.appendChild(newTodo)
    //create completed buttons
    const completedButton = document.createElement("button")
    completedButton.innerHTML = ('<i class = "fas fa-check"></i>')
    completedButton.classList.add("completed-btn")
    todoDiv.appendChild(completedButton)
    //create trash button
    const trashButton = document.createElement("button")
    trashButton.innerHTML = ('<i class = "fas fa-trash"></i>')
    trashButton.classList.add("trash-btn")
    todoDiv.appendChild(trashButton)
    //append big div and list
    todoList.appendChild(todoDiv)
    })
}

function deleteFromStorage(todo){
    let todos;
    if(localStorage.getItem('todos')===null){
        todos = []
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"))
    }
    let index = todo.children[0].innerText;
    todos.splice(todos.indexOf(index),1)
    localStorage.setItem("todos", JSON.stringify(todos))

}

