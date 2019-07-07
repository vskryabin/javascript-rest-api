'use strict';

var utils = require('../../config/utils');
var config = require('../../config/config');

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

exports.search = function(db) {
    return function(req, res, next) {
        let sql = "SELECT id, email, firstName, middleName, lastName, address, city, state, zip, summary, (SELECT COUNT(*) FROM applications WHERE applications.candidateId = candidates.id) AS positionsCount FROM candidates";
        if (!utils.isEmpty(req.query)) {
            let where = " WHERE ";
            let count = 1;
            for(var param in req.query) {
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
        let candidate = req.body;
        if (candidate['password'] && candidate['password'].trim()) {
            var hashedPassword = bcrypt.hashSync(candidate['password'].trim(), 8);
            candidate['password'] = hashedPassword;
            let sql = 'INSERT INTO candidates SET ?';
            let query = db.query(sql, candidate, (err, result) => {
                if (err) {
                    res.status(500).json(err);
                } else {
                    candidate['id'] = result.insertId;
                    res.status(201).json(candidate);
                }
            })
        } else {
            res.status(400).json({ errorMessage: 'Incorrect or empty password!'});
        }

    };
};

exports.get_by_id = function(db) {
    return function(req, res, next) {
        let id = Number(req.params.candidateId);
        let sql = `SELECT id, email, firstName, middleName, lastName, address, city, state, zip, summary, (SELECT COUNT(*) FROM applications WHERE applications.candidateId = candidates.id) AS candidatesCount FROM candidates WHERE id = ${id}`;
        let query = db.query(sql, (err, result) => {
            if (err) {
                res.status(500).json(err);
            } else if (result === undefined || result.length == 0) {
                res.status(400).json({ errorMessage: 'Incorrect candidateId: ' + id });
            } else {
                res.status(200).json(result[0]);
            }
        })
    };
};

exports.update_by_id = function(db) {
    return function(req, res, next) {
        let id = Number(req.params.candidateId);
        let candidate = req.body;
        var hashedPassword;

        if (candidate['password'] || candidate['password'] == '') {
            if (candidate['password'].trim()) {
                hashedPassword = bcrypt.hashSync(candidate['password'].trim(), 8);
                candidate['password'] = hashedPassword;
            } else {
                res.status(400).json({ errorMessage: 'Incorrect or empty password!'});
                return;
            }
        }
        let sql = `UPDATE candidates SET ? WHERE id = ${id}`;
        let query = db.query(sql, candidate, (err, result) => {
            if (err) {
                res.status(500).json(err);
            } else if (result === undefined || result.length == 0) {
                res.status(400).json({ errorMessage: 'Incorrect candidateId: ' + id });
            } else if (result.affectedRows == 0) {
                res.status(400).json({ errorMessage: 'Incorrect candidateId: ' + id });
            } else {
                candidate['id'] = Number(id);
                if (hashedPassword) {
                    candidate['password'] = hashedPassword; 
                }
                res.status(200).json(candidate);
            }
        })


    };
};

exports.delete_by_id = function(db) {
    return function(req, res, next) {
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
    };
};

exports.get_positions_by_candidate_id = function(db) {
    return function(req, res, next) {
        let candidateId = Number(req.params.candidateId);
        let sql = `SELECT positions.id, positions.title, positions.address, positions.city, positions.state, positions.zip, positions.description, positions.dateOpen, positions.company, (SELECT COUNT(*) FROM applications WHERE applications.positionId = positions.id) AS candidatesCount FROM positions INNER JOIN applications ON applications.positionId = positions.id WHERE applications.candidateId = ${candidateId};`;
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

exports.create_position_by_candidate_id = function(db) {
    return function(req, res, next) {
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
    };
};

exports.get_resume_by_candidate_id = function(db) {
    return function(req, res, next) {
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
    };
};

exports.create_resume_by_candidate_id = function(db) {
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
    };
};

exports.delete_resume_by_candidate_id = function(db) {
    return function(req, res, next) {
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
    };
};

exports.get_position_by_candidate_id_and_position_id = function(db) {
    return function(req, res, next) {
        let positionId = Number(req.params.positionId);
        let candidateId = Number(req.params.candidateId);
        let sql = `SELECT positions.id, positions.title, positions.address, positions.city, positions.state, positions.zip, positions.description, positions.dateOpen, positions.company, (SELECT COUNT(*) FROM applications WHERE applications.positionId = positions.id) AS candidatesCount FROM positions INNER JOIN applications ON applications.positionId = positions.id WHERE applications.candidateId = ${candidateId} AND applications.positionId = ${positionId};`;
        let query = db.query(sql, (err, result) => {
            if (err) {
                res.status(500).json(err);
            } else if (result === undefined || result.length == 0) {
                res.status(400).json({ errorMessage: 'Incorrect combination of candidateId: ' + candidateId + ' and positionId: ' + positionId });
            } else {
                res.status(200).json(result[0]);
            }
        })
    };
};