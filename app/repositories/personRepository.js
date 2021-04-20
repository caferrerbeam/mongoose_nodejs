const PersonaRepository = module.exports;

const mongoose = require('mongoose');
const Persona = require('../model/persona');

PersonaRepository.find = (id) => {
  // const objectId = mongoose.Types.ObjectId(id);
  const query = Persona.findById(id);

  return query.exec();
};

PersonaRepository.findByEmail = (email) => {
  const query = Persona.where({ email });

  return query.exec();
};

PersonaRepository.create = (person) => {
  const entity = new Persona(person);

  return entity.save();
};
