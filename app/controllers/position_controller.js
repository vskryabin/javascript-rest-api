'use strict';

var utils = require('../../config/utils');

exports.search = function(db) {
    return function(req, res, next) {
    	let sql = "SELECT id, title, address, city, state, zip, description, DATE_FORMAT(dateOpen, '%Y-%m-%d') AS dateOpen, company, (SELECT COUNT(*) FROM applications WHERE applications.positionId = positions.id) AS candidatesCount FROM positions";
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
    };
};

exports.get_by_id = function(db) {
    return function(req, res, next) {
    	let id = Number(req.params.positionId);
    	let sql = `SELECT id, title, address, city, state, zip, description, DATE_FORMAT(dateOpen, '%Y-%m-%d') AS dateOpen, company, (SELECT COUNT(*) FROM applications WHERE applications.positionId = positions.id) AS candidatesCount FROM positions WHERE id = ${id}`;
    	let query = db.query(sql, (err, result) => {
    		if (err) {
                res.status(500).json(err);
    		} else if (result === undefined || result.length == 0) {
                res.status(400).json({ errorMessage: 'Incorrect positionId: ' + id });
            } else {
    		    res.status(200).json(result[0]);
            }
    	})
    };
};

exports.update_by_id = function(db) {
    return function(req, res, next) {
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
    };
};

exports.delete_by_id = function(db) {
    return function(req, res, next) {
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
    };
};


exports.get_candidates_by_position_id = function(db) {
    return function(req, res, next) {
        let positionId = Number(req.params.positionId);
        let sql = `SELECT candidates.id, candidates.email, candidates.firstName, candidates.middleName, candidates.lastName, candidates.address, candidates.city, candidates.state, candidates.zip, candidates.summary, (SELECT COUNT(*) FROM applications WHERE applications.candidateId = candidates.id) AS positionsCount FROM candidates INNER JOIN applications ON applications.candidateId = candidates.id WHERE applications.positionId = ${positionId};`;
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

exports.create_candidate_by_position_id = function(db) {
    return function(req, res, next) {
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
    };
};

exports.get_candidate_by_position_id_and_candidate_id = function(db) {
    return function(req, res, next) {
        let positionId = Number(req.params.positionId);
        let candidateId = Number(req.params.candidateId);
        let sql = `SELECT candidates.id, candidates.email, candidates.firstName, candidates.middleName, candidates.lastName, candidates.address, candidates.city, candidates.state, candidates.zip, candidates.summary, (SELECT COUNT(*) FROM applications WHERE applications.candidateId = candidates.id) AS positionsCount FROM candidates INNER JOIN applications ON applications.candidateId = candidates.id WHERE applications.positionId = ${positionId} AND applications.candidateId = ${candidateId};`;
        let query = db.query(sql, (err, result) => {
            if (err) {
                res.status(500).json(err);
            } else if (result === undefined || result.length == 0) {
                res.status(400).json({ errorMessage: 'Incorrect combination of positionId: ' + positionId + ' and candidateId: ' + candidateId });
            } else {
                res.status(200).json(result[0]);
            }
        })
    };
};