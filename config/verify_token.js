var jwt = require('jsonwebtoken');
var config = require('./config');

function verifyToken(req, res, next) {
  var authorization = req.headers['authorization'];
  if (!authorization) {
    authorization = req.headers['Authorization'];
  }
  if (!authorization) {
    return res.status(401).send({ authenticated: false, message: "No 'Authorization: Bearer {token}' header provided." });
  }
  var bearer = 'Bearer ';
  if (!(authorization.startsWith(bearer) || authorization.startsWith(bearer.toLowerCase()))) {
    return res.status(401).send({ authenticated: false, message: "Invalid Authorization: Not a 'Authorization: Bearer {token}' header" });
  }
  var token = authorization.substring(bearer.length, authorization.length);
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