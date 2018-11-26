/**
 * @swagger
 * definition:
 *   applications:
 *     properties:
 *       id:
 *         type: integer
 *       candidateId:
 *         type: integer
 *       positionId:
 *         type: integer
 *       name:
 *         type: string
 *       title:
 *         type: string
 *       date:
 *         type: string
 *         format: date
 *       summary:
 *         type: string
 *       description:
 *         type: string
 *       candidate_address:
 *         type: string
 *       position_address:
 *         type: string
 * /applications:
 *   get:
 *     tags:
 *       - applications
 *     description: Returns all applications
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: primary key of application
 *         in: query
 *         required: false
 *         schema:
 *           $ref: '#/definitions/applications'
 *       - name: candidateId
 *         description: primary key of candidate
 *         in: query
 *         required: false
 *         schema:
 *           $ref: '#/definitions/applications'
 *       - name: positionId
 *         description: primary key of position
 *         in: query
 *         required: false
 *         schema:
 *           $ref: '#/definitions/applications'
 *       - name: name
 *         description: name of the candidate
 *         in: query
 *         required: false
 *         schema:
 *           $ref: '#/definitions/applications'
 *       - name: summary
 *         description: summary of the candidate
 *         in: query
 *         required: false
 *         schema:
 *           $ref: '#/definitions/applications'
 *       - name: candidate_address
 *         description: address of the candidate
 *         in: query
 *         required: false
 *         schema:
 *           $ref: '#/definitions/applications'
 *       - name: title
 *         description: title of the position
 *         in: query
 *         required: false
 *         schema:
 *           $ref: '#/definitions/applications'
 *       - name: description
 *         description: description of the position
 *         in: query
 *         required: false
 *         schema:
 *           $ref: '#/definitions/applications'
 *       - name: position_address
 *         description: address of the position
 *         in: query
 *         required: false
 *         schema:
 *           $ref: '#/definitions/applications'
 *     responses:
 *       200:
 *         description: An array of applications
 *         schema:
 *           $ref: '#/definitions/applications'
 *       204:
 *         description: Empty response
 *       500:
 *         description: Application error
 *   post:
 *     tags:
 *       - applications
 *     description: Creates a new application
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: primary key of application
 *         in: body
 *         required: false
 *         schema:
 *           $ref: '#/definitions/applications'
 *       - name: candidateId
 *         description: primary key of candidate
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/applications'
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
 * /applications/{id}:
 *   get:
 *     tags:
 *       - applications
 *     description: Returns a single application
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: primary key of application
 *         in: path
 *         required: true
 *         schema:
 *           $ref: '#/definitions/applications'
 *     responses:
 *       200:
 *         description: A single application
 *         schema:
 *           $ref: '#/definitions/applications'
 *       400:
 *         description: Wrong application id provided
 *       500:
 *         description: Application error
 *   put:
 *     tags: 
 *       - applications
 *     description: Updates a single application
 *     produces: application/json
 *     parameters:
 *       - name: id
 *         description: primary key of application
 *         in: path
 *         required: true
 *         schema:
 *           $ref: '#/definitions/applications'
 *       - name: candidateId
 *         description: primary key of candidate
 *         in: body
 *         required: false
 *         schema:
 *           $ref: '#/definitions/applications'
 *       - name: positionId
 *         description: primary key of position
 *         in: body
 *         required: false
 *         schema:
 *           $ref: '#/definitions/applications'
 *     responses:
 *       200:
 *         description: Successfully updated
 *         schema:
 *           $ref: '#/definitions/applications'
 *       400:
 *         description: Wrong application id provided
 *       500:
 *         description: Application error
 *   patch:
 *     tags: 
 *       - applications
 *     description: Updates a single application
 *     produces: application/json
 *     parameters:
 *       - name: id
 *         description: primary key of application
 *         in: path
 *         required: true
 *         schema:
 *           $ref: '#/definitions/applications'
 *       - name: candidateId
 *         description: primary key of candidate
 *         in: body
 *         required: false
 *         schema:
 *           $ref: '#/definitions/applications'
 *       - name: positionId
 *         description: primary key of position
 *         in: body
 *         required: false
 *         schema:
 *           $ref: '#/definitions/applications'
 *     responses:
 *       200:
 *         description: Successfully updated
 *         schema:
 *           $ref: '#/definitions/applications'
 *       400:
 *         description: Wrong application id provided
 *       500:
 *         description: Application error
 *   delete:
 *     tags:
 *       - applications
 *     description: Deletes a single application
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: primary key of application
 *         in: path
 *         required: true
 *         schema:
 *           $ref: '#/definitions/applications'
 *     responses:
 *       204:
 *         description: Successfully deleted
 *       400:
 *         description: Wrong application id provided
 *       500:
 *         description: Application error
 * /applications/{id}/resume:
 *   get:
 *     tags:
 *       - resumes
 *     description: Returns resume of the candidate
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: primary key of application
 *         in: path
 *         required: true
 *         schema:
 *           $ref: '#/definitions/applications'
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
 *       - name: id
 *         description: primary key of application
 *         in: path
 *         required: true
 *         schema:
 *           $ref: '#/definitions/applications'
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
 *       - name: id
 *         description: primary key of application
 *         in: path
 *         required: true
 *         schema:
 *           $ref: '#/definitions/applications'
 *     responses:
 *       204:
 *         description: Successfully deleted resume
 *       400:
 *         description: Wrong application id provided
 *       500:
 *         description: Application error
 */

'use strict';

var multer = require('multer');
var storage = multer.memoryStorage()
var upload = multer({storage: storage});
var verifyToken = require('../../config/verify_token');

module.exports = function(app, db) {
  var applications = require('../controllers/application_controller');

  app.route('/recruit/api/v1/applications')
    .get(applications.search(db))
    .post(verifyToken, applications.create(db));
    // .delete(applications.delete(db));

  app.route('/recruit/api/v1/applications/:applicationId')
    .get(applications.get_by_id(db))
    .put(verifyToken, applications.update_by_id(db))
    .patch(verifyToken, applications.update_by_id(db))
    .delete(verifyToken, applications.delete_by_id(db));

 app.route('/recruit/api/v1/applications/:applicationId/resume')
    .get(applications.get_resume_by_application_id(db))
    .post(verifyToken, upload.single("resume"), applications.create_resume_by_application_id(db))
    .delete(verifyToken, applications.delete_resume_by_application_id(db));
};
