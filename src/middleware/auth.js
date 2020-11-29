const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async (req, res, next) => {
    try {
        //const token = req.header('Authorization').replace('Bearer ', '')
        const token = req.cookies.jwt
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })

        if (!user) {
            res.redirect('/login')
            throw new Error()
        }

        req.token = token
        req.user = user
        next()
    } catch (err) {
        res.status(401).send({ error: "please authenticate." })
    }
}

const checkUser = async (req, res, next) => {
    const token = req.cookies.jwt

    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
            if(err) {
                console.log(err.message)
                res.locals.user = null
                next()
            } else {
                let user = await User.findById(decodedToken._id)
                res.locals.user = user
                next()
            }
        })
    } else {
        res.locals.user = null
        next()
    }
}
module.exports = { auth, checkUser }

