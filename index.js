const express = require('express');
require('dotenv').config();
const log4js = require('log4js');
const routes = require('./app/controllers/routes');
const { ErrorHandler } = require('./app/utils/ErrorHandlerMiddleware');
const { PREFIX } = require('./app/config/AppConfig');
const DB = require('./app/config/database');

const app = express();
const { PORT = 3000 } = process.env;

app.use(express.json());

const logger = log4js.getLogger('people-ms');
process.on('unhandledRejection', (reason, p) => {
  logger.error('Unhandled Rejection at: Promise', p, 'reason:', reason);
  logger.error(reason.stack);
});

app.use(PREFIX, routes);
app.use(ErrorHandler);

app.listen(PORT, () => {
  console.log('Escuchando puerto:', PORT);
  DB.connect().then('connection succesfull');
});

module.exports = app;
