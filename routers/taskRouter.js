import mongoose from "mongoose";
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

taskRouter.post('/', (req, res) => {
    
    const task = new Task({
        title: req.body.title,
        _taskListId: req.body.taskListId
    });

    task.save()
    .then(task => res.status(201).send(task))
    .catch(err => {
        console.error(err);
    });
});
// taskRouter.put();
// taskRouter.patch();
// taskRouter.delete();

export default taskRouter;