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
 *         type: date
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
 *         description: application's id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
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
 */

'use strict';

var utils = require('../../config/utils');
var multer = require('multer');
var storage = multer.memoryStorage()
var upload = multer({storage: storage});

module.exports = function(app, db) {
  app.route('/recruit/api/v1/applications')
    .get((req, res) => {
        let sql = 'SELECT applications.id, candidateId, positionId, name, title, date, summary, description, candidates.address AS candidate_address, positions.address AS position_address FROM applications INNER JOIN candidates ON applications.candidateId = candidates.id INNER JOIN positions ON applications.positionId = positions.id;';
        let query = db.query(sql, (err, result) => {
            if (err) {
                res.status(500).json(err);
            } else if (result === undefined || result.length == 0) {
                res.status(204).json(result);
            } else {
                res.status(200).json(result);
            }
        })
    })
    .post((req, res) => {
        let application = req.body;
        let sql = 'INSERT INTO applications SET ?';
        let query = db.query(sql, application, (err, result) => {
            if (err) {
                res.status(500).json(err);
            } else {
                application['id'] = result.insertId;
                res.status(201).json(application);
            }
        })
    });

  app.route('/recruit/api/v1/applications/:applicationId')
    .get((req, res) => {
        let id = Number(req.params.applicationId);
        let sql = `SELECT applications.id, candidateId, positionId, name, title, date, summary, description, candidates.address AS candidate_address, positions.address AS position_address FROM applications INNER JOIN candidates ON applications.candidateId = candidates.id INNER JOIN positions ON applications.positionId = positions.id WHERE applications.id = ${id};`;
        let query = db.query(sql, (err, result) => {
            if (err) {
                res.status(500).json(err);
            } else if (result === undefined || result.length == 0) {
                res.status(400).json({ errorMessage: 'Incorrect applicationId: ' + id });
            } else {
                res.status(200).json(result[0]);
            }
        })
    })
    .put((req, res) => {
        let id = Number(req.params.applicationId);
        let application = req.body;
        let sql = `UPDATE applications SET ? WHERE id = ${id}`;
        let query = db.query(sql, application, (err, result) => {
            if (err) {
                res.status(500).json(err);
            } else if (result === undefined || result.length == 0) {
                res.status(400).json({ errorMessage: 'Incorrect applicationId: ' + id });
            } else {
                application['id'] = Number(req.params.applicationId);
                res.status(200).json(application);
            }
        })
    })
    .delete((req, res) => {
        let id = Number(req.params.applicationId);
        let sql = `DELETE FROM applications WHERE id = ${id}`;
        let query = db.query(sql, id, (err, result) => {
            if (err) {
                res.status(500).json(err);
            } else if (result === undefined || result.length == 0) {
                res.status(400).json({ errorMessage: 'Incorrect applicationId: ' + id });
            } else if (result.affectedRows == 0) {
                res.status(400).json({ errorMessage: 'Incorrect applicationId: ' + id });
            } else {
                res.status(204).json();
            }
        })
    });
 app.route('/recruit/api/v1/applications/:applicationId/resume')
    .get((req, res) => {
        let id = Number(req.params.applicationId);
        let sql = `SELECT resume FROM applications INNER JOIN candidates ON applications.candidateId = candidates.id WHERE applications.id = ${id};`;
        let query = db.query(sql, (err, result) => {
            if (err) {
                res.status(500).json(err);
            } else if (result === undefined || result.length == 0) {
                res.status(204).json(result);
            } else if (result[0].resume === undefined || result[0].resume === null) {
                res.status(204).json(result);
            } else {
                var resume = JSON.parse(result[0].resume.toString());
                var file = Buffer.from(resume.buffer.data)
                res.set('Content-Disposition', 'attachment; filename=' + resume.originalname);
                res.set('Content-Type', resume.mimetype);
                res.status(200).send(file);
            }
        })
    })
    .post(upload.single("resume"), (req, res) => {
        var file = JSON.stringify(req.file);
        if (file === undefined || file.length == 0) {
            res.status(400).json({ errorMessage: 'No file found in post request! Make sure its Content-Type: multipart/form-data and name is resume'});
        } else if (req.file.size === undefined || req.file.size > 1048576) {
            res.status(400).json({ errorMessage: 'Maximum file size allowed: 1 Mb'});
        } else {
            var resume = {
                "resume": file
            }
            let id = Number(req.params.applicationId);
            let sql = `UPDATE candidates SET ? WHERE candidates.id = (SELECT candidateId from applications WHERE applications.id = ${id});`;
            let query = db.query(sql, resume, (err, result) => {
                if (err) {
                    res.status(500).json(err);
                } else {
                    res.status(201).json();
                }
            })
        }
    });
};
