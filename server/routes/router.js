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


module.exports = router;