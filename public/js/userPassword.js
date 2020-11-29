const form = document.querySelector('form')
const passwordError = document.querySelector('.password.error')
const updatedError = document.querySelector('.updated.error')

form.addEventListener('submit', async (e) => {
    e.preventDefault()


    //reset errors
    passwordError.textContent = ""
    updatedError.textContent = ""

    //get the values
    //const password = form.password.value
    const newPassword = form.new_password.value
    const newPassword2 = form.new_password2.value

    if (newPassword !== newPassword2) {
        passwordError.textContent = "Passwords don't match"
    } else {
        try {
            const res = await fetch('/users/me', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                withCredentials: 'true',
                body: JSON.stringify({ password: newPassword })
            })
            const data = await res.json()
            if (data.errors) {
                passwordError.textContent = data.errors.password
            }
            updatedError.textContent="Password updated"
        } catch (err) {
            console.log(err)
        }
    }
})