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
 *       description:
 *         type: string
 * /positions:
 *   get:
 *     tags:
 *       - positions
 *     description: Returns all positions
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
 *     description: Creates a new position
 *     produces:
 *       - application/json
 *     parameters:
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
 *       - name: description
 *         description: description of the position
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
 *       - name: description
 *         description: description of the position
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
 *       - name: description
 *         description: description of the position
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
 *       - name: id
 *         description: position's id
 *         in: path
 *         required: true
 *         type: integer
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

var utils = require('../../config/utils');

module.exports = function(app, db) {
  app.route('/recruit/api/v1/positions')
    .get((req, res) => {
    	let sql = 'SELECT * FROM positions';
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
    	// let position = {title:'Director, Product Development', address:'4135 Thunder Road, Palo Alto, CA 94306', description:'Director, Product Development requirements'}
   		let position = req.body;
   		let sql = 'INSERT INTO positions SET ?';
    	let query = db.query(sql, position, (err, result) => {
    		if (err) {
                res.status(500).json(err);
    		} else {
    		    position['id'] = result.insertId;
    		    res.status(201).json(position);
    		}
    	})
	});
 //    .delete((req, res) => {
 //    	let sql = 'DELETE FROM positions';
 //    	let query = db.query(sql, (err, result) => {
 //    		if (err) {
 //             res.status(500).json(err);
 //    		} else if (result.affectedRows == 0) {
 //                res.status(400).json();
 //            } else {
 //    		   res.status(204).json();
 //            }
 //    	})
	// });

  app.route('/recruit/api/v1/positions/:positionId')
    .get((req, res) => {
    	let id = Number(req.params.positionId);
    	let sql = `SELECT * FROM positions WHERE id = ${id}`;
    	let query = db.query(sql, (err, result) => {
    		if (err) {
                res.status(500).json(err);
    		} else if (result === undefined || result.length == 0) {
                res.status(400).json({ errorMessage: 'Incorrect positionId: ' + id });
            } else {
    		    res.status(200).json(result[0]);
            }
    	})
	})
    .put((req, res) => {
        let id = Number(req.params.positionId);
   		let position = req.body;
   		let sql = `UPDATE positions SET ? WHERE id = ${id}`;
    	let query = db.query(sql, position, (err, result) => {
    		if (err) {
                res.status(500).json(err);
    		} else if (result === undefined || result.length == 0) {
                res.status(400).json({ errorMessage: 'Incorrect positionId: ' + id });
            } else {
                position['id'] = Number(id);
    		    res.status(200).json(position);
            }
    	})
	})
    .patch((req, res) => {
        let id = Number(req.params.positionId);
        let position = req.body;
        let sql = `UPDATE positions SET ? WHERE id = ${id}`;
        let query = db.query(sql, position, (err, result) => {
            if (err) {
                res.status(500).json(err);
            } else if (result === undefined || result.length == 0) {
                res.status(400).json({ errorMessage: 'Incorrect positionId: ' + id });
            } else {
                position['id'] = Number(id);
                res.status(200).json(position);
            }
        })
    })
    .delete((req, res) => {
    	let id = Number(req.params.positionId);
    	let sql = `DELETE FROM positions WHERE id = ${id}`;
    	let query = db.query(sql, id, (err, result) => {
    		if (err) {
                res.status(500).json(err);
    		} else if (result === undefined || result.length == 0) {
                res.status(400).json({ errorMessage: 'Incorrect positionId: ' + id });
            } else if (result.affectedRows == 0) {
                res.status(400).json({ errorMessage: 'Incorrect positionId: ' + id });
            } else {
                console.log(result);
    		    res.status(204).json({ message: 'Position ' + id + ' successfully deleted!' });
            }
    	})
	});
  app.route('/recruit/api/v1/positions/:positionId/candidates')
    .get((req, res) => {
        let positionId = Number(req.params.positionId);
        let sql = `SELECT candidates.id, candidates.name, candidates.address, candidates.summary FROM candidates INNER JOIN applications ON applications.candidateId = candidates.id WHERE applications.positionId = ${positionId};`;
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
        application['positionId'] = Number(req.params.positionId);
        application['date'] = utils.todaysDate();
        let sql = 'INSERT INTO applications SET ?';
        let query = db.query(sql, application, (err, result) => {
            if (err) {
                res.status(500).json(err);
            } else {
            }
        })
    });
  app.route('/recruit/api/v1/positions/:positionId/candidates/:candidateId')
    .get((req, res) => {
        let positionId = Number(req.params.positionId);
        let candidateId = Number(req.params.candidateId);
        let sql = `SELECT candidates.id, candidates.name, candidates.address, candidates.summary FROM candidates INNER JOIN applications ON applications.candidateId = candidates.id WHERE applications.positionId = ${positionId} AND applications.candidateId = ${candidateId};`;
        let query = db.query(sql, (err, result) => {
            if (err) {
                res.status(500).json(err);
            } else if (result === undefined || result.length == 0) {
                res.status(400).json({ errorMessage: 'Incorrect combination of positionId: ' + positionId + ' and candidateId: ' + candidateId });
            } else {
                res.status(200).json(result[0]);
            }
        })
    });
};
