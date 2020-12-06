import express,{Router} from "express";
import {FieldInfo, MysqlError} from "mysql";
import {connectionOptions} from "../app";

const router = Router();
router.get('/create', (req: express.Request, res: express.Response) => {
    connectionOptions.query(`
    Select * from users
    `, (err: MysqlError, rows, fields: FieldInfo) => {
        if (!err) res.send(rows);
        else res.send(err);
    });
});

export default router;