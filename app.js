const express = require('express');

const { PORT = 3000 } = process.env;

const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const noRoute = require('./routes/noRoute');

const app = express();
app.get('/', (req, res) => {
  res.send(`<html>
        <body>
          <p>Project 12 Around-express</p>
        </body>
        </html>`);
});

app.use('/users', userRouter);
app.use('/cards', cardRouter);
app.use('*', noRoute);
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening at port ${PORT}`);
});
