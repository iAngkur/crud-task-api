import mongoose from "mongoose";

const taskSchema = mongoose.Schema({
    title: {
        type: String,
        trim: true,
        minlength: 3,
        required: true
    },
    _taskListId: {
        type: mongoose.Types.ObjectId,
        ref: 'TaskList',
        required: true
    },
    completed: {
        type: Boolean,
        default: false, 
        required: true
    }
});

export const Task = mongoose.model('Task', taskSchema);