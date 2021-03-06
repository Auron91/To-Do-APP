const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Task = require('./task')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter name'],
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Please enter an email'],
        trim: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please enter a valid email']
    },
    age: {
        type: Number,
        default: 0,
        min: [0, 'Age must be positive number']
    },
    password: {
        type: String,
        required: [true, 'Please enter password'],
        trim: true,
        minlength: [6, 'Minimum password length is 6 characters']
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    avatar: {
        type: Buffer
    }
} , {
    timestamps: true,
})

// User.tasks return tasks of user
userSchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'owner'
})

// removing password and tokens in user response. Can't use "this" in ES6 arrow notation.
userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens
    delete userObject.avatar

    return userObject
}

// Method generating jwt token for authorisation
userSchema.methods.generateAuthToken = async function ()  {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET)

    user.tokens = user.tokens.concat({ token })
    await user.save()
    return token
}


userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })

    if(!user) {
        throw new Error("Unable to login")
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch) {
        throw new Error("Unable to login")
    }

    return user
}

// Middleware running before .save() method on password .
userSchema.pre('save', async function (next) {
    const user = this

    if(user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

// Delete tasks when user is removed
userSchema.pre('remove', async function (next) {
    const user = this
    await Task.deleteMany({ owner: user._id})
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User