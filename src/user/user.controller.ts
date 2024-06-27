import pgClient from '../api-client';
import helper from '../utils/helper';
const { generateToken, comparePassword } = helper;

const getAllUsers = async (req: any, res: any, next: any) => {
  const limit = parseInt(req.query.limit) || 10;
  const offset = parseInt(req.query.offset) || 0;
  try {
    const result = await pgClient.query(
      'SELECT * FROM users LIMIT $1 OFFSET $2',
      [limit, offset]
    );
    res.send(result.rows);
    return next();
  } catch (err: any) {
    res.send(500, { error: err.message });
    return next(err);
  }
};

const createUser = async (req: any, res: any, next: any) => {
  try {
    const { username, password, email, bio } = req.body;
    const result = await pgClient.query(
      'INSERT INTO users (username, password, email,bio) VALUES ($1, $2, $3,$4) RETURNING *',
      [username, password, email, bio]
    );

    res.send(201, result.rows[0]);
    return next();
  } catch (err: any) {
    res.send(500, { error: err.message });
    return next(err);
  }
};

const getUserById = async (req: any, res: any, next: any) => {
  const { id } = req.params;
  try {
    const result = await pgClient.query('SELECT * FROM users WHERE id = $1', [
      id
    ]);
    if (result.rows.length === 0) {
      res.send(404, { error: 'User not found' });
    } else {
      res.send(result.rows[0]);
    }
    return next();
  } catch (err: any) {
    res.send(500, { error: err.message });
    return next(err);
  }
};

const updateUser = async (req: any, res: any, next: any) => {
  const { id } = req.params;
  const { username, email, bio } = req.body;
  try {
    const result = await pgClient.query(
      'UPDATE users SET username = $1, email = $2, bio = $3 WHERE id = $4 RETURNING *',
      [username, email, bio, id]
    );
    if (result.rows.length === 0) {
      res.send(404, { error: 'User not found' });
    } else {
      res.send(result.rows[0]);
    }
    return next();
  } catch (err: any) {
    res.send(500, { error: err.message });
    return next(err);
  }
};

const deleteUser = async (req: any, res: any, next: any) => {
  const { id } = req.params;
  try {
    const result = await pgClient.query(
      'DELETE FROM users WHERE id = $1 RETURNING *',
      [id]
    );
    if (result.rows.length === 0) {
      res.send(404, { error: 'User not found' });
    } else {
      res.send(204);
    }
    return next();
  } catch (err: any) {
    res.send(500, { error: err.message });
    return next(err);
  }
};

const loginUser = async (req: any, res: any, next: any) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.send(500, { message: 'Email and password are required.' });
    return next();
  }

  try {
    //  validateLogin(req.body);
    const result = await pgClient.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );

    if (result.rows.length === 0) {
      res.send(404, { error: 'User not found' });
      return next();
    }

    const user = result.rows[0];

    // if (!user.is_email_verified) {
    //   res.send(500, { error: 'Email not verified' });
    // return next();

    // }

    const match = await comparePassword(password, user.password);
    if (!match) {
      res.send(500, { error: 'Please enter correct password' });
      return next();
    }

    const token = generateToken(user);
    // const refreshToken = signRefreshToken(user._id);
    //NOTE: 604800000 ms is equal to 7 days. So, the expiry date of the token is 7 days after.

    await pgClient.query(
      'INSERT INTO user_sessions (user_id, token) VALUES ($1, $2)',
      [user.id, token]
    );
    res.send(200, { message: 'Login successful.', token });
    return next();
  } catch (err: any) {
    res.send(500, { error: err.message });
    return next(err);
  }
};

const logoutUser = async (req: any, res: any, next: any) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader.split(' ')[1];
  try {
    await pgClient.query('DELETE FROM user_sessions WHERE token = $1', [token]);
    res.send(200, { message: 'Logout successful.' });
    return next();
  } catch (err: any) {
    res.send(500, { message: 'Error logging out.', error: err.message });
    return next(err);
  }
};

const forgotPassword = async (req: any, res: any, next: any) => {
  try {
    res.send(200, { message: 'Email sent successfully' });
    return next();
  } catch (err: any) {
    res.send(500, { error: err.message });
    return next(err);
  }
};

const verifyEmail = async (req: any, res: any, next: any) => {
  const { id } = req.body;
  try {
    const result = await pgClient.query(
      'UPDATE users SET is_email_verified = TRUE WHERE id = $1 RETURNING *',
      [id]
    );
    res.send(200, { message: 'Email verified successfully' });
    return next();
  } catch (err: any) {
    res.send(500, { error: err.message });
    return next(err);
  }
};

const updateProfilePic = async (req: any, res: any, next: any) => {
  const { id } = req.body;
  try {
    // const result = await pgClient.query(
    //   'UPDATE users SET is_email_verified = TRUE WHERE id = $1 RETURNING *',
    //   [id]
    // );
    // res.send(200, { message: 'Profile updated successfully' });
    return next();
  } catch (err: any) {
    res.send(500, { error: err.message });
    return next(err);
  }
};

export default {
  getAllUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  loginUser,
  logoutUser,
  forgotPassword,
  verifyEmail,
  updateProfilePic
};
