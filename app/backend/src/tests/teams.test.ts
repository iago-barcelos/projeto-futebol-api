import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { App } from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';
import SequelizeTeam from '../database/models/SequelizeTeam';
import { afterEach } from 'mocha';

chai.use(chaiHttp);

const { expect } = chai;

const { app } = new App();

describe('Teams teste', function() {
  /**
   * Exemplo do uso de stubs com tipos
   */

  // let chaiHttpResponse: Response;

  // before(async () => {
  //   sinon
  //     .stub(Example, "findOne")
  //     .resolves({
  //       ...<Seu mock>
  //     } as Example);
  // });

  // after(()=>{
  //   (Example.findOne as sinon.SinonStub).restore();
  // })

  // it('...', async () => {
  //   chaiHttpResponse = await chai
  //      .request(app)
  //      ...

  //   expect(...)
  // });

  it('Deve retornar status 200 e todos os teams', async function() {
    sinon.stub(SequelizeTeam, 'findAll').resolves(getAllTeamsMock as any);

    const { status, body } = await chai.request(app).get('/teams');

    expect(status).to.be.equal(200);
    expect(body).to.be.deep.equal(getAllTeamsMock);
  });

  it('Deve retornar status 200 e um time por ID', async function() {
    sinon.stub(SequelizeTeam, 'findOne').resolves(getTeamByIdMock as any);

    const { status, body } = await chai.request(app).get('/teams/1');

    expect(status).to.be.equal(200);
    expect(body).to.be.deep.equal(getTeamByIdMock);
  });

  it('Deve retornar status 404 caso não encontre um time pelo ID', async function() {
    sinon.stub(SequelizeTeam, 'findOne').resolves(null);

    const { status, body } = await chai.request(app).get('/teams/1');

    expect(status).to.be.equal(404);
    expect(body.message).to.be.equal('team 1 not found');
  });

  afterEach(() => {
    sinon.restore()
  })
});
