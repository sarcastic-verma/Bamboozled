import express,{Router} from "express";
import {FieldInfo, MysqlError} from "mysql";
import {connectionOptions} from "../app";

const router = Router();
router.get('/get', (req: express.Request, res: express.Response) => {
    connectionOptions.query(`
    Select * from order
    `, (err: MysqlError, rows, fields: FieldInfo) => {
        if (!err) res.send(rows);
        else res.send(err);
    });
});

// POST-ROUTE : add order to userId
// GET-ROUTE : fetch orders by userId
// GET-ROUTE : fetch order by id
// PATCH-ROUTE : change order status - { cancel, active, delivered }

export default router;