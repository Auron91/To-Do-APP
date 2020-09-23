const tasks = document.querySelector('.tasks-section');

// tasks area
const textArea = document.querySelector('#task-input');
const taskSection = document.querySelector('.tasks-section');
const taskInput = document.querySelector('#task-input');

//edit panel
const editInput = document.querySelector('.edit-text');
const editPanel = document.querySelector('.edit-panel');

// Buttons
const addBtn = document.querySelector('.add-btn');
const saveBtn = document.querySelector('.save-button');
const cancelBtn = document.querySelector('.cancel-button');

let editTemp = undefined; // holds ID of acctualy edited note
let taskID = 3;

// sphagetti code for eventListener. Function checks if clicked on edit/delete buttons or on other elements of task DIV. Then toggle style. Great DOM relation playground. Try do span with <i> and textContent for simplicity.
const toggleTask = (e) => {
    if (e.target.className == 'delete-task') {
        const parentDiv = e.target.parentElement;
        tasks.removeChild(parentDiv);
    } else if (e.target.className == 'edit-task') {
        null;
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
    if (iconNode.classList == 'far fa-circle') {
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
    if (textArea.value !== '') {
        const newTask = document.createElement('div');
        newTask.classList.add('task');
        newTask.setAttribute('id', taskID);

        newTask.innerHTML = `
        <div class="task-content">
        <i class="far fa-circle" aria-hidden="true"> </i>
        <span>${textArea.value}</span>
        </div>

        <button class="edit-task" onclick=editTask(${taskID})>edit</button>
        <button class="delete-task">delete</button>
        `

        taskID++;
        taskSection.appendChild(newTask);
        taskInput.value = '';
    } else {
        showError();
    }
}

const showError = () => {
    alert("Task can't be empty");
}

const openEditPanel = (id) => {
    const noteToEdit = document.getElementById(id);
    editInput.value = noteToEdit.children[0].children[1].textContent;
    editTemp = id;
    toggleEditPanel();
}

const editTask = () => {
    const noteToEdit = document.getElementById(editTemp);
    if(editInput.value !== ''){
    noteToEdit.children[0].children[1].textContent = editInput.value;
    editInput.value = '';
    toggleEditPanel();
    } else showError();
}

const toggleEditPanel = () => {
    editPanel.classList.toggle('active');
}

// Event Listeners
tasks.addEventListener('click', toggleTask);
addBtn.addEventListener('click', createTask);
textArea.addEventListener('keydown', e => {
    if(e.key === 'Enter') {
        createTask();
    }
});
editInput.addEventListener('keydown', e => {
    if(e.key === 'Enter') {
        editTask();
    }else if(e.key === 'Escape'){
        toggleEditPanel();
    }
});
saveBtn.addEventListener('click', editTask);
cancelBtn.addEventListener('click', toggleEditPanel);
