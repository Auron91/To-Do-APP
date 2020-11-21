const loginForm = document.querySelector('#login-form')

let userToken, userData

const handleLogin = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const plainFormData = Object.fromEntries(formData.entries())
    try {
        await fetch('/users/login', {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                "Connection": "keep-alive"
            },
            body: JSON.stringify({
                "email": plainFormData.email,
                "password": plainFormData.password
            })
        }).then(res => {
            res.json().then(({ user, token }) => {
                userData = user
                setCookie("userToken", token, 7)
                window.location.href = "/app"
            })
        })
    } catch (e) {
        throw new Error(e)
    }
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

loginForm.addEventListener('submit', handleLogin)