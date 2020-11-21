const getTask = async (_id, callback) => {
    try {
        const task = await fetch(`/tasks/${_id}`, {
            headers: {
                'Authorization': "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmIyZWQyOWU2NDZjMTA1ODg0M2Q4YzAiLCJpYXQiOjE2MDU1NjE2NDF9.VOWtyGnzmkpQHxWeHSRYEvdXTUzWcnUlpPlJbT2boSQ"
            }
        })
        let data = await task.json();
        callback(data)
    } catch (e) {
        throw new Error(e)
    }
}
const getTasks = async (callback) => {
    try {
        const tasksResponse = await fetch('/tasks', {
            headers: {
                'Authorization': "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmIyZWQyOWU2NDZjMTA1ODg0M2Q4YzAiLCJpYXQiOjE2MDU1NjE2NDF9.VOWtyGnzmkpQHxWeHSRYEvdXTUzWcnUlpPlJbT2boSQ"
            }
        })
        let data = await tasksResponse.json();
        callback(data)
    } catch (e) {
        throw new Error(e)
    }
}

const renderTaskFromDB = (task) => {
        const newTask = document.createElement('div');
        newTask.classList.add('task');
        newTask.setAttribute('id', task._id);

        newTask.innerHTML = `
        <div class="task-content">
        <i class="far fa-circle" aria-hidden="true"> </i>
        <span>${task.description}</span>
        </div>
        <button class="edit-task" onclick=openEditPanel(${task._id})>edit</button>
        <button class="delete-task">delete</button>
        `
        taskSection.appendChild(newTask);
        if(task.completed) {
            newTask.children[0].children[1].classList.toggle('task-completed');
            toggleIcon(newTask.children[0].children[1]);
        }
        taskInput.value = '';

}
const toggleTaskDB = async (_id) => {
    getTask(_id, async (data) => {
        let task = data
        try {
            await fetch(`/tasks/${_id}`, {
                method: 'PATCH',
                headers: {
                    'Authorization': "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmIyZWQyOWU2NDZjMTA1ODg0M2Q4YzAiLCJpYXQiOjE2MDU1NjE2NDF9.VOWtyGnzmkpQHxWeHSRYEvdXTUzWcnUlpPlJbT2boSQ",
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "completed":  task.completed? false : true
                })
            })
        } catch (e) {
            throw new Error (e)
        }
    })

}

const deleteTask = async (_id) => {
    try {
        await fetch(`/tasks/${_id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmIyZWQyOWU2NDZjMTA1ODg0M2Q4YzAiLCJpYXQiOjE2MDU1NjE2NDF9.VOWtyGnzmkpQHxWeHSRYEvdXTUzWcnUlpPlJbT2boSQ",
                'Content-Type': 'application/json'
            }
        })
    } catch (e) {
        console.log(e)
    }
}

getTasks((data) => {
    data.forEach(task => {
        renderTaskFromDB(task)
    });
})
