require('dotenv').config()

const formatDistanceToNow = require('date-fns/formatDistanceToNow')


const express = require('express')
const mongoose = require('mongoose')
const app = express()
const morgan = require('morgan')
const tasksController = require('./controllers/tasksController.js')
const dbURI = `mongodb+srv://${process.env.MANGO_USER}:${process.env.MANGO_PASSWORD}@cluster0.ufjqden.mongodb.net/todolist?retryWrites=true&w=majority`



mongoose.connect(dbURI)
.then(() => {app.listen(process.env.PORT); console.log("connecté à mongodb")})
.catch(error => console.log(error))


app.set('view engine', 'ejs')

app.use(express.urlencoded({extended: true}))

app.use(express.static('public'))

app.use(morgan('dev'))

app.use((req, res, next) => {
    res.locals.formatDistanceToNow = formatDistanceToNow
    next()
})

app.get('/', tasksController.tasks_index_get)

app.get('/tasks/:id', tasksController.task_get)


app.delete('/delete/:id', tasksController.task_delete)

app.get('/ajouter', tasksController.task_ajouter_get)

app.post('/ajouter', tasksController.task_ajouter_post) 



app.use((req, res) => { res.status(404).render('404', {title: "404 Error"}) })