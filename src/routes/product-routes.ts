import express,{Router} from "express";
import {FieldInfo, MysqlError} from "mysql";
import {connectionOptions} from "../app";

const router = Router();
router.get('/add', (req: express.Request, res: express.Response) => {
    connectionOptions.query(`
    Select * from PRODUCT
    `, (err: MysqlError, rows, fields: FieldInfo) => {
        if (!err) res.send(rows);
        else res.send(err);
    });
});

router.get('/drop',(req: express.Request, res: express.Response) => {
    connectionOptions.query(`                    
    Drop table PRODUCT;
    `, (err: MysqlError, rows, fields: FieldInfo) => {
        if (!err) res.send(rows);
        else res.send(err);
    });
});

router.get('/describe',(req: express.Request, res: express.Response) => {
    connectionOptions.query(`                    
    Describe PRODUCT;
    `, (err: MysqlError, rows, fields: FieldInfo) => {
        if (!err) res.send(rows);
        else res.send(err);
    });
});
// GET-ROUTE : fetch all products
// GET-ROUTE : search by query
// GET-ROUTE : fetch product by id
// PATCH-ROUTE : update product by id
// POST-ROUTE : add product
// DEL-ROUTE : delete a product

export default router;