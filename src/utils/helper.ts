import jwt from 'jsonwebtoken';

const generateToken = (user: any) => {
  return jwt.sign({ id: user.id, email: user.email }, '12345678', {
    expiresIn: '1h'
  });
};

const verifyToken = (token: string) => {
  return jwt.verify(token, '12345678');
};

const comparePassword = async (password: string, hashPassword: string) => {
  return JSON.stringify(password) == JSON.stringify(hashPassword);
};

export default { generateToken, verifyToken, comparePassword };
