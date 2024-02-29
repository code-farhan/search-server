let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
chai.use(chaiHttp);
let server = require('../app');
let config = require("../src/config/config");
let serversObj = config.test;

describe('Find Server', () => {
    let path = "/server/get";
    describe('/GET server/get', () => {
        it('it should GET available server with least priority number', (done) => {
            chai.request(server)
                .get(path)
                .send(serversObj)
                .end((error, res) => {
                    if (error) {
                        console.log(error)
                        done(error);
                    }
                    (res).should.have.status(200);
                    (res.body).should.be.a('object');
                    done();
                    process.exit()
                });
        });
    });
});