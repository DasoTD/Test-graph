const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

// retrieve env vars
dotenv.config();


const saltRounds = process.env.saltRounds;

class Auth {
  constructor() {}

  static async hashPassword(password) {
    const salt = bcrypt.genSaltSync(saltRounds);
    return bcrypt.hashSync(password, salt);
  }

  static async matchPasswords(password, userPassword) {
    return bcrypt.compare(password, userPassword)
  }

  static generateJwt({ userId, email }) {
    return jwt.sign(
      { userId, email },
      process.env.TOKEN_SECRET,
      { expiresIn: '3 days' }
    )
  }

  static getJwtPayload(token) {
    return jwt.verify(token, process.env.TOKEN_SECRET);
  }

  static getUserId({ req = {}, authToken = '' }) {
    if (req.request?.headers) {
      const authHeader = req.request.headers.authorization
      if (authHeader) {
        const token = authHeader.replace('Bearer ', '')
        if (!token) {
          return null
        }
        const { userId } = this.getJwtPayload(token)
        return userId;
      }
    } else if (authToken) {
      const { userId } = this.getJwtPayload(authToken)
      return userId
    }
  
    return null
  }
}

module.exports = Auth