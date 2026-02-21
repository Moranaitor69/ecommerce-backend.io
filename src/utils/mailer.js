import nodemailer from 'nodemailer';
import config from '../config/config.js';

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: config.MAIL_USER,
    pass: config.MAIL_PASS
  }
});