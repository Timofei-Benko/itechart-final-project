const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = require('chai').expect;
const fetch = require('node-fetch');
const routes = require('../routes').users;

chai.use(chaiHttp);

const TEST_USER_DATA = {
    user: {
        firstName: 'TEST_USER',
        lastName: 'TEST_USER',
        email: 'testuser@test.com',
        password: 'testtest',
    }
};

describe('User suite', () => {
    describe('POST',() => {
        it('should sign up successfully',async () => {
            const response = await fetch(routes.signUp,
                {
                    method: 'POST',
                    body: JSON.stringify(TEST_USER_DATA),
                    headers: { 'Content-Type': 'application/json' }
                })
            const user = await response.json();
            expect(user).to.have.property('user');
            expect(user.user).not.to.have.property('passwordHash');
        });
    });
});