'use strict';

const express         = require('express');
const path            = require('path');
const bodyParser      = require('body-parser');
const multer          = require('multer');
const app             = express();
const port            = process.env.PORT || 80;
const mysql           = require('mysql');
const db              = mysql.createConnection ({
    host: 'localhost',
    port: '3306',
    user: 'localhost',
    password: 'localhost',
    database: 'localhost'
});
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('MySQL connected...')
})

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var positionRoutes = require('./app/routes/position_routes');
positionRoutes(app, db);
var candidateRoutes = require('./app/routes/candidate_routes');
candidateRoutes(app, db);
var applicationRoutes = require('./app/routes/application_routes');
applicationRoutes(app, db);
var swaggerRoutes = require('./app/routes/swagger_routes');
swaggerRoutes(app, db);

app.use('/recruit/api/v1', express.static(path.join(__dirname, 'public')));

app.use(function(req, res) {
  res.status(404).send({ url: req.originalUrl + ' is not found!' })
});

app.listen(port);

console.log('Server started on: ' + port);

module.exports = app;
