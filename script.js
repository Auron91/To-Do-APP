const tasks = document.querySelectorAll('label');
const addBtn = document.querySelector('.add-btn');
const taskInput = document.querySelector('#task-input');
const allCheckboxes = document.querySelectorAll('input[type="checkbox"]');
const taskSection = document.querySelector('.tasks-section');
const textArea = document.querySelector('#task-input');
let taskID = 3;

// const toggleTask = ID => {
//     const element = document.getElementById(ID);
//     const label = element.parentElement.nodeList;
//     console.log(label);
//     label.classList.toggle('line-through');
// }
const toggleTask = ID => {
    const element = document.getElementById(`label-${ID}`);
    console.log(element);
    element.parentElement.classList.toggle('line-through');
}
const createTask = () => {
    const newTask = document.createElement('div');
    newTask.classList.add('task');
    newTask.setAttribute('id', taskID);

    newTask.innerHTML = `
    <input type="checkbox" name="" id="checkbox-${taskID}" onchange=toggleTask(${taskID})">
    <label for="checkbox-${taskID}">${textArea.value}</label>
    <div class="modify-task">
        <button class="edit-task" onclick=editTask(${taskID})>edit</button>
        <button class="delete-task" onclick=delteTask(${taskID})>delete</button>
    </div>
    `

    taskID++;
    taskSection.appendChild(newTask);
}

addBtn.addEventListener('click', createTask);
('change', createTask);