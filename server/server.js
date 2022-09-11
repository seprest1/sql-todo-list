const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;
const router = require('./routes/router')
  //router location

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('server/public'));

app.use('/tasks', router);
  //send all routes to router

app.listen(PORT, () => {
    console.log('listening on port', PORT);
  });


