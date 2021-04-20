const DBHelper = module.exports;
const Persona = require('../app/model/persona');

DBHelper.clearAll = async () => {
  await Persona.remove({});
};
