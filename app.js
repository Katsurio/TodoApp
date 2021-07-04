let todoUl = document.querySelector('#todos');
let form = document.querySelector('#input-form');

const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];

if (savedTodos) {
    for (let i = 0; i < savedTodos.length; i++) {
        let restoreTodo = document.createElement('li');
        restoreTodo.innerText = savedTodos[i].task;
        restoreTodo.isCompleted = savedTodos[i].isCompleted;

        let removeBtn = document.createElement('button');
        removeBtn.innerText = "Remove";

        restoreTodo.appendChild(removeBtn);
        todoUl.appendChild(restoreTodo); 

         // check if completed and add textDecoration
         restoreTodo.isCompleted ? restoreTodo.style.textDecoration = "line-through" : restoreTodo.style.textDecoration = "none"; 
         
    }
}

form.addEventListener('submit', function(evt) {
    evt.preventDefault();
    
    let newTodo = document.createElement('li');
    let taskVal = document.querySelector('input[type="text"]').value;
    newTodo.innerText = taskVal;

    newTodo.isCompleted = false;

    let removeBtn = document.createElement('button');
    removeBtn.innerText = "Remove";

    newTodo.appendChild(removeBtn);
    todoUl.appendChild(newTodo); 
    form.reset();

    // Save to local storage
    savedTodos.push({'task': newTodo.firstChild.data, 'isCompleted': false});
    localStorage.setItem("todos", JSON.stringify(savedTodos));
})

todoUl.addEventListener('click', function(evt) {
    evt.preventDefault();
    let target = evt.target;
    let targTag = target.tagName;
    
    if (targTag === "LI") {
        checkCompleted(target);
    } else if (targTag === "BUTTON") {
        checkRemoved(target);
        target.parentElement.remove();
    }

})

// remove todo item from savedTodos and local storage
function checkRemoved(removed) {
    for (let i = 0; i < savedTodos.length; i++) {
        if (savedTodos[i].task === removed.parentElement.childNodes[0].data) {
            savedTodos.splice(i,1);
            localStorage.setItem("todos", JSON.stringify(savedTodos));
        }
      }
}

// check todo item completions and update savedTodos and save to local storage
function checkCompleted(checked) {
    if (!checked.isCompleted) {
        checked.style.textDecoration = "line-through"; 
        checked.isCompleted = true;
    } else {
        checked.style.textDecoration = "none"; 
        checked.isCompleted = false;
    }

    for (let i = 0; i < savedTodos.length; i++) {
        if (savedTodos[i].task === checked.firstChild.data) {
          savedTodos[i].isCompleted = !savedTodos[i].isCompleted;
          localStorage.setItem("todos", JSON.stringify(savedTodos));
        }
      }
}
