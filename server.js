'use strict';

const express         = require('express');
const bodyParser      = require('body-parser');
const app             = express();
const port            = process.env.PORT || 80;
const mysql           = require('mysql');
const db              = mysql.createConnection ({
    host: 'example.com',
    port: '3306',
    user: 'example',
    password: 'example',
    database: 'example'
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

app.use(function(req, res) {
  res.status(404).send({ url: req.originalUrl + ' is not found!' })
});

app.listen(port);

console.log('Server started on: ' + port);

exports.todaysDate = function() {
    var d = new Date(),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-');
}

module.exports = app;
