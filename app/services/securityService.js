const SecurityService = module.exports;
const jwt = require('jsonwebtoken');
const UsersRepository = require('../repositories/usersRepository');
const { UnauthorizedError } = require('../utils/ErrorHandlerMiddleware');

const {
  JWT_SECRET,
  TOKEN_EXPIRATION = '1d',
} = process.env;

SecurityService.login = async (username, pass) => {
  const user = await UsersRepository.getUser(username);

  if (!user) throw new UnauthorizedError('invalid credentials');

  // hay que comparar las contrasenas encriptadas, aqui no estan asi...
  if (user.password !== pass) throw new UnauthorizedError('invalid credentials');

  const payload = {
    permissions: user.roles,
    user: username,
  };

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: TOKEN_EXPIRATION });

  return {
    token,
  };
};

SecurityService.validateToken = (token) => {
  try {
    const payload = jwt.verify(token, JWT_SECRET);

    console.log(payload);

    // creando promise
    return Promise.resolve(payload);
  } catch (error) {
    throw new UnauthorizedError('invalid token');
  }
};
