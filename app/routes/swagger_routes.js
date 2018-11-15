'use strict';

const swaggerJSDoc = require('swagger-jsdoc');

module.exports = function(app, db) {
  var swaggerDefinition = {
    info: {
      title: 'Recruit Swagger API',
      version: '1.0.0',
      description: 'REST API leveraging Swagger',
    },
    host: 'localhost:80',
    basePath: '/recruit/api/v1/',
  };
  var options = {
    swaggerDefinition: swaggerDefinition,
    apis: ['./**/routes/*.js'],
    };
  var swaggerSpec = swaggerJSDoc(options);
  
  app.route('/recruit')
  .get((req, res) => {
      res.status(304).json({ swagger: '/recruit/api/v1/swagger.json' });
  });

  app.get('/recruit/api/v1/swagger.json', function(req, res) {  
    res.setHeader('Content-Type', 'application/json');   
    res.send(JSON.stringify(swaggerSpec, null, 2)); 
  });
};
