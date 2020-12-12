import express, {Router} from "express";
import {FieldInfo, MysqlError} from "mysql";
import {connectionOptions} from "../app";

const router = Router();

router.get('/create', (req: express.Request, res: express.Response) => {
    connectionOptions.query(`                    
    CREATE TABLE IF NOT EXISTS BANNER (   
        ID INT PRIMARY KEY NOT NULL AUTO_INCREMENT,     
        TITLE VARCHAR(50),
        DESCRIPTION VARCHAR(100),
        IMAGE VARCHAR(400)
    );
    `, (err: MysqlError, rows, fields: FieldInfo) => {
        if (!err) res.send(rows);
        else res.send(err);
    });
});

router.get('/drop',(req: express.Request, res: express.Response) => {
    connectionOptions.query(`                    
    Drop table BANNER;
    `, (err: MysqlError, rows, fields: FieldInfo) => {
        if (!err) res.send(rows);
        else res.send(err);
    });
});

router.get('/describe',(req: express.Request, res: express.Response) => {
    connectionOptions.query(`                    
    Describe BANNER;
    `, (err: MysqlError, rows, fields: FieldInfo) => {
        if (!err) res.send(rows);
        else res.send(err);
    });
});
// POST-ROUTE : add BANNER
router.post('/post', (req: express.Request, res: express.Response) => {
    connectionOptions.query(`
    INSERT INTO BANNER (TITLE,DESCRIPTION,IMAGE)
    VALUES ("${req.body.title}","${req.body.description}","${req.body.image}");
    `, (err: MysqlError, rows, fields: FieldInfo) => {
        if (!err) res.send(rows);
        else res.send(err);
    });
});

// GET-ROUTE : fetch all BANNERs
router.get('/', (req: express.Request, res: express.Response) => {
    connectionOptions.query(`
    Select * from BANNER
    `, (err: MysqlError, rows, fields: FieldInfo) => {
        if (!err) res.send(rows);
        else res.send(err);
    });
});

// GET-ROUTE : fetch by id
router.get('/:id', (req: express.Request, res: express.Response) => {
    connectionOptions.query(`
    Select * from BANNER where id=${req.params.id}
    `, (err: MysqlError, rows, fields: FieldInfo) => {
        if (!err) res.send(rows);
        else res.send(err);
    });
});

// PATCH-ROUTE : update BANNER
router.patch('/patch/:id', (req: express.Request, res: express.Response) => {
    connectionOptions.query(`
    UPDATE BANNER
    SET
    ${req.body.title == null ? "" : `TITLE="${req.body.title}",`}
    ${req.body.description == null ? "" : `DESCRIPTION="${req.body.description}",`}
    ${req.body.image == null ? "" : `IMAGE="${req.body.image}"`}
    WHERE ID=${req.params.id};
    `, (err: MysqlError, rows, fields: FieldInfo) => {
        if (!err) res.send(rows);
        else res.send(err);
    });
});


// DEL-ROUTE : delete a BANNER
router.delete('/delete/:id', (req: express.Request, res: express.Response) => {
    connectionOptions.query(`
    DELETE FROM BANNER WHERE ID=${req.params.id}
    `, (err: MysqlError, rows, fields: FieldInfo) => {
        if (!err) res.send(rows);
        else res.send(err);
    });
});

export default router;