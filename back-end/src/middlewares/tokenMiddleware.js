require('dotenv').config();
const jwt = require('jsonwebtoken');
const fs = require('fs');
const { getUserByName } = require('../services/users');

const SECRET = fs
  .readFileSync('jwt.evaluation.key', { encoding: 'utf-8' })
  .trim();

const validateToken = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ message: 'missing auth token' });
  try {
    console.log('entrei no try');
    const { data } = jwt.verify(token, SECRET);
    console.log('data:', data);
    const user = await getUserByName(data.name);
    console.log('user:', user);
    req.user = user;
    console.log('req.user:', req.user);
    next();
  } catch (error) {
    return res.status(401).json({ message: 'jwt malformed' });
  }
};

module.exports = {
  validateToken,
};
