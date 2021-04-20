const PersonController = module.exports;

const log4j = require('../utils/logger');
const LogUtils = require('../utils/LogUtils');
const PersonService = require('../services/personService');

PersonController.create = (req, res, next) => {
  const logName = 'createPerson';
  const logger = LogUtils.getLoggerWithId(log4j, logName);
  const { body } = req;
  logger.info(`Starts ShoppersController.createShopper: ${JSON.stringify(body)}`);

  return PersonService.create(body, { logger, logName })
    .then((response) => res.send(response))
    .catch((error) => {
      logger.error(`Error in PersonController.create: ${error.message}`);

      return next(error);
    });
};

PersonController.find = (req, res, next) => {
  const logName = 'createPerson';
  const logger = LogUtils.getLoggerWithId(log4j, logName);
  const { params } = req;
  logger.info(`Starts ShoppersController.createShopper: ${JSON.stringify(params)}`);

  return PersonService.findById(params.id, { logger, logName })
    .then((response) => res.send(response))
    .catch((error) => {
      logger.error(`Error in  PersonController.find: ${error.message}`);

      return next(error);
    });
};
