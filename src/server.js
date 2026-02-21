import app from './app.js';
import config from './config/config.js';
import dotenv from 'dotenv';

dotenv.config();

app.listen(config.PORT, () => {
  console.log('Server running on port ' + config.PORT);
});