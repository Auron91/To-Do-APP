const form = document.querySelector('form')
const nameError = document.querySelector('.name.error')
const emailError = document.querySelector('.email.error')
const profileUpdated = document.querySelector('.updated.error')

form.addEventListener('submit', async (e) => {
    e.preventDefault()

    //reset errors
    nameError.textContent = ""
    emailError.textContent = ""
    profileUpdated.textContent =""

    //get the values
    const name = form.name.value
    const email = form.email.value

    try {
        const res = await fetch('/users/me', {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            withCredentials: 'true',
            body: JSON.stringify({ name, email })
        })
        const data = await res.json()
        if (data.errors) {
            nameError.textContent = data.errors.name
            emailError.textContent = data.errors.email
        }
        if(data.user) {

            location.assign('/')
        }
        profileUpdated.textContent ="Profile updated"

    } catch (err) {
        console.log(err)
    }
})