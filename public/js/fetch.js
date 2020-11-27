function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

const token = getCookie('jwt')

const getTask = async (_id, callback) => {
    try {
        const task = await fetch(`/tasks/${_id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
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
                'Authorization': `Bearer ${token}`
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
        <button class="edit-task" onclick=openEditPanel("${task._id}")>edit</button>
        <button class="delete-task">delete</button>
        `
    taskSection.appendChild(newTask);
    if (task.completed) {
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
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "completed": task.completed ? false : true
                })
            })
        } catch (e) {
            throw new Error(e)
        }
    })

}

const editTaskDB = async (_id, description) => {
    try {
        await fetch(`/tasks/${_id}`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "description": description
            })
        })
    } catch (e) {
        throw new Error(e)
    }
}

const deleteTask = async (_id) => {
    try {
        await fetch(`/tasks/${_id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
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
