// External Libraries
import express from 'express';
import Cors from 'cors';
import mysql, {FieldInfo, MysqlError} from 'mysql';

// Custom Libraries
import RequestError from "./models/request-error";

// Routes


// Setup server:
const app = express();
app.use(express.json());
app.use(Cors());

// Setup Routes:

//DB connection
const connectionOptions = mysql.createConnection({
    host: process.env.DB_HOST_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT as unknown as number,
    database: process.env.DB_NAME
});

connectionOptions.connect(function (err) {
    if (err) throw err;
});
app.get('/', (req: express.Request, res: express.Response) => {
    res.send("<h1>Hello</h1>");
});


app.get('/camp', (req: express.Request, res: express.Response) => {
    connectionOptions.query("describe users", (err: MysqlError, rows, fields: FieldInfo) => {
        if (!err) res.send(rows);
        else res.send(err);
    });
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
