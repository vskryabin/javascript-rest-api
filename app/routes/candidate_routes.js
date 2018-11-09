'use strict';

var server = require('../../server');

module.exports = function(app, db) {
  app.route('/recruit/api/v1/candidates')
    .get((req, res) => {
        let sql = 'SELECT * FROM candidates';
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
        let sql = `SELECT * FROM candidates WHERE id = ${id}`;
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
    .delete((req, res) => {
        let id = Number(req.params.candidateId);
        let sql = `DELETE FROM candidates WHERE id = ${id}`;
        let query = db.query(sql, id, (err, result) => {
            if (err) {
                res.status(500).json(err);
            } else if (result === undefined || result.length == 0) {
                res.status(400).json({ errorMessage: 'Incorrect candidateId: ' + id });
            } else {
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
    })

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
