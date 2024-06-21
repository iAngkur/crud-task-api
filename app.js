import express from 'express';
import taskRouter from './routers/taskRouter.js';
import taskListRouter from './routers/taskListRouter.js';
import databaseConnection from './database/mongoose.js';
import 'dotenv/config';
import cors from 'cors';

const app = express();
const api = process.env.API_URL;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors({
    origin: '*'
}));

app.use(`${api}/tasklists`, taskListRouter);

await databaseConnection(process.env.DB_URL, process.env.DB_NAME);

app.listen(process.env.PORT, () => {
    console.clear();
    console.log(`Server is running on ${process.env.PORT}`);
});