import { Router } from 'express';
import passport from 'passport';
import User from '../models/user.model.js';
import { createHash } from '../utils/bcrypt.js';
import { login, current } from '../controllers/sessions.controller.js';

const router = Router();

/* ---------- LOGIN ---------- */
router.post(
  '/login',
  (req, res, next) => {
    passport.authenticate('login', { session: false }, (err, user) => {
      if (err || !user) {
        return res.status(401).json({
          status: 'error',
          message: 'Credenciales inválidas'
        });
      }

      req.user = user;
      next();
    })(req, res, next);
  },
  login
);


router.get(
  '/current',
  passport.authenticate('jwt', { session: false }),
  current
);


router.post('/register', async (req, res) => {
  try {
    const { first_name, last_name, email, age, password } = req.body;

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({
        status: 'error',
        message: 'User already exists'
      });
    }

    const newUser = {
      first_name,
      last_name,
      email,
      age,
      password: createHash(password),
      role: 'user'
    };

    await User.create(newUser);

    res.status(201).json({
      status: 'success',
      message: 'User registered'
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      error: error.message
    });
  }
});

export default router;
