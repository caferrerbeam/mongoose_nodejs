const chai = require('chai');

const { assert } = chai; // Using Assert style
const chaiHttp = require('chai-http');
const app = require('../../index');
const DBHelper = require('../DBHelper');
const PersonaRepository = require('../../app/repositories/personRepository');

const API = '/api/people';
chai.use(chaiHttp);

describe('Shopper CRUD flows', () => {
  beforeEach(async () => {
    await DBHelper.clearAll();
  });

  // Test for search shopper for id
  it('create person validation success', async () => chai
    .request(app)
    .post(`${API}/persons`)
    .send({
      name: 'camilo',
      lastName: 'ferrer',
      email: 'caferrerb3@gmail.com',
      friends: [{
        name: 'juan',
        email: 'juna@juan.com',
        phoneNumber: '0180980',
      }],
    })
    .then(async (response) => {
      const { body, status } = response;
      const { _id: id } = body;
      assert.strictEqual(status, 200);

      const person = await PersonaRepository.find(id);

      assert.isNotNull(person);
      assert.strictEqual(person.name, 'camilo');
    }));

  it('create person email validation success', async () => {
    const data = {
      name: 'camilo',
      lastName: 'ferrer',
      email: 'caferrerb3@gmail.com',
      friends: [{
        name: 'juan',
        email: 'juna@juan.com',
        phoneNumber: '0180980',
      }],
    };

    await PersonaRepository.create(data);

    return chai
      .request(app)
      .post(`${API}/persons`)
      .send(data).then(async (response) => {
        const { body, status } = response;
        assert.equal(status, 412);
        assert.deepEqual(body, {
          error: {
            message: 'email already taken',
            code: 412,
          },
        });
      });
  });

  it.only('find person by id success', async () => {
    const data = {
      name: 'camilo',
      lastName: 'ferrer',
      email: 'caferrerb3@gmail.com',
      friends: [{
        name: 'juan',
        email: 'juna@juan.com',
        phoneNumber: '0180980',
      }],
    };

    const person = await PersonaRepository.create(data);

    return chai
      .request(app)
      .get(`${API}/persons/${person.id}`)
      .then(async (response) => {
        const { body, status } = response;
        assert.equal(status, 200);
        assert.equal(data.email, body.email);
        assert.equal(data.name, body.name);
        assert.equal(data.lastName, body.lastName);
      });
  });

  it('find person by id not found', async () => chai
    .request(app)
    .get(`${API}/persons/1`)
    .then(async (response) => {
      const { body, status } = response;
      assert.equal(status, 404);
      assert.deepEqual(body, {});
    }));
});
