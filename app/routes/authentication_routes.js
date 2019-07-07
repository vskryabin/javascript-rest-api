'use strict';

/**
 * @swagger
 * definition:
 *   authentication:
 *     properties:
 *       authenticated:
 *         type: boolean
 *       token:
 *         type: string
 *       issuedAt:
 *         type: string
 *       expiresAt:
 *         type: string
 * /register:
 *   post:
 *     tags:
 *       - authentication
 *     description: Registers a new password
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Authorization
 *         description: Authorization Bearer token
 *         in: header
 *         required: true
 *         schema:
 *           $ref: '#/definitions/authentication'
 *       - name: email
 *         description: email of the candidate
 *         in: body
 *         required: trje
 *         schema:
 *           $ref: '#/definitions/candidates'
 *       - name: password
 *         description: password of the candidate
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/candidates'
 *     responses:
 *       200:
 *         description: Successfully generated
 *         schema:
 *           $ref: '#/definitions/authentication'
 *       400:
 *         description: Incorrect email provided
 *       500:
 *         description: Application error
 * /login:
 *   post:
 *     tags:
 *       - authentication
 *     description: Logs in and generates a token
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: email
 *         description: email of the candidate
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/candidates'
 *       - name: password
 *         description: password of the candidate
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/candidates'
 *     responses:
 *       200:
 *         description: Returns a token
 *         schema:
 *           $ref: '#/definitions/authentication'
 *       400:
 *         description: Incorrect email provided
 *       500:
 *         description: Application error
 * /verify:
 *   post:
 *     tags:
 *       - authentication
 *     description: Verifies the token and returns instance of logged in candidate
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Authorization
 *         description: Authorization Bearer token
 *         in: header
 *         required: true
 *         schema:
 *           $ref: '#/definitions/authentication'
 *     responses:
 *       200:
 *         description: Returns a token
 *         schema:
 *           $ref: '#/definitions/authentication'
 *       400:
 *         description: Incorrect email provided
 *       401:
 *         description: Incorrect token provided
 *       500:
 *         description: Application error
 * /logout:
 *   post:
 *     tags:
 *       - authentication
 *     description: Verifies the token and returns instance of logged in candidate
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Authorization
 *         description: Authorization Bearer token
 *         in: header
 *         required: true
 *         schema:
 *           $ref: '#/definitions/authentication'
 *     responses:
 *       200:
 *         description: Logs out a token
 *         schema:
 *           $ref: '#/definitions/authentication'
 *       401:
 *         description: Incorrect token provided
 *       500:
 *         description: Application error
 */


var verifyToken = require('../../config/verify_token');

module.exports = function(app, db) {
  var authentication = require('../controllers/authentication_controller');

  app.route('/recruit/api/v1/register')
    .post(verifyToken, authentication.register(db));

  app.route('/recruit/api/v1/login')
    .post(authentication.login(db));

  app.route('/recruit/api/v1/verify')
    .post(verifyToken, authentication.verify(db));  

  app.route('/recruit/api/v1/logout')
    .post(verifyToken, authentication.logout(db));

  app.route('/recruit/api/v1/tokens')
    .get(verifyToken, authentication.get_tokens(db));  

};
