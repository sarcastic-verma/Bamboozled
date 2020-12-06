import express,{Router} from "express";
import {FieldInfo, MysqlError} from "mysql";
import {connectionOptions} from "../app";

const router = Router();
router.get('/all', (req: express.Request, res: express.Response) => {
    connectionOptions.query(`
    Select * from banner
    `, (err: MysqlError, rows, fields: FieldInfo) => {
        if (!err) res.send(rows);
        else res.send(err);
    });
});

export default router;