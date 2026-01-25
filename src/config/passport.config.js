import passport from 'passport';
import local from 'passport-local';
import jwt from 'passport-jwt';
import User from '../models/user.model.js';
import { isValidPassword } from '../utils/bcrypt.js';
import config from './config.js';

const LocalStrategy = local.Strategy;
const JWTStrategy = jwt.Strategy;

/* 👇 FUNCIÓN PARA LEER JWT DESDE COOKIE */
const cookieExtractor = req => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies.jwt;
  }
  return token;
};

export const initializePassport = () => {
  passport.use(
    'login',
    new LocalStrategy(
      { usernameField: 'email' },
      async (email, password, done) => {
        const user = await User.findOne({ email });
        if (!user) return done(null, false);

        if (!isValidPassword(user, password)) return done(null, false);

        return done(null, user);
      }
    )
  );

  passport.use(
    'jwt',
    new JWTStrategy(
      {
        jwtFromRequest: cookieExtractor, // 👈 CLAVE
        secretOrKey: config.JWT_SECRET
      },
      async (jwt_payload, done) => {
        const user = await User.findById(jwt_payload.id);
        return done(null, user);
      }
    )
  );
};
