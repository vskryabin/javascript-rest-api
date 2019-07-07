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
        let sql = `SELECT id, email, firstName, middleName, lastName, address, city, state, zip, summary, role, password FROM candidates WHERE email = "${email}"`;
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
                res.status(200).send({ authenticated: true, token: token, issuedAt: currentTime, expiresAt: currentTime + expiresInSeconds });
            }
        })
    }
};

exports.verify = function(db) {
    return function(req, res, next) {
        let token = req.token;
        let expiresAt = req.expiresAt;
        let issuedAt = req.issuedAt;
        // let decodedToken = jwt.decode(token, {complete: true});
        let email = req.email;
        let sql = `SELECT id, email, firstName, middleName, lastName, address, city, state, zip, summary, role FROM candidates WHERE email = "${email}"`;
        let query = db.query(sql, (err, result) => {
            if (err) {
                res.status(500).json(err);
            } else if (result === undefined || result.length == 0) {
                res.status(400).json({ errorMessage: 'Incorrect email: ' + email });
            } else {
                // res.status(200).send(decodedToken);
                let verifiedResult = result[0];
                verifiedResult['token'] = token;
                verifiedResult['expiresAt'] = expiresAt;
                verifiedResult['issuedAt'] = issuedAt;
                res.status(200).json(verifiedResult);
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

exports.get_tokens = function(db) {
    return function(req, res, next) {
        if (!utils.isEmpty(global.jwt_tokens)) {
            res.status(200).json(global.jwt_tokens);
        } else {
            res.status(204).json();
        }
    }
};