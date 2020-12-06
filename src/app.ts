// External Libraries
import express from 'express';
import Cors from 'cors';
import mysql from 'mysql';
import userRoutes from './routes/user-routes';

// Custom Libraries
import RequestError from "./utils/request-error";

// Setup server:
const app = express();
app.use(express.json());
app.use(Cors());

// Routes:
app.use('/users',userRoutes);

//DB connection
export const connectionOptions = mysql.createConnection({
    host: process.env.DB_HOST_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT as unknown as number,
    database: process.env.DB_NAME
});

connectionOptions.connect(function (err) {
    if (err) throw err;
});


// Unsupported Routes.
app.use((error: Error) => {
    throw new RequestError('Could not find this route.', 404, error);
});

// Error Handling
app.use((error: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (res.headersSent) {
        return next(error);
    }
    res.json({
        "status": "failed",
        "message": error.message || 'An unknown error occurred!'
    });
});

// server start
app.listen(process.env.SERVER_PORT, () => {
    console.log(`\nStarted\nListening on port: ${process.env.SERVER_PORT}`);
    console.log(`Connected to DB at ${process.env.DB_HOST_NAME} \nUsing DB: ${process.env.DB_NAME}`);
});
