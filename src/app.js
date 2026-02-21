import express from 'express';
import passport from 'passport';
import initializePassport from './config/passport.config.js';
import cookieParser from 'cookie-parser';
import config from './config/config.js';
import mongoose from 'mongoose';
import sessionsRouter from './routes/sessions.router.js';


const app = express();

mongoose.connect(config.MONGO_URL)
  .then(() => console.log('✅ Conectado a MongoDB'))
  .catch(err => console.log('❌ Error MongoDB:', err));


app.use(express.json());
app.use(cookieParser());

initializePassport();
app.use(passport.initialize());


app.use('/api/sessions', sessionsRouter);

export default app;