const form = document.querySelector('form')

form.addEventListener('submit', async (e) =>{
    e.preventDefault()

    //get the values
    const email = form.email.value
    const password = form.password.value

    try {
        const res = await fetch('/users/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            withCredentials: 'true',
            body: JSON.stringify({email, password})
        })

        const data = await res.json()
        if(data.user) {
            location.assign('/main')
        }
    } catch (err) {
        console.log(err)
    }
})