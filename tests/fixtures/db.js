const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const User = require('../../src/models/user')
const Task = require('../../src/models/task')

// generate test user
userOneID = new mongoose.Types.ObjectId()
const userOne = {
    _id: userOneID,
    name: 'Mike',
    age: 25,
    email: 'bocian15@gmail.com',
    password: 'mikepass123',
    tokens: [{
        token: jwt.sign({ _id: userOneID }, process.env.JWT_SECRET)
    }]
}
userTwoID = new mongoose.Types.ObjectId()
const userTwo = {
    _id: userTwoID,
    name: 'Tomek',
    age: 29,
    email: 'tomek123@gmail.com',
    password: 'tomek123',
    tokens: [{
        token: jwt.sign({ _id: userTwoID }, process.env.JWT_SECRET)
    }]
}

const taskOne = {
    _id: new mongoose.Types.ObjectId(),
    description: "First task",
    completed: "false",
    owner: userOne._id
}

const taskTwo = {
    _id: new mongoose.Types.ObjectId(),
    description: "Second task",
    completed: "true",
    owner: userOne._id
}
const taskThree = {
    _id: new mongoose.Types.ObjectId(),
    description: "Third task",
    completed: "true",
    owner: userTwo._id
}

const setupDatabase = async () => {
    await User.deleteMany()
    await Task.deleteMany()
    await new User(userOne).save()
    await new User(userTwo).save()
    await new Task(taskOne).save()
    await new Task(taskTwo).save()
    await new Task(taskThree).save()
}

const closeConnection = () => mongoose.connection.close()

module.exports = {
    userOneID,
    userOne,
    userTwo,
    taskOne,
    setupDatabase,
    closeConnection
}