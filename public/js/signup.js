const form = document.querySelector('form')

form.addEventListener('submit', async (e) => {
    e.preventDefault()

    //get the values
    const name = form.name.value
    const email = form.email.value
    const password = form.password.value

    try {
        const res = await fetch('/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            withCredentials: 'true',
            body: JSON.stringify({ name, email, password })
        })

        location.assign('/')

    } catch (err) {
        console.log(err)
    }
})