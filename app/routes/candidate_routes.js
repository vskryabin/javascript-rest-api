/**
 * @swagger
 * definition:
 *   candidates:
 *     properties:
 *       id:
 *         type: integer
 *       firstName:
 *         type: string
 *       middleName:
 *         type: string
 *       lastName:
 *         type: string
 *       email:
 *         type: string
 *       password:
 *         type: string
 *       address:
 *         type: string
 *       city:
 *         type: string
 *       state:
 *         type: string
 *       zip:
 *         type: string
 *       summary:
 *         type: string
 *       positionsCount:
 *         type: integer
 *   resumes:
 *     properties:
 *       resume:
 *         type: string
 *         format: binary
 * /candidates:
 *   get:
 *     tags:
 *       - candidates
 *     description: Returns all candidates
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: primary key of candidate
 *         in: query
 *         required: false
 *         schema:
 *           $ref: '#/definitions/candidates'
 *       - name: firstName
 *         description: first name of the candidate
 *         in: query
 *         required: true
 *         schema:
 *           $ref: '#/definitions/candidates'
 *       - name: middleName
 *         description: middle name of the candidate
 *         in: query
 *         required: false
 *         schema:
 *           $ref: '#/definitions/candidates'
 *       - name: lastName
 *         description: last name of the candidate
 *         in: query
 *         required: false
 *         schema:
 *           $ref: '#/definitions/candidates'
 *       - name: email
 *         description: email of the candidate
 *         in: query
 *         required: false
 *         schema:
 *           $ref: '#/definitions/candidates'
 *       - name: password
 *         description: password of the candidate
 *         in: query
 *         required: false
 *         schema:
 *           $ref: '#/definitions/candidates'
 *       - name: address
 *         description: address of the candidate
 *         in: query
 *         required: false
 *         schema:
 *           $ref: '#/definitions/candidates'
 *       - name: city
 *         description: city of the candidate
 *         in: query
 *         required: false
 *         schema:
 *           $ref: '#/definitions/candidates'
 *       - name: state
 *         description: state of the candidate
 *         in: query
 *         required: false
 *         schema:
 *           $ref: '#/definitions/candidates'
 *       - name: zip
 *         description: zip of the candidate
 *         in: query
 *         required: false
 *         schema:
 *           $ref: '#/definitions/candidates'
 *       - name: summary
 *         description: summary of the candidate
 *         in: query
 *         required: false
 *         schema:
 *           $ref: '#/definitions/candidates'
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
 *     description: Creates a new candidate
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: primary key of candidate
 *         in: body
 *         required: false
 *         schema:
 *           $ref: '#/definitions/candidates'
 *       - name: firstName
 *         description: first name of the candidate
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/candidates'
 *       - name: middleName
 *         description: middle name of the candidate
 *         in: body
 *         required: false
 *         schema:
 *           $ref: '#/definitions/candidates'
 *       - name: lastName
 *         description: last name of the candidate
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/candidates'
 *       - name: email
 *         description: email of the candidate
 *         in: query
 *         required: false
 *         schema:
 *           $ref: '#/definitions/candidates'
 *       - name: password
 *         description: password of the candidate
 *         in: query
 *         required: false
 *         schema:
 *           $ref: '#/definitions/candidates'
 *       - name: address
 *         description: address of the candidate
 *         in: body
 *         required: false
 *         schema:
 *           $ref: '#/definitions/candidates'
 *       - name: city
 *         description: city of the candidate
 *         in: body
 *         required: false
 *         schema:
 *           $ref: '#/definitions/candidates'
 *       - name: state
 *         description: state of the candidate
 *         in: body
 *         required: false
 *         schema:
 *           $ref: '#/definitions/candidates'
 *       - name: zip
 *         description: zip of the candidate
 *         in: body
 *         required: false
 *         schema:
 *           $ref: '#/definitions/candidates'
 *       - name: summary
 *         description: summary of the candidate
 *         in: body
 *         required: false
 *         schema:
 *           $ref: '#/definitions/candidates'
 *     responses:
 *       201:
 *         description: Successfully created
 *         schema:
 *           $ref: '#/definitions/candidates'
 *       500:
 *         description: Application error
 * /candidates/{id}:
 *   get:
 *     tags:
 *       - candidates
 *     description: Returns a single candidate
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
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
 *         description: Wrong candidate id provided
 *       500:
 *         description: Application error
 *   put:
 *     tags: 
 *       - candidates
 *     description: Updates a single candidate
 *     produces: application/json
 *     parameters:
 *       - name: Authorization
 *         description: Authorization Bearer token
 *         in: header
 *         required: true
 *         schema:
 *           $ref: '#/definitions/authentication'
 *       - name: id
 *         description: primary key of candidate
 *         in: path
 *         required: true
 *         schema:
 *           $ref: '#/definitions/candidates'
 *       - name: firstName
 *         description: first name of the candidate
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/candidates'
 *       - name: middleName
 *         description: middle name of the candidate
 *         in: body
 *         required: false
 *         schema:
 *           $ref: '#/definitions/candidates'
 *       - name: lastName
 *         description: last name of the candidate
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/candidates'
 *       - name: email
 *         description: email of the candidate
 *         in: query
 *         required: false
 *         schema:
 *           $ref: '#/definitions/candidates'
 *       - name: password
 *         description: password of the candidate
 *         in: query
 *         required: false
 *         schema:
 *           $ref: '#/definitions/candidates'
 *       - name: address
 *         description: address of the candidate
 *         in: body
 *         required: false
 *         schema:
 *           $ref: '#/definitions/candidates'
 *       - name: city
 *         description: city of the candidate
 *         in: body
 *         required: false
 *         schema:
 *           $ref: '#/definitions/candidates'
 *       - name: state
 *         description: state of the candidate
 *         in: body
 *         required: false
 *         schema:
 *           $ref: '#/definitions/candidates'
 *       - name: zip
 *         description: zip of the candidate
 *         in: body
 *         required: false
 *         schema:
 *           $ref: '#/definitions/candidates'
 *       - name: summary
 *         description: summary of the candidate
 *         in: body
 *         required: false
 *         schema:
 *           $ref: '#/definitions/candidates'
 *     responses:
 *       200:
 *         description: Successfully updated
 *         schema:
 *           $ref: '#/definitions/candidates'
 *       400:
 *         description: Wrong candidate id provided
 *       500:
 *         description: Application error
 *   patch:
 *     tags: 
 *       - candidates
 *     description: Updates a single candidate
 *     produces: application/json
 *     parameters:
 *       - name: Authorization
 *         description: Authorization Bearer token
 *         in: header
 *         required: true
 *         schema:
 *           $ref: '#/definitions/authentication'
 *       - name: id
 *         description: primary key of candidate
 *         in: path
 *         required: true
 *         schema:
 *           $ref: '#/definitions/candidates'
 *       - name: firstName
 *         description: first name of the candidate
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/candidates'
 *       - name: middleName
 *         description: middle name of the candidate
 *         in: body
 *         required: false
 *         schema:
 *           $ref: '#/definitions/candidates'
 *       - name: lastName
 *         description: last name of the candidate
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/candidates'
 *       - name: email
 *         description: email of the candidate
 *         in: query
 *         required: false
 *         schema:
 *           $ref: '#/definitions/candidates'
 *       - name: password
 *         description: password of the candidate
 *         in: query
 *         required: false
 *         schema:
 *           $ref: '#/definitions/candidates'
 *       - name: address
 *         description: address of the candidate
 *         in: body
 *         required: false
 *         schema:
 *           $ref: '#/definitions/candidates'
 *       - name: city
 *         description: city of the candidate
 *         in: body
 *         required: false
 *         schema:
 *           $ref: '#/definitions/candidates'
 *       - name: state
 *         description: state of the candidate
 *         in: body
 *         required: false
 *         schema:
 *           $ref: '#/definitions/candidates'
 *       - name: zip
 *         description: zip of the candidate
 *         in: body
 *         required: false
 *         schema:
 *           $ref: '#/definitions/candidates'
 *       - name: summary
 *         description: summary of the candidate
 *         in: body
 *         required: false
 *         schema:
 *           $ref: '#/definitions/candidates'
 *     responses:
 *       200:
 *         description: Successfully updated
 *         schema:
 *           $ref: '#/definitions/candidates'
 *       400:
 *         description: Wrong candidate id provided
 *       500:
 *         description: Application error
 *   delete:
 *     tags:
 *       - candidates
 *     description: Deletes a single candidate
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
 *         description: primary key of candidate
 *         in: path
 *         required: true
 *         schema:
 *           $ref: '#/definitions/candidates'
 *     responses:
 *       204:
 *         description: Successfully deleted
 *       400:
 *         description: Wrong candidate id provided
 *       500:
 *         description: Application error
 * /candidates/{id}/positions:
 *   get:
 *     tags:
 *       - positions
 *     description: Returns positions candidate applied to
 *     produces:
 *       - application/json
 *       - name: id
 *         description: primary key of candidate
 *         in: path
 *         required: true
 *         schema:
 *           $ref: '#/definitions/candidates'
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
 *         description: primary key of candidate
 *         in: path
 *         required: true
 *         schema:
 *           $ref: '#/definitions/candidates'
 *       - name: positionId
 *         description: primary key of position
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
 * /candidates/{id}/resume:
 *   get:
 *     tags:
 *       - resumes
 *     description: Returns resume of the candidate
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: primary key of candidate
 *         in: path
 *         required: true
 *         schema:
 *           $ref: '#/definitions/candidates'
 *     responses:
 *       200:
 *         description: Resume of the candidate
 *         schema:
 *           $ref: '#/definitions/resumes'
 *       204:
 *         description: Empty response
 *       500:
 *         description: Application error
 *   post:
 *     tags:
 *       - resumes
 *     description: Adds resume to a candidate
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
 *         description: primary key of candidate
 *         in: path
 *         required: true
 *         schema:
 *           $ref: '#/definitions/candidates'
 *       - name: resume
 *         description: requires header Content-Type multipart/form-data and resume file in the body. 1 Mb size limit.
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/resumes'
 *     responses:
 *       201:
 *         description: Successfully added
 *         schema:
 *           $ref: '#/definitions/resumes'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Application error
 *   delete:
 *     tags:
 *       - resumes
 *     description: Deletes a resume
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
 *         description: primary key of candidate
 *         in: path
 *         required: true
 *         schema:
 *           $ref: '#/definitions/candidates'
 *     responses:
 *       204:
 *         description: Successfully deleted resume
 *       400:
 *         description: Wrong candidate id provided
 *       500:
 *         description: Application error
 * /candidates/{candidateId}/positions/{positionId}:
 *   get:
 *     tags:
 *       - positions
 *     description: Returns a single position
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: candidateId
 *         description: primary key of candidate
 *         in: path
 *         required: true
 *         schema:
 *           $ref: '#/definitions/candidates'
 *       - name: positionId
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
 *         description: Wrong candidate id or position id provided
 *       500:
 *         description: Application error
 */

'use strict';

var multer = require('multer');
var storage = multer.memoryStorage()
var upload = multer({storage: storage});
var verifyToken = require('../../config/verify_token');

module.exports = function(app, db) {
  var candidates = require('../controllers/candidate_controller');

  app.route('/recruit/api/v1/candidates')
    .get(candidates.search(db))
    .post(candidates.create(db));

  app.route('/recruit/api/v1/candidates/:candidateId')
    .get(candidates.get_by_id(db))
    .put(verifyToken, candidates.update_by_id(db))
    .patch(verifyToken, candidates.update_by_id(db))
    .delete(verifyToken, candidates.delete_by_id(db));

  app.route('/recruit/api/v1/candidates/:candidateId/positions')
    .get(candidates.get_positions_by_candidate_id(db))
    .post(verifyToken, candidates.create_position_by_candidate_id(db));

  app.route('/recruit/api/v1/candidates/:candidateId/resume')
    .get(candidates.get_resume_by_candidate_id(db))
    .post(verifyToken, upload.single("resume"), candidates.create_resume_by_candidate_id(db))
    .delete(verifyToken, candidates.delete_resume_by_candidate_id(db));

  app.route('/recruit/api/v1/candidates/:candidateId/positions/:positionId')
    .get(candidates.get_position_by_candidate_id_and_position_id(db));
};
