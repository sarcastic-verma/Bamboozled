// External Libraries
const express = require('express');
const Cors = require('cors');
const mysql = require('mysql');

// Custom Libraries
const RequestError = require('./src/models/request-error');

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
    port: process.env.DB_PORT,
    database: process.env.DB_NAME
});

connectionOptions.connect(function (err) {
    if (err) throw err;
});
app.get('/', (req, res) => {
    res.send("<h1>Hello</h1>");
});

app.get('/create',(req, res) => {
    connectionOptions.query("Create table users(\n" +
        "   ID   INT              NOT NULL,\n" +
        "   NAME VARCHAR (20)     NOT NULL,\n" +
        "   AGE  INT              NOT NULL,\n" +
        "   ADDRESS  CHAR (25) ,\n" +
        "   SALARY   DECIMAL (18, 2),       \n" +
        "   PRIMARY KEY (ID)\n" +
        ")", (err, rows, fields) => {
        if (!err) {
            console.log(rows,fields);
            res.send("Created");
        }
        else res.send(err);
    });
});

app.get('/campus', (req, res) => {
    connectionOptions.query("describe users", (err, rows, fields) => {
        if (!err) res.send(rows);
        else res.send(err);
    });
});


// Unsupported Routes.
app.use((req, res, next) => {
    throw new RequestError('Could not find this route.', 404);
});

// Error Handling
app.use((error, req, res, next) => {
    if (res.headersSent) {
        return next(error);
    }
    res.status(error.code || 500);
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
