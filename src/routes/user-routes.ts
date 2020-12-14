import express, {Router} from "express";
import {FieldInfo, MysqlError} from "mysql";
import {connectionOptions} from "../app";

const router = Router();

router.get('/create', (req: express.Request, res: express.Response) => {
    connectionOptions.query(`
    CREATE TABLE IF NOT EXISTS USER (
        ID INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
        NAME VARCHAR(30),
        ADDRESS VARCHAR(30),
        EMAIL VARCHAR(20)
    );
    `, (err: MysqlError, rows, fields: FieldInfo) => {
        if (!err) res.send(rows);
        else res.send(err);
    });
});

router.get('/post', (req: express.Request, res: express.Response) => {
    connectionOptions.query(`
    INSERT INTO USER(NAME,ADDRESS,EMAIL)
    VALUES
    ("${req.body.name}","${req.body.address}","${req.body.email}");
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



export default router;