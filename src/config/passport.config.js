import passport from 'passport';
import local from 'passport-local';
import jwt from 'passport-jwt';
import bcrypt from 'bcrypt';
import User from '../models/user.model.js';
import config from './config.js';

const LocalStrategy = local.Strategy;
const JWTStrategy = jwt.Strategy;

/* 👇 FUNCIÓN PARA LEER JWT DESDE COOKIE */
const cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies.jwt;
  }
  return token;
};

const initializePassport = () => {

  /* ================= LOGIN ================= */

  passport.use(
    'login',
    new LocalStrategy(
      { usernameField: 'email' },
      async (email, password, done) => {
        try {
          const user = await User.findOne({ email });

          if (!user) {
            console.log(" Usuario no encontrado");
            return done(null, false, { message: 'Usuario no encontrado' });
          }

          

          const isValid = await bcrypt.compare(password, user.password);

          
          if (!isValid) {
            return done(null, false, { message: 'Contraseña incorrecta' });
          }

         
          return done(null, user);

        } catch (error) {
          return done(error);
        }
      }
    )
  );

  /* ================= JWT ================= */

  passport.use(
    'jwt',
    new JWTStrategy(
      {
        jwtFromRequest: cookieExtractor,
        secretOrKey: config.JWT_SECRET
      },
      async (jwt_payload, done) => {
        try {
          const user = await User.findById(jwt_payload.id);

          if (!user) {
            return done(null, false);
          }

          return done(null, user);

        } catch (error) {
          return done(error, false);
        }
      }
    )
  );
};

export default initializePassport;