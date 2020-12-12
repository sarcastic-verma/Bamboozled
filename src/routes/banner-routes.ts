import express, {Router} from "express";
import {FieldInfo, MysqlError} from "mysql";
import {connectionOptions} from "../app";

const router = Router();

router.get('/create', (req: express.Request, res: express.Response) => {
    connectionOptions.query(`
    CREATE TABLE IF NOT EXISTS BANNER (
        ID INT(10) PRIMARY KEY AUTO_INCREMENT,
        TITLE VARCHAR(50)
        DESCRIPTION VARCHAR(100),
        IMAGE VARCHAR(100)
    );
    `, (err: MysqlError, rows, fields: FieldInfo) => {
        if (!err) res.send(rows);
        else res.send(err);
    });
});

// POST-ROUTE : add banner
router.post('/add', (req: express.Request, res: express.Response) => {
    connectionOptions.query(`
    INSERT INTO BANNER
    VALUES 
    (${req.body.title},${req.body.description},${req.body.image});
    `, (err: MysqlError, rows, fields: FieldInfo) => {
        if (!err) res.send(rows);
        else res.send(err);
    });
});

// GET-ROUTE : fetch all banners
router.get('/', (req: express.Request, res: express.Response) => {
    connectionOptions.query(`
    Select * from banner
    `, (err: MysqlError, rows, fields: FieldInfo) => {
        if (!err) res.send(rows);
        else res.send(err);
    });
});

// GET-ROUTE : fetch by id
router.get('/:id', (req: express.Request, res: express.Response) => {
    connectionOptions.query(`
    Select * from banner where id=${req.params.id}
    `, (err: MysqlError, rows, fields: FieldInfo) => {
        if (!err) res.send(rows);
        else res.send(err);
    });
});

// PATCH-ROUTE : update banner
router.patch('/patch/:id', (req: express.Request, res: express.Response) => {
    connectionOptions.query(`
    UPDATE BANNER
    SET
    ${req.body.title == null ? "" : "TITLE=,"}
    ${req.body.description == null ? "" : "DESCRIPTION=,"}
    ${req.body.image == null ? "" : "IMAGE= "}
    WHERE ID=${req.params.id};
    `, (err: MysqlError, rows, fields: FieldInfo) => {
        if (!err) res.send(rows);
        else res.send(err);
    });
});


// DEL-ROUTE : delete a banner
router.get('/delete/:id', (req: express.Request, res: express.Response) => {
    connectionOptions.query(`
    DELETE FROM BANNER WHERE ID=${req.params.id}
    `, (err: MysqlError, rows, fields: FieldInfo) => {
        if (!err) res.send(rows);
        else res.send(err);
    });
});

export default router;