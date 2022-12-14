const express = require('express');
const router = express.Router();

const db = require('../modules/pool');

router.get('/', (req, res) => {
    console.log ('GET recieved a request');
    let queryText = 
    `SELECT * FROM "tasks"
        ORDER BY "checked", "listItem";`;
    db.query(queryText).then(result =>{
        res.send(result.rows)
    })
    .catch(error => {
        console.log('error getting tasks', error);
        res.sendStatus(500);
    });
});     //sorted first by if task is checked, then alphabetically by item

router.post('/', (req, res) => {
    console.log(req.body);
    const listItem = req.body.listItem;
    const checked = req.body.checked;
    const timeCompleted = req.body.timeCompleted;
        //task components

    const queryText = `
    INSERT INTO "tasks"
    ("listItem", "checked", "timeCompleted")
        VALUES
        ($1, $2, $3);
    `;

    const sqlValues = [listItem, checked, timeCompleted];
   
    db.query(queryText, sqlValues)
        .then(result => {
        res.send(200);
    })
    .catch(error => {
        console.log('error adding tasks', error);
        res.sendStatus(500);
    })
});     //"timeCompleted" inserted for creating future feature

router.put('/:id', (req, res) => {
    console.log('PUT received a request!');
    console.log(req.params);
    const taskId = req.params.id;
        //id of specific data row, using new concept of params

    const sqlQuery = `
    UPDATE "tasks"
      SET "checked" = 'true'
      WHERE "id" = $1;
    `;
        //update checked column to true or yes, it's checked!

    const sqlValues = [taskId];

    db.query(sqlQuery, sqlValues)
        .then((dbRes) => {
            res.sendStatus(200);
        })
        .catch((dbErr) => {
            console.log('Something broke in PUT', dbErr);
        })
});

router.delete('/:id', (req, res) => {
    console.log(req.params);
    const taskId = req.params.id;
        //specific data row using new concept of params

    const sqlQuery = 
    `DELETE FROM "tasks"
        WHERE "id" = $1;`
    
    const sqlValues = [taskId];

    db.query(sqlQuery, sqlValues)
        .then((dbRes) => {
            console.log('DELETE route received a request!');
            res.sendStatus(200);
        }).catch((dbErr) => {
            console.log('Something broke in DELETE /tasks', dbErr);
        });
});

module.exports = router;