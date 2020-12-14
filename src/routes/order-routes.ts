import express, {Router} from "express";
import {FieldInfo, MysqlError} from "mysql";
import {connectionOptions} from "../app";

const router = Router();

router.get('/create', (req: express.Request, res: express.Response) => {
    connectionOptions.query(`    
    CREATE TABLE IF NOT EXISTS USER_ORDER (   
        ID INT PRIMARY KEY NOT NULL AUTO_INCREMENT,     
        STATUS VARCHAR(50),
        AMOUNT INT,
        ORDER_PLACED_DATE VARCHAR(50),
        USER_ID INT,
        FOREIGN KEY (USER_ID) REFERENCES USER(ID) 
    );
    `, (err: MysqlError, rows, fields: FieldInfo) => {
        if (!err) res.send(rows);
        else
            res.send(err);
    });
});

router.get('/drop', (req: express.Request, res: express.Response) => {
    connectionOptions.query(`                    
    Drop table USER_ORDER;
    `, (err: MysqlError, rows, fields: FieldInfo) => {
        if (!err) res.send(rows);
        else res.send(err);
    });
});

router.get('/describe', (req: express.Request, res: express.Response) => {
    connectionOptions.query(`                    
    Describe USER_ORDER;
    `, (err: MysqlError, rows, fields: FieldInfo) => {
        if (!err) res.send(rows);
        else res.send(err);
    });
});
router.get('/', (req: express.Request, res: express.Response) => {
    connectionOptions.query(`
    Select * from USER_ORDER;
    `, (err: MysqlError, rows, fields: FieldInfo) => {
        if (!err) res.send(rows);
        else res.send(err);
    });
});

router.get('/:id', (req: express.Request, res: express.Response) => {
    connectionOptions.query(`
    Select * from USER_ORDER where id = ${req.params.id};
    `, (err: MysqlError, rows, fields: FieldInfo) => {
        if (!err) res.send(rows);
        else res.send(err);
    });
});

router.post('/post/order/:userId', (req: express.Request, res: express.Response) => {
        connectionOptions.query(`
    Select * from USER_ORDER where id = ${req.params.id};
    INSERT INTO USER_ORDER (STATUS,AMOUNT,ORDER_PLACED_DATE,USER_ID)
    VALUES ("active","${req.body.amount}","${req.body.date}","${req.body.userId}");
    `, (err: MysqlError, rows, fields: FieldInfo) => {
            if (!err) res.send(rows);
            else res.send(err);
        });
    }
);


router.get('/get/user/:userId', (req: express.Request, res: express.Response) => {
        connectionOptions.query(`
    Select * from USER_ORDER where USER_ID = ${req.params.userId};
    `, (err: MysqlError, rows, fields: FieldInfo) => {
            if (!err) res.send(rows);
            else res.send(err);
        });
    }
);

// PATCH-ROUTE : change order status - { cancel, active, delivered }
router.patch('/patch/:id', (req: express.Request, res: express.Response) => {
    connectionOptions.query(`
    UPDATE USER_ORDER
    SET
    ${req.body.status == null ? "" : `STATUS="${req.body.status}"`}
    WHERE ID=${req.params.id};
    `, (err: MysqlError, rows, fields: FieldInfo) => {
        if (!err) res.send(rows);
        else res.send(err);
    });
});

export default router;