import express,{Router} from "express";
import {FieldInfo, MysqlError} from "mysql";
import {connectionOptions} from "../app";

const router = Router();
router.get('/all/:id', (req: express.Request, res: express.Response) => {
    connectionOptions.query(`
    Select * from banner
    `, (err: MysqlError, rows, fields: FieldInfo) => {
        if (!err) res.send(rows);
        else res.send(err);
    });
});

// GET-ROUTE : fetch all banners
// GET-ROUTE : fetch by id
// PATCH-ROUTE : update banner
// POST-ROUTE : add banner
// DEL-ROUTE : delete a banner

export default router;