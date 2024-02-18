import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { App } from '../app';
import { afterEach } from 'mocha';
import SequelizeUser from '../database/models/SequelizeUser';
import userMocks from './mocks/user.mock';
import UserService from '../services/UserService';

chai.use(chaiHttp);

const { expect } = chai;

const { app } = new App();

describe('/login testes', function () {
  /* it('Deve retornar status 200 e um token, caso email e senha sejam válidos', async function () {
    const foundUser = sinon.stub(SequelizeUser, 'findOne').resolves(userMocks.validUserAtDb as any);

    console.log('FOUND USER: ', foundUser)

    const { status, body } = await chai.request(app).post('/login');
    console.log('CONTEÚDO DO BODY: ' , body)

    expect(status).to.be.equal(200);
    expect(body).to.be.deep.equal(userMocks.tokenMock);
  }) */
  
  afterEach(() => {
    sinon.restore()
  })
})