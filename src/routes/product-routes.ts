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
    Select * from PRODUCT ;
    `, (err: MysqlError, rows, fields: FieldInfo) => {
        if (!err) res.send(rows);
        else res.send(err);
    });
});

// GET-ROUTE : search by query
router.get('/search/:query', (req: express.Request, res: express.Response) => {
    connectionOptions.query(`
    Select * from PRODUCT ;                     
    `, (err: MysqlError, rows, fields: FieldInfo) => {
        if (!err) res.send(rows);
        else res.send(err);
    });
});

// GET-ROUTE : fetch product by id
router.get('/:id', (req: express.Request, res: express.Response) => {
    connectionOptions.query(`
    Select * from PRODUCT
     where id=${req.params.id} ;                        
    `, (err: MysqlError, rows, fields: FieldInfo) => {
        if (!err) res.send(rows);
        else res.send(err);
    });
});

// PATCH-ROUTE : update product by id
router.patch('/patch/:id', (req: express.Request, res: express.Response) => {
    connectionOptions.query(`
    Update PRODUCT
    set
    ${req.body.name == null ? "" : `NAME="${req.body.name}",`}
    ${req.body.amount == null ? "" : `AMOUNT="${req.body.amount}",`}
    ${req.body.image == null ? "" : `IMAGE="${req.body.image}"`}
    WHERE ID=${req.params.id};                        
    `, (err: MysqlError, rows, fields: FieldInfo) => {
        if (!err) res.send(rows);
        else res.send(err);
    });
});

// POST-ROUTE : add product
router.post('/post', (req: express.Request, res: express.Response) => {
    connectionOptions.query(`
    INSERT INTO PRODUCT (NAME,AMOUNT,IMAGE)
    VALUES ("${req.body.name}","${req.body.amount}","${req.body.image}");                        
    `, (err: MysqlError, rows, fields: FieldInfo) => {
        if (!err) res.send(rows);
        else res.send(err);
    });
});

// DEL-ROUTE : delete a product
router.delete('/delete/:id', (req: express.Request, res: express.Response) => {
    connectionOptions.query(`
    DELETE FROM PRODUCT WHERE ID=${req.params.id};                        
    `, (err: MysqlError, rows, fields: FieldInfo) => {
        if (!err) res.send(rows);
        else res.send(err);
    });
});

export default router;