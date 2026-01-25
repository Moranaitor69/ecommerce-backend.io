import express from 'express';
import mongoose from 'mongoose';
import passport from 'passport';
import cookieParser from 'cookie-parser'; // 👈
import router from './routes/index.js';
import config from './config/config.js';
import { initializePassport } from './config/passport.config.js';

const app = express();

app.use(express.json());
app.use(cookieParser()); // 👈 ESTO ES LA CLAVE

initializePassport();
app.use(passport.initialize());

mongoose.connect(config.MONGO_URL);

app.use(router);
app.use(express.static('src/public'));

export default app;
