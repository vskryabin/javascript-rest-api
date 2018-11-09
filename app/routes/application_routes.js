'use strict';

var server = require('../../server');

module.exports = function(app, db) {
  app.route('/recruit/api/v1/applications')
    .get((req, res) => {
        let sql = 'SELECT applications.id, candidateId, positionId, name, title, date, resume, description, candidates.address AS candidate_address, positions.address AS position_address FROM applications INNER JOIN candidates ON applications.candidateId = candidates.id INNER JOIN positions ON applications.positionId = positions.id;';
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
        let sql = `SELECT applications.id, candidateId, positionId, name, title, date, resume, description, candidates.address AS candidate_address, positions.address AS position_address FROM applications INNER JOIN candidates ON applications.candidateId = candidates.id INNER JOIN positions ON applications.positionId = positions.id WHERE applications.id = ${id};`;
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
            } else {
                res.status(204).json();
            }
        })
    });
};
