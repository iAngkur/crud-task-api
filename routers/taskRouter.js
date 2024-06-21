import express from "express";
import { Task } from '../database/models/task.js';

const taskRouter = express.Router();

taskRouter.get('/', (req, res) => {
    Task.find({})
    .then((tasks) => {
        res.status(200).send(tasks);
    })
    .catch(err => {
        console.error(err);
    });
});

taskRouter.get('/:taskId', (req, res) => {
    console.log(req.params);

    Task.findById(req.params.taskId)
    .then((task) => {
        res.status(200).send(task);
    })
    .catch(err => {
        console.error(err);
    });
});

taskRouter.post('/', (req, res) => {
    
    const task = new Task({
        title: req.body.title,
        _taskListId: req.body.tasklistId,
        completed: req.body.completed
    });

    task.save()
    .then(task => res.status(201).send(task))
    .catch(err => {
        console.error(err);
    });
});

taskRouter.put('/:taskId', (req, res) => {
    Task.findOneAndUpdate({_id: req.params.taskId}, {$set: req.body}, {new: true})
    .then(task =>{
        res.status(200).send(task);
    })
    .catch(err => console.error(err));
});

taskRouter.patch('/:taskId', (req, res) => {
    Task.findOneAndUpdate({_id: req.params.taskId}, {$set: req.body}, {new: true})
    .then(task =>{
        res.status(200).send(task);
    })
    .catch(err => console.error(err));
});

taskRouter.delete('/:taskId', (req, res) => {
    Task.findByIdAndDelete(req.params.taskId)
    .then(task =>{
        res.status(200).send(task);
    })
    .catch(err => console.error(err));
});

export default taskRouter;