const LogUtils = module.exports;
const { v4 } = require('uuid');

LogUtils.getLoggerWithId = (log4j, logName) => {
  const transactionId = v4();

  return log4j.getLogger(`[${logName}] ${transactionId}`);
};
