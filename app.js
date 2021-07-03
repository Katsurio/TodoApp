const todoUl = document.querySelector('#todos');
const form = document.querySelector('#input-form');
const addTodo = document.querySelector('#todo-input');

form.addEventListener('submit', function(evt) {
    evt.preventDefault();
    
    const todoLi = document.createElement('li');
    todoLi.classList.add('todo-item');
    todoLi.innerText = addTodo.value + " ";

    const removeLi = document.createElement('button');
    removeLi.innerText = "Remove";

    todoLi.append(removeLi);
    todoUl.append(todoLi); 
    addTodo.value = '';
})

todoUl.addEventListener('click', function(evt) {
    evt.preventDefault();
    const target = evt.target;
    
    target.tagName === "BUTTON" ? target.parentElement.remove() : '';
    
}
)