"use strict";
exports.__esModule = true;
// External Libraries
var express_1 = require("express");
var cors_1 = require("cors");
var mysql_1 = require("mysql");
// Custom Libraries
var request_error_1 = require("./models/request-error");
// Routes
// Setup server:
var app = express_1["default"]();
app.use(express_1["default"].json());
app.use(cors_1["default"]());
// Setup Routes:
//DB connection
var connectionOptions = mysql_1["default"].createConnection({
    host: process.env.DB_HOST_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME
});
connectionOptions.connect(function (err) {
    if (err)
        throw err;
});
app.get('/', function (req, res) {
    res.send("<h1>Hello</h1>");
});
app.get('/campus', function (req, res) {
    connectionOptions.query("describe users", function (err, rows, fields) {
        if (!err)
            res.send(rows);
        else
            res.send(err);
    });
});
// Unsupported Routes.
app.use(function (error) {
    throw new request_error_1["default"]('Could not find this route.', 404, error);
});
// Error Handling
app.use(function (error, req, res, next) {
    if (res.headersSent) {
        return next(error);
    }
    res.json({
        "status": "failed",
        "message": error.message || 'An unknown error occurred!'
    });
});
// server start
app.listen(process.env.SERVER_PORT, function () {
    console.log("\nStarted\nListening on port: " + process.env.SERVER_PORT);
    console.log("Connected to DB at " + process.env.DB_HOST_NAME + " \nUsing DB: " + process.env.DB_NAME);
});
