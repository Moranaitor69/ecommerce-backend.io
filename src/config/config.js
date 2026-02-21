import dotenv from 'dotenv';
dotenv.config();

export default {
  PORT: process.env.PORT,
  MONGO_URL: process.env.MONGO_URL,
  JWT_SECRET: process.env.JWT_SECRET,
  MAIL_USER: process.env.MAIL_USER,
  MAIL_PASS: process.env.MAIL_PASS,
  JWT_RESET_SECRET: process.env.JWT_RESET_SECRET,
  FRONT_URL: process.env.FRONT_URL
};
