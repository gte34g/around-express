const express = require('express');

const app = express();
const helmet = require('helmet');

const { PORT = 3000 } = process.env;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const noRoute = require('./routes/noRoute');

mongoose.connect('mongodb://localhost:27017/aroundb');

app.use((req, res, next) => {
  req.user = {
    _id: '63146a7de0c981e8ac325d6e',
  };

  next();
});
app.use(bodyParser.json());
app.use(helmet());
app.use('/users', userRouter);
app.use('/cards', cardRouter);
app.use((req, res) => {
  res.status(404).send({ message: `Route ${req.url} Not found. ` });
});
app.use('*', noRoute);
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening at port ${PORT}`);
});
