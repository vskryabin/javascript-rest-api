'use strict';

var utils = require('../../config/utils');
var config = require('../../config/config');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');


exports.register = function(db) {
    return function(req, res, next) {
        var candidate = {};
        candidate['email'] = req.body.email;
        candidate['password'] = req.body.password;
        if (candidate['password'] && candidate['password'].trim()) {
            var hashedPassword = bcrypt.hashSync(candidate['password'].trim(), 8);
            console.log(hashedPassword);
            candidate['password'] = hashedPassword;
            let sql = `UPDATE candidates SET ? WHERE email = "${candidate['email']}"`;
            let query = db.query(sql, candidate, (err, result) => {
                if (err) {
                    res.status(500).json(err);
                } else if (result === undefined || result.length == 0) {
                    res.status(400).json({ errorMessage: 'Incorrect email: ' + candidate['email'] });
                } else if (result.affectedRows == 0) {
                    res.status(400).json({ errorMessage: 'Incorrect email: ' + candidate['email'] });
                } else {
                    res.status(200).json(candidate);
                }
            })
        } else {
            res.status(400).json({ errorMessage: 'Incorrect or empty password!'});
            return;
        }
    };
};

exports.login = function(db) {
    return function(req, res, next) {
        var email = req.body.email;
        var password = req.body.password;
        let sql = `SELECT id, name, address, summary, password FROM candidates WHERE email = "${email}"`;
        let query = db.query(sql, (err, result) => {
            if (err) {
                res.status(500).json(err);
            } else if (result === undefined || result.length == 0) {
                res.status(400).json({ errorMessage: 'Incorrect email: ' + email });
            } else {
                var candidate = result[0];
                var passwordIsValid = bcrypt.compareSync(password, candidate.password);
                if (!passwordIsValid) { 
                    return res.status(401).send({ authenticated: false, token: null });
                }
                var expiresInSeconds = 86400; // 1 day
                var currentTime = Math.floor(Date.now() / 1000);
                var token = jwt.sign({ email: email }, config.secret, {
                    expiresIn: expiresInSeconds 
                });
                for (var jwt_token in global.jwt_tokens) {
                    if (currentTime > global.jwt_tokens[jwt_token].exp) {
                        delete global.jwt_tokens[jwt_token];
                    }
                }
                global.jwt_tokens[token] = {valid: true, iat: currentTime, exp: currentTime + expiresInSeconds};
                res.status(200).send({ authenticated: true, token: token });
            }
        })
    }
};

exports.verify = function(db) {
    return function(req, res, next) {
        let email = req.email;
        let sql = `SELECT id, name, address, summary FROM candidates WHERE email = "${email}"`;
        let query = db.query(sql, (err, result) => {
            if (err) {
                res.status(500).json(err);
            } else if (result === undefined || result.length == 0) {
                res.status(400).json({ errorMessage: 'Incorrect email: ' + email });
            } else {
                // res.status(200).send(decoded);
                res.status(200).json(result[0]);
            }
        })
    }
};

exports.logout = function(db) {
    return function(req, res, next) {
        if (global.jwt_tokens[req.token]) {
             global.jwt_tokens[req.token].valid = false;
        }
        res.status(200).send({ authenticated: false, token: null });
    }
};
