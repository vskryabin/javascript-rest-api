/**
 * @swagger
 * definition:
 *   positions:
 *     properties:
 *       id:
 *         type: integer
 *       title:
 *         type: string
 *       address:
 *         type: string
 *       city:
 *         type: string
 *       state:
 *         type: string
 *       zip:
 *         type: string
 *       description:
 *         type: string
 *       dateOpen:
 *         type: string
 *         format: date
 *       company:
 *         type: string
 *       candidatesCount:
 *         type: integer
 * /positions:
 *   get:
 *     tags:
 *       - positions
 *     description: Returns all positions
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: primary key of position
 *         in: query
 *         required: false
 *         schema:
 *           $ref: '#/definitions/positions'
 *       - name: title
 *         description: title of the position
 *         in: query
 *         required: false
 *         schema:
 *           $ref: '#/definitions/positions'
 *       - name: address
 *         description: address of the position
 *         in: query
 *         required: false
 *         schema:
 *           $ref: '#/definitions/positions'
 *       - name: city
 *         description: city of the position
 *         in: query
 *         required: false
 *         schema:
 *           $ref: '#/definitions/positions'
 *       - name: state
 *         description: state of the position
 *         in: query
 *         required: false
 *         schema:
 *           $ref: '#/definitions/positions'
 *       - name: zip
 *         description: zip of the position
 *         in: query
 *         required: false
 *         schema:
 *           $ref: '#/definitions/positions'
 *       - name: dateOpen
 *         description: date when the position opened
 *         in: query
 *         required: false
 *         schema:
 *           $ref: '#/definitions/positions'
 *       - name: description
 *         description: description of the position
 *         in: query
 *         required: false
 *         schema:
 *           $ref: '#/definitions/positions'
 *       - name: company
 *         description: company of the position
 *         in: query
 *         required: false
 *         schema:
 *           $ref: '#/definitions/positions'
 *     responses:
 *       200:
 *         description: An array of positions
 *         schema:
 *           $ref: '#/definitions/positions'
 *       204:
 *         description: Empty response
 *       500:
 *         description: Application error
 *   post:
 *     tags:
 *       - positions
 *     description: Creates a new position
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Authorization
 *         description: Authorization Bearer token
 *         in: header
 *         required: true
 *         schema:
 *           $ref: '#/definitions/authentication'
 *       - name: id
 *         description: primary key of position
 *         in: body
 *         required: false
 *         schema:
 *           $ref: '#/definitions/positions'
 *       - name: title
 *         description: title of the position
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/positions'
 *       - name: address
 *         description: address of the position
 *         in: body
 *         required: false
 *         schema:
 *           $ref: '#/definitions/positions'
 *       - name: city
 *         description: city of the position
 *         in: body
 *         required: false
 *         schema:
 *           $ref: '#/definitions/positions'
 *       - name: state
 *         description: state of the position
 *         in: body
 *         required: false
 *         schema:
 *           $ref: '#/definitions/positions'
 *       - name: zip
 *         description: zip of the position
 *         in: body
 *         required: false
 *         schema:
 *           $ref: '#/definitions/positions'
 *       - name: dateOpen
 *         description: date when the position opened
 *         in: body
 *         required: false
 *         schema:
 *           $ref: '#/definitions/positions'
 *       - name: description
 *         description: description of the position
 *         in: body
 *         required: false
 *         schema:
 *           $ref: '#/definitions/positions'
 *       - name: company
 *         description: company of the position
 *         in: body
 *         required: false
 *         schema:
 *           $ref: '#/definitions/positions'
 *     responses:
 *       201:
 *         description: Successfully created
 *         schema:
 *           $ref: '#/definitions/positions'
 *       500:
 *         description: Application error
 * /positions/{id}:
 *   get:
 *     tags:
 *       - positions
 *     description: Returns a single position
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: primary key of position
 *         in: path
 *         required: true
 *         schema:
 *           $ref: '#/definitions/positions'
 *     responses:
 *       200:
 *         description: A single position
 *         schema:
 *           $ref: '#/definitions/positions'
 *       400:
 *         description: Wrong position id provided
 *       500:
 *         description: Application error
 *   put:
 *     tags: 
 *       - positions
 *     description: Updates a single position
 *     produces: application/json
 *     parameters:
 *       - name: Authorization
 *         description: Authorization Bearer token
 *         in: header
 *         required: true
 *         schema:
 *           $ref: '#/definitions/authentication'
 *       - name: id
 *         description: primary key of position
 *         in: path
 *         required: true
 *         schema:
 *           $ref: '#/definitions/positions'
 *       - name: title
 *         description: title of the position
 *         in: body
 *         required: false
 *         schema:
 *           $ref: '#/definitions/positions'
 *       - name: address
 *         description: address of the position
 *         in: body
 *         required: false
 *         schema:
 *           $ref: '#/definitions/positions'
 *       - name: city
 *         description: city of the position
 *         in: body
 *         required: false
 *         schema:
 *           $ref: '#/definitions/positions'
 *       - name: state
 *         description: state of the position
 *         in: body
 *         required: false
 *         schema:
 *           $ref: '#/definitions/positions'
 *       - name: zip
 *         description: zip of the position
 *         in: body
 *         required: false
 *         schema:
 *           $ref: '#/definitions/positions'
 *       - name: dateOpen
 *         description: date when the position opened
 *         in: body
 *         required: false
 *         schema:
 *           $ref: '#/definitions/positions'
 *       - name: description
 *         description: description of the position
 *         in: body
 *         required: false
 *         schema:
 *           $ref: '#/definitions/positions'
 *       - name: company
 *         description: company of the position
 *         in: body
 *         required: false
 *         schema:
 *           $ref: '#/definitions/positions'
 *     responses:
 *       200:
 *         description: Successfully updated
 *         schema:
 *           $ref: '#/definitions/positions'
 *       400:
 *         description: Wrong position id provided
 *       500:
 *         description: Application error
 *   patch:
 *     tags: 
 *       - positions
 *     description: Updates a single position
 *     produces: application/json
 *     parameters:
 *       - name: Authorization
 *         description: Authorization Bearer token
 *         in: header
 *         required: true
 *         schema:
 *           $ref: '#/definitions/authentication'
 *       - name: id
 *         description: primary key of position
 *         in: path
 *         required: true
 *         schema:
 *           $ref: '#/definitions/positions'
 *       - name: title
 *         description: title of the position
 *         in: body
 *         required: false
 *         schema:
 *           $ref: '#/definitions/positions'
 *       - name: address
 *         description: address of the position
 *         in: body
 *         required: false
 *         schema:
 *           $ref: '#/definitions/positions'
 *       - name: city
 *         description: city of the position
 *         in: body
 *         required: false
 *         schema:
 *           $ref: '#/definitions/positions'
 *       - name: state
 *         description: state of the position
 *         in: body
 *         required: false
 *         schema:
 *           $ref: '#/definitions/positions'
 *       - name: zip
 *         description: zip of the position
 *         in: body
 *         required: false
 *         schema:
 *           $ref: '#/definitions/positions'
 *       - name: dateOpen
 *         description: date when the position opened
 *         in: body
 *         required: false
 *         schema:
 *           $ref: '#/definitions/positions'
 *       - name: description
 *         description: description of the position
 *         in: body
 *         required: false
 *         schema:
 *           $ref: '#/definitions/positions'
 *       - name: company
 *         description: company of the position
 *         in: body
 *         required: false
 *         schema:
 *           $ref: '#/definitions/positions'
 *     responses:
 *       200:
 *         description: Successfully updated
 *         schema:
 *           $ref: '#/definitions/positions'
 *       400:
 *         description: Wrong position id provided
 *       500:
 *         description: Application error
 *   delete:
 *     tags:
 *       - positions
 *     description: Deletes a single position
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Authorization
 *         description: Authorization Bearer token
 *         in: header
 *         required: true
 *         schema:
 *           $ref: '#/definitions/authentication'
 *       - name: id
 *         description: primary key of position
 *         in: path
 *         required: true
 *         schema:
 *           $ref: '#/definitions/positions'
 *     responses:
 *       204:
 *         description: Successfully deleted
 *       400:
 *         description: Wrong position id provided
 *       500:
 *         description: Application error
 * /positions/{id}/candidates:
 *   get:
 *     tags:
 *       - candidates
 *     description: Returns candidates applied for a position
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: primary key of position
 *         in: path
 *         required: true
 *         schema:
 *           $ref: '#/definitions/positions'
 *     responses:
 *       200:
 *         description: An array of candidates
 *         schema:
 *           $ref: '#/definitions/candidates'
 *       204:
 *         description: Empty response
 *       500:
 *         description: Application error
 *   post:
 *     tags:
 *       - candidates
 *     description: Applies candidate for a position
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Authorization
 *         description: Authorization Bearer token
 *         in: header
 *         required: true
 *         schema:
 *           $ref: '#/definitions/authentication'
 *       - name: id
 *         description: primary key of position
 *         in: path
 *         required: true
 *         schema:
 *           $ref: '#/definitions/positions'
 *       - name: candidateId
 *         description: primary key of candidate
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/applications'
 *     responses:
 *       201:
 *         description: Successfully created
 *         schema:
 *           $ref: '#/definitions/applications'
 *       500:
 *         description: Application error
 * /positions/{positionId}/candidates/{candidateId}:
 *   get:
 *     tags:
 *       - candidates
 *     description: Returns a single candidate
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: positionId
 *         description: primary key of position
 *         in: path
 *         required: true
 *         schema:
 *           $ref: '#/definitions/positions'
 *       - name: candidateId
 *         description: primary key of candidate
 *         in: path
 *         required: true
 *         schema:
 *           $ref: '#/definitions/candidates'
 *     responses:
 *       200:
 *         description: A single candidate
 *         schema:
 *           $ref: '#/definitions/candidates'
 *       400:
 *         description: Wrong position id or candidate id provided
 *       500:
 *         description: Application error
 */

'use strict';

var verifyToken = require('../../config/verify_token');

module.exports = function(app, db) {
  var positions = require('../controllers/position_controller');

  app.route('/recruit/api/v1/positions')
    .get(positions.search(db))
    .post(verifyToken, positions.create(db));

  app.route('/recruit/api/v1/positions/:positionId')
    .get(positions.get_by_id(db))
    .put(verifyToken, positions.update_by_id(db))
    .patch(verifyToken, positions.update_by_id(db))
    .delete(verifyToken, positions.delete_by_id(db));

  app.route('/recruit/api/v1/positions/:positionId/candidates')
    .get(positions.get_candidates_by_position_id(db))
    .post(verifyToken, positions.create_candidate_by_position_id(db));

  app.route('/recruit/api/v1/positions/:positionId/candidates/:candidateId')
    .get(positions.get_candidate_by_position_id_and_candidate_id(db));
};
