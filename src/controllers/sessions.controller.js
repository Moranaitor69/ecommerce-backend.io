import jwt from 'jsonwebtoken';
import config from '../config/config.js';

export const login = (req, res) => {
  const user = req.user;

  const token = jwt.sign(
    { id: user._id, role: user.role, email: user.email },
    config.JWT_SECRET,
    { expiresIn: '1h' }
  );

  res.cookie('jwt', token, {
    httpOnly: true
  });

  res.json({
    status: 'success',
    message: 'Autorizado'
  });
};

export const current = (req, res) => {
  res.json({
    status: 'success',
    user: req.user
  });
};
