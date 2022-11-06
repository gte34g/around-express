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
const { validateUser, validateLogin } = require('./middlewares/validation');
const errorHandler = require('./middlewares/errorHandler');
const auth = require('./middlewares/auth');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const errorPage = require('./routes/noRoute');

const { login, createUser } = require('./controllers/users');

mongoose.connect('mongodb://localhost:27017/aroundb');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use(limiter);
app.use(cors());
app.options('*', cors());
app.use(helmet());
app.use(bodyParser.json());

app.use(requestLogger);

app.post('/signin', validateLogin, login);
app.post('/signup', validateUser, createUser);

app.use(auth);

app.use('/users', userRouter);
app.use('/cards', cardRouter);
app.use('/', errorPage);
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
