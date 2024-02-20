import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { App } from '../app';
import { afterEach } from 'mocha';
import SequelizeUser from '../database/models/SequelizeUser';
import userMocks from './mocks/user.mock';
import * as jwt from 'jsonwebtoken';
import UserValidation from '../middlewares/loginValidation';
import Token from '../middlewares/tokenValidation';

chai.use(chaiHttp);

const { expect } = chai;

const { app } = new App();

describe('/login testes', function () {
  it('Deve retornar status 200 e um token, caso email e senha sejam válidos', async function () {
    sinon.stub(SequelizeUser, 'findOne').resolves(userMocks.validUserAtDb as any);
    
    const { status, body } = await chai.request(app).post('/login').send(userMocks.validLoginMock);
    
    sinon.stub(Token, 'validate').callsFake((req, res, next) => next());
    
    expect(status).to.be.equal(200);
    expect(body).to.have.property('token')
  })
  
  afterEach(() => {
    sinon.restore()
  })
})