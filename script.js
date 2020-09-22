const tasks = document.querySelector('.tasks-section');
const addBtn = document.querySelector('.add-btn');
const taskInput = document.querySelector('#task-input');
const allCheckboxes = document.querySelectorAll('input[type="checkbox"]');
const taskSection = document.querySelector('.tasks-section');
const textArea = document.querySelector('#task-input');

let taskID = 3;

// sphagetti code for eventListener. Function checks if clicked on edit/delete buttons or on other elements of task DIV. Then toggle style. Great DOM relation playground.
const toggleTask = (e) => {
    if (e.target.className == 'delete-task') {
        const parentDiv = e.target.parentElement.parentElement;
        tasks.removeChild(parentDiv);
    } else if (e.target.className == 'edit-task') {
        console.log('edit task');
    } else if (e.target.className == 'task') {
        const spanNode = e.target.children[0].children[1];
        spanNode.classList.toggle('task-completed');
        toggleIcon(spanNode);
    } else if (e.target.nodeName === 'SPAN') {
        const spanNode = e.target;
        spanNode.classList.toggle('task-completed');
        toggleIcon(spanNode);
    } else if (e.target.nodeName === 'I') {
        const spanNode = e.target.parentElement.children[1];
        spanNode.classList.toggle('task-completed');
        toggleIcon(spanNode);
    }
}
const toggleIcon = (siblingNode) => {
    const iconNode = siblingNode.previousElementSibling;
    if(iconNode.classList == 'far fa-circle'){
        iconNode.classList.remove('fa-circle');
        iconNode.classList.add('fa-check-circle');
        //console.log('icon set to check');
    } else {
        iconNode.classList.remove('fa-check-circle');
        iconNode.classList.add('fa-circle');
        //console.log('icon set to circle');
    }
}
const createTask = () => {
    const newTask = document.createElement('div');
    newTask.classList.add('task');
    newTask.setAttribute('id', taskID);

    newTask.innerHTML = `
    <div class="task-content">
    <i class="far fa-circle" aria-hidden="true"> </i>
    <span>${textArea.value}</span>
    </div>
    
    <div class="modify-task">
        <button class="edit-task">edit</button>
        <button class="delete-task">delete</button>
    </div>
    `

    taskID++;
    taskSection.appendChild(newTask);
}

tasks.addEventListener('click', toggleTask);
addBtn.addEventListener('click', createTask);
