const express = require('express');
const router = express.Router();

const db = require('../modules/pool');


router.get('/', (req, res) => {
    console.log ('GET recieved a request');
    let queryText = 
    `SELECT * FROM "tasks";`;
    db.query(queryText).then(result =>{
        res.send(result.rows)
    })
    .catch(error => {
        console.log('error getting tasks', error);
        res.sendStatus(500);
    });
});

router.post('/', (req, res) => {
    console.log(req.body);
    const listItem = req.body.listItem;
    const checked = req.body.checked;
    const timeCompleted = req.body.timeCompleted;

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
});

module.exports = router;