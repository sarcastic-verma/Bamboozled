import express,{Router} from "express";
import {FieldInfo, MysqlError} from "mysql";
import {connectionOptions} from "../app";

const router = Router();
router.get('/get', (req: express.Request, res: express.Response) => {
    connectionOptions.query(`
    Select * from transaction
    `, (err: MysqlError, rows, fields: FieldInfo) => {
        if (!err) res.send(rows);
        else res.send(err);
    });
});

// GET-ROUTE : fetch transactions by userId
// POST-ROUTE : add transaction to userId
// GET-ROUTE : fetch transaction by id


export default router;