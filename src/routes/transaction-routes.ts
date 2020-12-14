import express, {Router} from "express";
import {FieldInfo, MysqlError} from "mysql";
import {connectionOptions} from "../app";

const router = Router();

router.get('/create', (req: express.Request, res: express.Response) => {
    connectionOptions.query(`
    CREATE TABLE IF NOT EXISTS USER_TRANSACTION (   
        ID INT PRIMARY KEY NOT NULL AUTO_INCREMENT,     
        ORDER_ID INT,
        STATUS VARCHAR(100),
        TRANSACTION_ID VARCHAR(400),
        FOREIGN KEY (ORDER_ID) REFERENCES USER_ORDER(ID)
    );
    `, (err: MysqlError, rows, fields: FieldInfo) => {
        if (!err) res.send(rows);
        else res.send(err);
    });
});

router.get('/', (req: express.Request, res: express.Response) => {
    connectionOptions.query(`
    Select * from USER_TRANSACTION;
    `, (err: MysqlError, rows, fields: FieldInfo) => {
        if (!err) res.send(rows);
        else res.send(err);
    });
});

router.get('/drop', (req: express.Request, res: express.Response) => {
    connectionOptions.query(`                    
    Drop table USER_TRANSACTION;
    `, (err: MysqlError, rows, fields: FieldInfo) => {
        if (!err) res.send(rows);
        else res.send(err);
    });
});

router.get('/describe', (req: express.Request, res: express.Response) => {
    connectionOptions.query(`                    
    Describe USER_TRANSACTION;
    `, (err: MysqlError, rows, fields: FieldInfo) => {
        if (!err) res.send(rows);
        else res.send(err);
    });
});

router.get('/get/user/:userId', (req: express.Request, res: express.Response) => {
    connectionOptions.query(`
                        
    `, (err: MysqlError, rows, fields: FieldInfo) => {
        if (!err) res.send(rows);
        else res.send(err);
    });
});


router.get('/:id', (req: express.Request, res: express.Response) => {
    connectionOptions.query(`
    Select * from USER_TRANSACTION where id=${req.params.id}
                        
    `, (err: MysqlError, rows, fields: FieldInfo) => {
        if (!err) res.send(rows);
        else res.send(err);
    });
});

router.post('/post', (req: express.Request, res: express.Response) => {
    connectionOptions.query(`
    INSERT INTO USER_TRANSACTION (ORDER_ID,STATUS,TRANSACTION_ID)
    VALUES ("${req.body.ORDER-ID}","${req.body.STATUS}","${req.body.TRANSACTION_ID}");
                        
    `, (err: MysqlError, rows, fields: FieldInfo) => {
        if (!err) res.send(rows);
        else res.send(err);
    });
});



export default router;