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
        ORDER_PLACED_DATE DATE
    );
    `, (err: MysqlError, rows, fields: FieldInfo) => {
        if (!err) res.send(rows);
        else res.send(err);
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
        // add query here

        //     connectionOptions.query(`
        // Select * from ORDER where id = ${req.params.id};
        // `, (err: MysqlError, rows, fields: FieldInfo) => {
        //         if (!err) res.send(rows);
        //         else res.send(err);
        //     });
    }
);


router.get('/get/user/:userId', (req: express.Request, res: express.Response) => {
        // add query here

        //     connectionOptions.query(`
        // Select * from ORDER where id = ${req.params.id};
        // `, (err: MysqlError, rows, fields: FieldInfo) => {
        //         if (!err) res.send(rows);
        //         else res.send(err);
        //     });
    }
);

// PATCH-ROUTE : change order status - { cancel, active, delivered }
router.patch('/patch/:id', (req: express.Request, res: express.Response) => {
    // add query here

    //     connectionOptions.query(`
    // Select * from ORDER where id = ${req.params.id};
    // `, (err: MysqlError, rows, fields: FieldInfo) => {
    //         if (!err) res.send(rows);
    //         else res.send(err);
    //     });
});

export default router;