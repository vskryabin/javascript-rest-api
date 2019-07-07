var jwt = require('jsonwebtoken');
var config = require('./config');

function verifyToken(req, res, next) {
  var token = req.headers['x-access-token'];
  if (!token) {
    return res.status(401).send({ authenticated: false, message: 'No x-access-token provided.' });
  }
  jwt.verify(token, config.secret, function(err, decoded) {
    if (err) {
        return res.status(401).send({ authenticated: false, message: 'Invalid token.' });
    }
    if (global.jwt_tokens[token] && !global.jwt_tokens[token].valid) {
        return res.status(401).send({ authenticated: false, message: 'Invalid token.' });
    }
    req.email = decoded.email;
    req.token = token;
    req.issuedAt = decoded.iat;
    req.expiresAt = decoded.exp;
    next();
  });
}

module.exports = verifyToken;