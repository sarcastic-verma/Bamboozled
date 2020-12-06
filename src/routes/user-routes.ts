import express, {Router} from "express";
import {FieldInfo, MysqlError} from "mysql";
import {connectionOptions} from "../app";

const router = Router();
router.get('/create', (req: express.Request, res: express.Response) => {
    connectionOptions.query(`
    CREATE TABLE IF NOT EXISTS USERS (
        NAME VARCHAR(30),
        ADDRESS VARCHAR(30),
        EMAIL VARCHAR(20) PRIMARY KEY
    );
    `, (err: MysqlError, rows, fields: FieldInfo) => {
        if (!err) res.send(rows);
        else res.send(err);
    });
});

export default router;