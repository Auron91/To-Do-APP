
//handle errors
const handleErrors = (err) => {
    console.log(err.message, err.code)
    let errors = {email: '', password: ''}

    if(err.message === 'incorrect email') {
        errors.email = 'That email is not registered'
    }

    if(err.message === 'incorrect password') {
        errors.password = 'Incorrect password'
    }

    // duplicate errors code
    if (err.code === 11000) {
        errors.email = 'That email is already registered'
        return errors
    }

    // validation errorrs
    if(err.message.includes('user validation failed')){
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message
        })
    }
    return errors
}

module.exports = {
    handleErrors
}