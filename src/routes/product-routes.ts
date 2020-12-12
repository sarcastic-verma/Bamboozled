import express, {Router} from "express";
import {FieldInfo, MysqlError} from "mysql";
import {connectionOptions} from "../app";

const router = Router();
router.get('/create', (req: express.Request, res: express.Response) => {
    connectionOptions.query(`
    CREATE TABLE IF NOT EXISTS PRODUCT (   
        ID INT PRIMARY KEY NOT NULL AUTO_INCREMENT,     
        NAME VARCHAR(50),
        AMOUNT INT,
        IMAGE VARCHAR(400)
    );
    `, (err: MysqlError, rows, fields: FieldInfo) => {
        if (!err) res.send(rows);
        else res.send(err);
    });
});

router.get('/drop', (req: express.Request, res: express.Response) => {
    connectionOptions.query(`                    
    Drop table PRODUCT;
    `, (err: MysqlError, rows, fields: FieldInfo) => {
        if (!err) res.send(rows);
        else res.send(err);
    });
});

router.get('/describe', (req: express.Request, res: express.Response) => {
    connectionOptions.query(`                    
    Describe PRODUCT;
    `, (err: MysqlError, rows, fields: FieldInfo) => {
        if (!err) res.send(rows);
        else res.send(err);
    });
});

// GET-ROUTE : fetch all products
router.get('/', (req: express.Request, res: express.Response) => {
    connectionOptions.query(`
                        
    `, (err: MysqlError, rows, fields: FieldInfo) => {
        if (!err) res.send(rows);
        else res.send(err);
    });
});

// GET-ROUTE : search by query
router.get('/search/:query', (req: express.Request, res: express.Response) => {
    connectionOptions.query(`
                        
    `, (err: MysqlError, rows, fields: FieldInfo) => {
        if (!err) res.send(rows);
        else res.send(err);
    });
});

// GET-ROUTE : fetch product by id
router.get('/:id', (req: express.Request, res: express.Response) => {
    connectionOptions.query(`
                        
    `, (err: MysqlError, rows, fields: FieldInfo) => {
        if (!err) res.send(rows);
        else res.send(err);
    });
});

// PATCH-ROUTE : update product by id
router.patch('/patch/:id', (req: express.Request, res: express.Response) => {
    connectionOptions.query(`
                        
    `, (err: MysqlError, rows, fields: FieldInfo) => {
        if (!err) res.send(rows);
        else res.send(err);
    });
});

// POST-ROUTE : add product
router.post('/add', (req: express.Request, res: express.Response) => {
    connectionOptions.query(`
                        
    `, (err: MysqlError, rows, fields: FieldInfo) => {
        if (!err) res.send(rows);
        else res.send(err);
    });
});

// DEL-ROUTE : delete a product
router.get('/delete/:id', (req: express.Request, res: express.Response) => {
    connectionOptions.query(`
                        
    `, (err: MysqlError, rows, fields: FieldInfo) => {
        if (!err) res.send(rows);
        else res.send(err);
    });
});

export default router;