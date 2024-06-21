import express from "express";
import { TaskList } from '../database/models/taskList.js';
import taskRouter from "./taskRouter.js";

const taskListRouter = express.Router();

taskListRouter.get('/', (req, res) => {
    TaskList.find({})
        .then((taskLists) => {
            res.status(200).send(taskLists);
        })
        .catch(err => {
            console.error(err);
            res.status(500).send({ error: 'An error occurred while fetching task lists' });
        });
});

taskListRouter.get('/:tasklistId', (req, res) => {
    TaskList.findById(req.params.tasklistId)
        .then((taskList) => {
            res.status(200).send(taskList);
        })
        .catch(err => {
            console.error(err);
            res.status(500).send({ error: 'An error occurred while fetching the task list' });
        });
});


taskListRouter.post('/', (req, res) => {

    const taskList = new TaskList({
        title: req.body.title
    });

    taskList.save()
        .then(taskList => res.status(201).send(taskList))
        .catch(err => {
            console.error(err);
        });
});

taskListRouter.put('/:tasklistId', (req, res) => {
    TaskList.findOneAndUpdate({ _id: req.params.tasklistId }, { $set: req.body }, { new: true })
        .then(taskList => {
            res.status(200).send(taskList);
        })
        .catch(err => console.error(err));
});

taskListRouter.patch('/:tasklistId', (req, res) => {
    TaskList.findOneAndUpdate({ _id: req.params.tasklistId }, { $set: req.body }, { new: true })
        .then(taskList => {
            res.status(200).send(taskList);
        })
        .catch(err => console.error(err));
});

taskListRouter.delete('/:tasklistId', (req, res) => {
    TaskList.findByIdAndDelete(req.params.tasklistId)
        .then(taskList => {
            res.status(200).send(taskList);
        })
        .catch(err => console.error(err));
});

taskListRouter.use('/:tasklistId/tasks', (req, res, next) => {
    req.tasklistId = req.params.tasklistId; 
    next();
}, taskRouter);

export default taskListRouter;