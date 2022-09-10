const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = 5000;
// const router = require('./routes/router')

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('server/public'));
// app.use('/router', router);

app.get('/tasks', (req, res) => {
    console.log ('GET recieved a request');
    res.sendStatus(201);
})

app.listen(PORT, () => {
    console.log('listening on port', PORT);
  });