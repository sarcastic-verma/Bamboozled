import express, {Router} from "express";
import {FieldInfo, MysqlError} from "mysql";
import {connectionOptions} from "../app";

const router = Router();

router.get('/create', (req: express.Request, res: express.Response) => {
    connectionOptions.query(`
    CREATE TABLE IF NOT EXISTS USER (
        NAME VARCHAR(30),
        ADDRESS VARCHAR(30),
        EMAIL VARCHAR(20) PRIMARY KEY
    );
    `, (err: MysqlError, rows, fields: FieldInfo) => {
        if (!err) res.send(rows);
        else res.send(err);
    });
});

router.get('/add', (req: express.Request, res: express.Response) => {
    connectionOptions.query(`
    INSERT INTO USER
    VALUES
    ();
    `, (err: MysqlError, rows, fields: FieldInfo) => {
        if (!err) res.send(rows);
        else res.send(err);
    });
});

router.get('/drop',(req: express.Request, res: express.Response) => {
    connectionOptions.query(`                    
    Drop table USER;
    `, (err: MysqlError, rows, fields: FieldInfo) => {
        if (!err) res.send(rows);
        else res.send(err);
    });
});

router.get('/describe',(req: express.Request, res: express.Response) => {
    connectionOptions.query(`                    
    Describe USER;
    `, (err: MysqlError, rows, fields: FieldInfo) => {
        if (!err) res.send(rows);
        else res.send(err);
    });
});

// GET-ROUTE : fetch all users
// GET-ROUTE : fetch by id
// PATCH-ROUTE : update user
// POST-ROUTE : add user
// DEL-ROUTE : delete a user


export default router;