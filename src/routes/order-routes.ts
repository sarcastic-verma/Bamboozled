import express, {Router} from "express";
import {FieldInfo, MysqlError} from "mysql";
import {connectionOptions} from "../app";

const router = Router();

router.get('/create', (req: express.Request, res: express.Response) => {
    connectionOptions.query(`
    CREATE TABLE IF NOT EXISTS ORDER (
        id int(10) auto_increment PRIMARY KEY,
        amount int(10),
        order_placed_on date
        status varchar(20)      
    );
    `, (err: MysqlError, rows, fields: FieldInfo) => {
        if (!err) res.send(rows);
        else res.send(err);
    });
});

router.get('/get', (req: express.Request, res: express.Response) => {
    connectionOptions.query(`
    Select * from order
    `, (err: MysqlError, rows, fields: FieldInfo) => {
        if (!err) res.send(rows);
        else res.send(err);
    });
});

router.get('/get/:id', (req: express.Request, res: express.Response) => {
    connectionOptions.query(`
    Select * from order where id = ${req.params.id}
    `, (err: MysqlError, rows, fields: FieldInfo) => {
        if (!err) res.send(rows);
        else res.send(err);
    });
});

router.post('/post/order/:userId', (req: express.Request, res: express.Response) => {
        // add query here

        //     connectionOptions.query(`
        // Select * from order where id = ${req.params.id}
        // `, (err: MysqlError, rows, fields: FieldInfo) => {
        //         if (!err) res.send(rows);
        //         else res.send(err);
        //     });
    }
);


router.get('/get/order/:id', (req: express.Request, res: express.Response) => {
        // add query here

        //     connectionOptions.query(`
        // Select * from order where id = ${req.params.id}
        // `, (err: MysqlError, rows, fields: FieldInfo) => {
        //         if (!err) res.send(rows);
        //         else res.send(err);
        //     });
    }
);

router.get('/get/order/user/:userId', (req: express.Request, res: express.Response) => {
        // add query here

        //     connectionOptions.query(`
        // Select * from order where id = ${req.params.id}
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
    // Select * from order where id = ${req.params.id}
    // `, (err: MysqlError, rows, fields: FieldInfo) => {
    //         if (!err) res.send(rows);
    //         else res.send(err);
    //     });
});

export default router;