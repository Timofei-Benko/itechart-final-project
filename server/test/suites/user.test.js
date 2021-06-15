const expect = require('chai').expect;
const request = require('node-fetch');
const routes = require('../routes').users;

const TEST_USER_DATA = {
    user: {
        firstName: 'TEST_USER',
        lastName: 'TEST_USER',
        email: 'testuser@test.com',
        password: 'testtest',
        username: 'TEST',
        position: 'TEST',
        experience: 4,
        languages: ['TEST', 'TEST', 'TEST']
    }
};

describe('User suite', () => {
    let userId, token;
    const NONEXISTENT_USER_ID = '60c37aa8d7c69c566e1e7f53';

    describe('POST',() => {
        it('should return error if email format is incorrect', async () => {
            const response = await request(routes.signUp, {
                method: 'POST',
                body: JSON.stringify({ user: { ...TEST_USER_DATA.user, email: 'bad_email_format' } }),
                headers: { 'Content-Type': 'application/json' },
            });
            const responseBody = await response.json();
            expect(response.status).to.equal(422);
            expect(responseBody).to.have.property('error');
        });

        it('should return error if password format is incorrect', async () => {
            const response = await request(routes.signUp, {
                method: 'POST',
                body: JSON.stringify({ user: { ...TEST_USER_DATA.user, password: 'bad' } }),
                headers: { 'Content-Type': 'application/json' },
            });
            const responseBody = await response.json();
            expect(response.status).to.equal(422);
            expect(responseBody).to.have.property('error');
        });

        it('should sign up successfully',async () => {
            const response = await request(routes.signUp, {
                method: 'POST',
                body: JSON.stringify(TEST_USER_DATA),
                headers: { 'Content-Type': 'application/json' },
            });
            const responseBody = await response.json();
            expect(response.status).to.equal(201);
            expect(responseBody).to.have.property('user');
            expect(responseBody.user).not.to.have.property('passwordHash');
            // set userId for later tests and clean up
            userId = responseBody.user._id.toString();
        });

        it('should return error if user already exists',async () => {
            const response = await request(routes.signUp, {
                method: 'POST',
                body: JSON.stringify(TEST_USER_DATA),
                headers: { 'Content-Type': 'application/json' },
            });
            const responseBody = await response.json();
            expect(response.status).to.equal(409);
            expect(responseBody).to.have.property('error');
        });

        it('should return error if user doesn\'t exist', async () => {
            const response = await request(routes.signIn, {
                method: 'POST',
                body: JSON.stringify({ user: { ...TEST_USER_DATA.user, email: 'nonexistent@test.com' } }),
                headers: { 'Content-Type': 'application/json' },
            });
            const responseBody = await response.json();
            expect(response.status).to.equal(404);
            expect(responseBody).to.have.property('error');
        });

        it('should return error if password is incorrect', async () => {
            const response = await request(routes.signIn, {
                method: 'POST',
                body: JSON.stringify({ user: { ...TEST_USER_DATA.user, password: 'incorrect_password' } }),
                headers: { 'Content-Type': 'application/json' },
            });
            const responseBody = await response.json();
            expect(response.status).to.equal(401);
            expect(responseBody).to.have.property('error');
        });

        it('should sign in successfully', async ()=> {
            const response = await request(routes.signIn, {
                method: 'POST',
                body: JSON.stringify(TEST_USER_DATA),
                headers: { 'Content-Type': 'application/json' },
            });
            const responseBody = await response.json();
            // set JWT token for future tests and clean up
            token = responseBody.token;

            expect(response.status).to.equal(200);
            expect(responseBody).to.have.property('token');
        });
    });

    describe('GET', () => {

        it('should get user', async () => {
            const response = await request(routes.getOne(userId), {
                method: 'GET',
                headers: { 'Authorization': `Bearer ${token}`}
            });
            const responseBody = await response.json();
            expect(response.status).to.equal(200);
            expect(responseBody).to.have.property('user');
        });

        it('should return error if user doesn\'t exist', async () => {
            const response = await request(routes.getOne(NONEXISTENT_USER_ID), {
                method: 'GET',
                headers: { 'Authorization': `Bearer ${token}`}
            });
            const responseBody = await response.json();
            expect(response.status).to.equal(404);
            expect(responseBody).to.have.property('error');
        });
    });

    after(async () => {
        await request(routes.deleteOne(userId), {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` },
        });
    });
});