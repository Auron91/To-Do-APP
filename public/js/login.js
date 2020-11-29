const form = document.querySelector('form')
const emailError = document.querySelector('.email.error')
const passwordError = document.querySelector('.password.error')

form.addEventListener('submit', async (e) => {
    e.preventDefault()

    //reset errors
    emailError.textContent = ""
    passwordError.textContent = ""

    //get the values
    const email = form.email.value
    const password = form.password.value

    try {
        const res = await fetch('/users/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            withCredentials: 'true',
            body: JSON.stringify({ email, password })
        })
        const data = await res.json()
        if (data.errors) {
            emailError.textContent = data.errors.email
            passwordError.textContent = data.errors.password
        }
        if (data.user) {
            location.assign('/main')
        }
    } catch (err) {
        console.log(err)
    }
})