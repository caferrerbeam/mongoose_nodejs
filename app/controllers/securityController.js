const SecurityController = module.exports;

const log4j = require('../utils/logger');
const LogUtils = require('../utils/LogUtils');
const SecurityService = require('../services/securityService');

SecurityController.login = (req, res, next) => {
  const logName = 'login';
  const logger = LogUtils.getLoggerWithId(log4j, logName);
  const { body } = req;
  logger.info('Starts SecurityController.login');

  return SecurityService.login(body.user, body.pass, { logger, logName })
    .then((response) => res.send(response))
    .catch((error) => {
      logger.error(`Error in SecurityController.login: ${error.message}`);

      return next(error);
    });
};

SecurityController.validateToken = (req, res, next) => {
  const logName = 'validate token';
  const logger = LogUtils.getLoggerWithId(log4j, logName);
  const { body } = req;
  logger.info('Starts SecurityController.validateToken');

  return SecurityService.validateToken(body.token, { logger, logName })
    .then((response) => res.send(response))
    .catch((error) => {
      logger.error(`Error in SecurityController.validateToken: ${error.message}`);

      return next(error);
    });
};
