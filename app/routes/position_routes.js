'use strict';

var server = require('../../server');

module.exports = function(app, db) {
  app.route('/recruit')
  .get((req, res) => {
      res.status(304).json({ rest: 'api' });
  });

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
 //    		} else {
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
    .delete((req, res) => {
    	let id = Number(req.params.positionId);
    	let sql = `DELETE FROM positions WHERE id = ${id}`;
    	let query = db.query(sql, id, (err, result) => {
    		if (err) {
                res.status(500).json(err);
    		} else if (result === undefined || result.length == 0) {
                res.status(400).json({ errorMessage: 'Incorrect positionId: ' + id });
            } else {
    		    res.status(204).json({ message: 'Position ' + id + ' successfully deleted!' });
            }
    	})
	});
  app.route('/recruit/api/v1/positions/:positionId/candidates')
    .get((req, res) => {
        let positionId = Number(req.params.positionId);
        let sql = `SELECT candidates.id, candidates.name, candidates.address, candidates.resume FROM candidates INNER JOIN applications ON applications.candidateId = candidates.id WHERE applications.positionId = ${positionId};`;
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
        application['date'] = server.todaysDate();
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
  app.route('/recruit/api/v1/positions/:positionId/candidates/:candidateId')
    .get((req, res) => {
        let positionId = Number(req.params.positionId);
        let candidateId = Number(req.params.candidateId);
        let sql = `SELECT candidates.id, candidates.name, candidates.address, candidates.resume FROM candidates INNER JOIN applications ON applications.candidateId = candidates.id WHERE applications.positionId = ${positionId} AND applications.candidateId = ${candidateId};`;
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
