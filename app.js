const express = require('express');

const app = express();
const helmet = require('helmet');
const { errors } = require('celebrate');
const rateLimit = require('express-rate-limit');

const { PORT = 3000 } = process.env;
require('dotenv').config({ path: './.env' });
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');

const router = require('./routes/index');

mongoose.connect('mongodb://localhost:27017/aroundb');

app.use(requestLogger);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use(limiter);
app.use(express.json());
app.use(cors());
app.options('*', cors());
app.use(helmet());
app.use(bodyParser.json());

app.use(router);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Server will crash now');
  }, 0);
});

app.use(errorLogger);

app.use(errors());
app.use(errorHandler);
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening at port ${PORT}`);
});
