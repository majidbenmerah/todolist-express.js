const mongoose = require('mongoose')
const Schema = mongoose.Schema

const tasksSchema = new Schema({
    titre: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
}, {timestamps: true})

const Tasks = mongoose.model('tasks', tasksSchema)


module.exports = Tasks