const tasks = document.querySelector('.tasks-section');
const addBtn = document.querySelector('.add-btn');
const taskInput = document.querySelector('#task-input');
const allCheckboxes = document.querySelectorAll('input[type="checkbox"]');
const taskSection = document.querySelector('.tasks-section');
const textArea = document.querySelector('#task-input');

let taskID = 3;

const toggleTask = (e) => {
    if(e.target.className == 'delete-task'){
        const parentDiv = e.target.parentElement.parentElement;
        tasks.removeChild(parentDiv);
    } else if (e.target.className == 'edit-task') {
        console.log('edit task');
    } else {

    }
}

const createTask = () => {
    const newTask = document.createElement('div');
    newTask.classList.add('task');
    newTask.setAttribute('id', taskID);

    newTask.innerHTML = `
    <i class="far fa-circle" aria-hidden="true"> </i>
    <span>${textArea.value}</span>
    <div class="modify-task">
        <button class="edit-task" onclick=editTask(${taskID})>edit</button>
        <button class="delete-task" >delete</button>
    </div>
    `

    taskID++;
    taskSection.appendChild(newTask);
}

tasks.addEventListener('click', toggleTask);
addBtn.addEventListener('click', createTask);
