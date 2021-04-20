const PersonService = module.exports;

const { NotFoundError, BusinessError } = require('../utils/ErrorHandlerMiddleware');
const PersonaRepository = require('../repositories/personRepository');

PersonService.findById = async (id) => {
  const person = await PersonaRepository.find(id);

  if (!person) {
    throw new NotFoundError('person not found');
  }

  return person;
};

PersonService.create = async (person) => {
  const personByEmail = await PersonaRepository.findByEmail(person.email);

  if (personByEmail.length > 0) {
    throw new BusinessError('email already taken');
  }

  return PersonaRepository.create(person);
};
