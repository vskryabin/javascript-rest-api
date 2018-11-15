/**
 * @swagger
 * definition:
 *   candidates:
 *     properties:
 *       id:
 *         type: integer
 *       name:
 *         type: string
 *       address:
 *         type: string
 *       summary:
 *         type: string
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
 *       - name: name
 *         description: name of the candidate
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/candidates'
 *       - name: address
 *         description: address of the candidate
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
 *       - name: name
 *         description: name of the candidate
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/candidates'
 *       - name: address
 *         description: address of the candidate
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
 *       - name: name
 *         description: name of the candidate
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/candidates'
 *       - name: address
 *         description: address of the candidate
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
 *       - name: id
 *         description: candidate's id
 *         in: path
 *         required: true
 *         type: integer
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
 *   delete:
 *     tags:
 *       - resumes
 *     description: Deletes a resume
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: candidate's id
 *         in: path
 *         required: true
 *         type: integer
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

var utils = require('../../config/utils');
var multer = require('multer');
var storage = multer.memoryStorage()
var upload = multer({storage: storage});

module.exports = function(app, db) {
  app.route('/recruit/api/v1/candidates')
    .get((req, res) => {
        let sql = 'SELECT id, name, address, summary FROM candidates';
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
        let candidate = req.body;
        let sql = 'INSERT INTO candidates SET ?';
        let query = db.query(sql, candidate, (err, result) => {
            if (err) {
                res.status(500).json(err);
            } else {
                candidate['id'] = result.insertId;
                res.status(201).json(candidate);
            }
        })
    });

  app.route('/recruit/api/v1/candidates/:candidateId')
    .get((req, res) => {
        let id = Number(req.params.candidateId);
        let sql = `SELECT id, name, address, summary FROM candidates WHERE id = ${id}`;
        let query = db.query(sql, (err, result) => {
            if (err) {
                res.status(500).json(err);
            } else if (result === undefined || result.length == 0) {
                res.status(400).json({ errorMessage: 'Incorrect candidateId: ' + id });
            } else {
                res.status(200).json(result[0]);
            }
        })
    })
    .put((req, res) => {
        let id = Number(req.params.candidateId);
        let candidate = req.body;
        let sql = `UPDATE candidates SET ? WHERE id = ${id}`;
        let query = db.query(sql, candidate, (err, result) => {
            if (err) {
                res.status(500).json(err);
            } else if (result === undefined || result.length == 0) {
                res.status(400).json({ errorMessage: 'Incorrect candidateId: ' + id });
            } else {
                candidate['id'] = Number(id);
                res.status(200).json(candidate);
            }
        })
    })
    .patch((req, res) => {
        let id = Number(req.params.candidateId);
        let candidate = req.body;
        let sql = `UPDATE candidates SET ? WHERE id = ${id}`;
        let query = db.query(sql, candidate, (err, result) => {
            if (err) {
                res.status(500).json(err);
            } else if (result === undefined || result.length == 0) {
                res.status(400).json({ errorMessage: 'Incorrect candidateId: ' + id });
            } else {
                candidate['id'] = Number(id);
                res.status(200).json(candidate);
            }
        })
    })
    .delete((req, res) => {
        let id = Number(req.params.candidateId);
        let sql = `DELETE FROM candidates WHERE id = ${id}`;
        let query = db.query(sql, id, (err, result) => {
            if (err) {
                res.status(500).json(err);
            } else if (result === undefined || result.length == 0) {
                res.status(400).json({ errorMessage: 'Incorrect candidateId: ' + id });
            } else if (result.affectedRows == 0) {
                res.status(400).json({ errorMessage: 'Incorrect candidateId: ' + id });
            } else {
                console.log(result);
                res.status(204).json();
            }
        })
    });
  app.route('/recruit/api/v1/candidates/:candidateId/positions')
    .get((req, res) => {
        let candidateId = Number(req.params.candidateId);
        let sql = `SELECT positions.id, positions.title, positions.address, positions.description FROM positions INNER JOIN applications ON applications.positionId = positions.id WHERE applications.candidateId = ${candidateId};`;
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
        application['candidateId'] = Number(req.params.candidateId);
        application['date'] = utils.todaysDate();
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
  app.route('/recruit/api/v1/candidates/:candidateId/resume')
    .get((req, res) => {
        let candidateId = Number(req.params.candidateId);
        let sql = `SELECT resume FROM candidates WHERE id = ${candidateId};`;
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
            let candidateId = Number(req.params.candidateId);
            let sql = `UPDATE candidates SET ? WHERE id = ${candidateId}`;
            let query = db.query(sql, resume, (err, result) => {
                if (err) {
                    res.status(500).json(err);
                } else {
                    res.status(201).json();
                }
            })
        }
    })
    .delete((req, res) => {
        let candidateId = Number(req.params.candidateId);
        let sql = `UPDATE candidates SET resume = NULL WHERE id = ${candidateId}`;
        let query = db.query(sql, (err, result) => {
            if (err) {
                res.status(500).json(err);
            } else if (result === undefined || result.length == 0) {
                res.status(400).json({ errorMessage: 'Incorrect candidateId: ' + candidateId });
            } else if (result.affectedRows == 0) {
                res.status(400).json({ errorMessage: 'Incorrect candidateId: ' + candidateId });
            } else {
                res.status(204).json();
            }
        })
    });
  app.route('/recruit/api/v1/candidates/:candidateId/positions/:positionId')
    .get((req, res) => {
        let positionId = Number(req.params.positionId);
        let candidateId = Number(req.params.candidateId);
        let sql = `SELECT positions.id, positions.title, positions.address, positions.description FROM positions INNER JOIN applications ON applications.positionId = positions.id WHERE applications.candidateId = ${candidateId} AND applications.positionId = ${positionId};`;
        let query = db.query(sql, (err, result) => {
            if (err) {
                res.status(500).json(err);
            } else if (result === undefined || result.length == 0) {
                res.status(400).json({ errorMessage: 'Incorrect combination of candidateId: ' + candidateId + ' and positionId: ' + positionId });
            } else {
                res.status(200).json(result[0]);
            }
        })
    });
};
