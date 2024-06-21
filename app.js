import express from 'express';
import mongoose from "mongoose";
import databaseConnection from './database/mongoose.js';
import 'dotenv/config';

const app = express();
await databaseConnection(process.env.DB_URL, process.env.DB_NAME);

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(process.env.PORT, () => {
    console.clear();
    console.log(`Server is running on ${process.env.PORT}`);
});