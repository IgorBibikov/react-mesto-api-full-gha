const express = require('express');
const mongoose = require('mongoose');

const { PORT = 4000 } = process.env;
const cookies = require('cookie-parser');

const { errors } = require('celebrate');
const { routes } = require('./routes/index');
const cors = require('cors');
// const cors = require('./middlewares/Cors');
const errorHandler = require('./middlewares/error-handler');

// Запуск приложения
const app = express();

// Подключение к базе данных
mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useUnifiedTopology: false,
});

// Middleware объединение пакетов bodynm
app.use(express.json());

app.use(cookies());

app.use(
  cors({
    origin: [
      'https://praktikum.tk',
      'http://praktikum.tk',
      'http://localhost:3000',
      'http://localhost:4000',
    ],
    credentials: true,
  })
);
app.use(routes);

app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Application is running on port ${PORT}...`);
});
