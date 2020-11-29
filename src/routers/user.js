const express = require('express')
const multer = require('multer')
const sharp = require('sharp')

const User = require('../models/user')
const { auth }  = require('../middleware/auth')
const { sendWelcomeEmail, sendCancelationEmail } = require('../emails/account')
const router = new express.Router()

// 1 day in seconds
const maxAge = 24 * 60 * 60

//handle errors
const handleErrors = (err) => {
    console.log( err.message, err.code )
    let errors = { name: '', email: '', password: '' }

    if(err.message === 'incorrect email') {
        errors.email = 'That email is not registered'
    }

    if(err.message === 'incorrect password') {
        errors.password = 'Incorrect password'
    }
    if(err.message === 'Please enter name') {
        errors.name = 'Please enter name'
    }
    if(err.message === 'Unable to login') {
        errors.email = 'Bad login or password'
    }
    // duplicate errors code
    if (err.code === 11000) {
        errors.email = 'That email is already registered'
        return errors
    }

    // validation errorrs
    if(err.message.includes('User validation failed')){
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message
        })
    }
    return errors
}

// sign up route
router.post('/users', async (req, res) => {
    let user = new User(req.body)
    try {
        await user.save()
        await sendWelcomeEmail(user.email, user.name)
        const token = await user.generateAuthToken()
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 })
        res.status(201).send({ user})
    } catch (err) {
        const errors = handleErrors(err)
        console.log(errors)
        res.status(400).json({ errors })
    }
})
// login route
router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.cookie('jwt', token,  { httpOnly: true, maxAge: maxAge * 1000 } )
        res.status(200).send({ user })
    } catch (err) {
        const errors = handleErrors(err)
        res.status(400).json({ errors })
    }
})

//logout route
router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

//logout from all sesions
router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

//  GET all users
router.get('/users', async (req, res) => {
    try {
        const users = await User.find({})
        res.send(users)
    } catch (e) {
        res.status(500).send()
    }
})

// Get user profile
router.get('/users/me', auth, async (req, res) => {
    res.send(req.user)
})

// update profile
router.patch('/users/me', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const alloweUpdates = ["name", "email", "password", "age"]
    const isValidOperation = updates.every((update) => alloweUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        updates.forEach((update) => { req.user[update] = req.body[update] })
        await req.user.save()

        res.send(req.user)
    } catch (e) {
        res.status(400).send("e")
    }
})

// delete profile
router.delete('/users/me', auth, async (req, res) => {
    try {
        await req.user.remove()
        sendCancelationEmail(req.user.email, req.user.name)
        res.send(req.user)
    } catch (e) {
        res.status(500).send(e)
    }
})

module.exports = router