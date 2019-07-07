'use strict';

var utils = require('../../config/utils');

exports.search = function(db) {
    return function(req, res, next) {
        let sql = "SELECT applications.id, candidateId, positionId, firstName, middleName, lastName, email, title, dateApplied, summary, description, dateOpen, company, candidates.address AS candidate_address, candidates.city AS candidate_city, candidates.state AS candidate_state, candidates.zip AS candidate_zip, positions.address AS position_address, positions.city AS position_city, positions.state AS position_state, positions.zip AS position_zip FROM applications INNER JOIN candidates ON applications.candidateId = candidates.id INNER JOIN positions ON applications.positionId = positions.id";
        if (!utils.isEmpty(req.query)) {
            let where = " WHERE ";
            let count = 1;
            for(var param in req.query) {
                if (param == "candidate_address") {
                    param = "candidates.address";
                } else if (param == "candidate_city") {
                    param = "candidates.city";
                } else if (param == "candidate_state") {
                    param = "candidates.state";
                } else if (param == "candidate_zip") {
                    param = "candidates.zip";
                } else if (param == "position_address") {
                    param = "positions.address";
                } else if (param == "position_city") {
                    param = "positions.city";
                } else if (param == "position_state") {
                    param = "positions.state";
                } else if (param == "position_zip") {
                    param = "positions.zip";
                } else if (param == "id") {
                    param = "applications.id";
                }
                if (count > 1) {
                    where = where + " AND ";
                }
                where = where + param + " LIKE '%" + req.query[param] + "%'";
                count++;
            }
            sql = sql + where;
        }
        let query = db.query(sql, (err, result) => {
            if (err) {
                res.status(500).json(err);
            } else if (result === undefined || result.length == 0) {
                res.status(204).json(result);
            } else {
                res.status(200).json(result);
            }
        })
    };
};

exports.create = function(db) {
    return function(req, res, next) {
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
    };
};

exports.get_by_id = function(db) {
    return function(req, res, next) {
        let id = Number(req.params.applicationId);
        let sql = `SELECT applications.id, candidateId, positionId, firstName, middleName, lastName, email, title, dateApplied, summary, description, dateOpen, company, candidates.address AS candidate_address, candidates.city AS candidate_city, candidates.state AS candidate_state, candidates.zip AS candidate_zip, positions.address AS position_address, positions.city AS position_city, positions.state AS position_state, positions.zip AS position_zip FROM applications INNER JOIN candidates ON applications.candidateId = candidates.id INNER JOIN positions ON applications.positionId = positions.id WHERE applications.id = ${id};`;
        let query = db.query(sql, (err, result) => {
            if (err) {
                res.status(500).json(err);
            } else if (result === undefined || result.length == 0) {
                res.status(400).json({ errorMessage: 'Incorrect applicationId: ' + id });
            } else {
                res.status(200).json(result[0]);
            }
        })
    };
};

exports.delete = function(db) {
    return function(req, res, next) {
        let sql = 'DELETE FROM applications';
        if (!utils.isEmpty(req.query)) {
            let where = " WHERE ";
            let count = 1;
            for(var param in req.query) {
                if (count > 1) {
                    where = where + " AND ";
                }
                where = where + param + " = " + req.query[param];
                count++;
            }
            sql = sql + where;
        }
    	let query = db.query(sql, (err, result) => {
    		if (err) {
             res.status(500).json(err);
    		} else if (result.affectedRows == 0) {
                res.status(400).json();
            } else {
    		   res.status(204).json();
            }
    	})
    };
};

exports.update_by_id = function(db) {
    return function(req, res, next) {
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
    };
};

exports.delete_by_id = function(db) {
    return function(req, res, next) {
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
    };
};

exports.get_resume_by_application_id = function(db) {
    return function(req, res, next) {
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
    };
};

exports.create_resume_by_application_id = function(db) {
    return function(req, res, next) {
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
    };
};

exports.delete_resume_by_application_id = function(db) {
    return function(req, res, next) {
        let id = Number(req.params.applicationId);
        let sql = `UPDATE candidates SET resume = NULL WHERE candidates.id = (SELECT candidateId from applications WHERE applications.id = ${id});`;
        let query = db.query(sql, (err, result) => {
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
    };
};