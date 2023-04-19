const Tasks = require("../models/tasks")

const tasks_index_get = (req, res) => {
    Tasks.find()
    .then(data => {
        res.render('index', {title: "To do list", tasks: data})
    })
    .catch(error => console.log(error))
}

const task_ajouter_get =  (req, res) => { res.render('ajouter', {title: "Ajouter une tâche"}) }

const task_ajouter_post = (req, res) => {
    const task = new Tasks(req.body) 
    task.save()
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
}

const task_delete = (req, res) => {
    Tasks.findByIdAndDelete(req.params.id)
    .then(() => {
        res.json({redirect: '/'})
    })
    .catch(error => {console.log(`erreur : ${error}`)})
}

const task_get = (req, res) => {
    Tasks.findById(req.params.id)
    .then(data => { res.render('task', {task: data}) })
    .catch(err => console.log(err))
   
}

module.exports = {
    tasks_index_get,
    task_ajouter_get,
    task_ajouter_post,
    task_delete,
    task_get
}