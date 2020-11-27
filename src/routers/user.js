const express = require('express')
const multer = require('multer')
const sharp = require('sharp')

const User = require('../models/user')
const auth = require('../middleware/auth')
const { sendWelcomeEmail, sendCancelationEmail } = require('../emails/account')
const router = new express.Router()

// 3 days in seconds
const maxAge = 3 * 24 * 60 * 60

// sign up route
router.post('/users', async (req, res) => {
    let user = new User(req.body)
    try {
        await user.save()
        await sendWelcomeEmail(user.email, user.name)
        const token = await user.generateAuthToken()
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 })
        res.status(201).send({ user})
    } catch (e) {
        res.status(400).send(e)
    }
})
// login route
router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.cookie('jwt', token,  { httpOnly: true, maxAge: maxAge * 1000 } )
        res.status(200).send({ user, token })
    } catch (e) {
        res.status(400).send()
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
    //const _id = req.user._id
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
    //const _id = req.user._id
    try {
        // const user = await User.findByIdAndRemove(_id)
        // if(!user) {
        //     return res.status(404).send()
        // }
        // res.send(user)
        await req.user.remove()
        sendCancelationEmail(req.user.email, req.user.name)
        res.send(req.user)
    } catch (e) {
        res.status(500).send(e)
    }
})

//multer settings
const upload = multer({
    //dest: './images/avatars',
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('File must be a picture'), undefined)
        }
        cb(undefined, true)
    }

})

router.post('/users/me/avatar', auth, upload.single('avatar'), async (req, res) => {
    //req.user.avatar = req.file.buffer
    const buffer = await sharp(req.file.buffer)
    .png()
    .resize({
        width: 250,
        height: 250
    })
    .toBuffer()

    req.user.avatar = buffer
    await req.user.save()
    res.status(200).send()
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})

router.delete('/users/me/avatar', auth, async (req, res) => {
    req.user.avatar = undefined
    await req.user.save()
    res.send()
})

router.get('/users/:id/avatar', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)

        if(!user || !user.avatar) {
            throw new Errror({error: "No user or pic"})
        }
        res.set('Content-Type', 'image/jpg').send(user.avatar)

    } catch(e) {
        res.status(404).send()
    }
})

// view routes

module.exports = router