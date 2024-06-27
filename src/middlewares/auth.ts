// import { User, Token } from '../../../models/index.js';
// import { errorHelper } from '../../../utils/index.js';
// import { jwtSecretKey } from '../../../config/index.js';
// import pkg from 'mongoose';
// const { Types } = pkg;
import jwt from 'jsonwebtoken';
const { verify } = jwt;

export default async (req: any, res: any, next: any) => {
  let token = req.header('Authorization');
  if (!token) {
    res.send(403, { message: 'No token provided' });
    return next(false);
  }

  jwt.verify(token, '12321321', (err: any, decoded: any) => {
    if (err) {
      res.send(401, { message: 'Unauthorized' });
      return next();
    }
    req.userId = decoded.id;
    req.userRole = decoded.role;
    next();
  });
};
