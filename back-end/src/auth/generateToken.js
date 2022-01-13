require('dotenv').config();
const jwt = require('jsonwebtoken');
const fs = require('fs');

const key = 'jwt.evaluation.key';

const SECRET = fs.readFileSync(key, 'utf8', (_e, data) => data).trim();

const jwtConfiguration = {
expiresIn: '1d',
algorithm: 'HS256',
};

const generateToken = (data) => jwt.sign({ data }, SECRET, jwtConfiguration);

module.exports = generateToken; 