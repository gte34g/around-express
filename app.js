const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { errors } = require('celebrate');
require('dotenv').config({ path: './.env' });
const { celebrate, Joi } = require('celebrate');

const bodyParser = require('body-parser');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

const app = express();

const { PORT = 3000 } = process.env;

const { requestLogger, errorLogger } = require('./middlewares/logger');
// const { validateUser, validateLogin } = require('./middlewares/validation');
const errorHandler = require('./middlewares/errorHandler');
// const auth = require('./middlewares/auth');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const noRoute = require('./routes/noRoute');

const { login, createUser } = require('./controllers/users');

mongoose.connect('mongodb://localhost:27017/aroundb');

app.use(limiter);
app.use(cors());
app.options('*', cors());
app.use(helmet());
app.use(bodyParser.json());

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Server will crash now');
  }, 0);
});

app.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().uri(),
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  login,
);

app.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().uri(),
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  createUser,
);

// app.use(auth);

app.use('/users', userRouter);
app.use('/cards', cardRouter);
app.use('*', noRoute);

app.use(errorLogger);

app.use(errors());
app.use(errorHandler);
app.listen(PORT);
