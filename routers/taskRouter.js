import express from "express";
import { Task } from '../database/models/task.js';

const taskRouter = express.Router();

taskRouter.get('/', async (req, res) => {
    try {
        const tasks = await Task.find({ _taskListId: req.tasklistId });
        res.status(200).send(tasks);
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: 'An error occurred while fetching tasks' });
    }
});

taskRouter.get('/:taskId', (req, res) => {
    Task.findOne({_taskListId: req.tasklistId, _id: req.params.taskId})
    .then(task =>{
        res.status(200).send(task);
    })
    .catch(err => {
        console.error(err);
        res.status(500).send({ error: 'An error occurred while fetching a task' });
    });
});

taskRouter.patch('/:taskId', (req, res) => {
    Task.findOneAndUpdate({_taskListId: req.tasklistId, _id: req.params.taskId}, { $set: req.body }, { new: true })
    .then(task =>{
        res.status(200).send(task);
    })
    .catch(err => {
        console.error(err);
        res.status(500).send({ error: 'An error occurred while updating a task' });
    });
});

taskRouter.delete('/:taskId', (req, res) => {
    Task.findOneAndDelete({_taskListId: req.tasklistId, _id: req.params.taskId})
    .then(task =>{
        res.status(200).send(task);
    })
    .catch(err => {
        console.error(err);
        res.status(500).send({ error: 'An error occurred while deleting a task' });
    });
});

export default taskRouter;