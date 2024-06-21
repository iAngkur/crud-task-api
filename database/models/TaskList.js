import mongoose from "mongoose";

const taskiListSchema = mongoose.Schema({
    title: {
        type: String,
        trim: true,
        minlength: 3
    }
});

export const TaskList = mongoose.model('TaskList', taskiListSchema);