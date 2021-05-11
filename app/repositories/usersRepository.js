const UsersRepository = module.exports;

const users = {
  caferrerb: {
    roles: ['admin', 'dev', 'qa'],
    password: '1234',
  },
  jusfe11: {
    roles: ['qa'],
    password: '4321',
  },
  quitian: {
    roles: ['dev'],
    password: '0987',
  },
};

UsersRepository.getUser = (user) => Promise.resolve(users[user]);
