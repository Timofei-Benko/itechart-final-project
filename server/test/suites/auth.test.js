const expect = require('chai').expect;
const request = require('node-fetch');
const questionRoutes = require('../config/routes').questions;
const userRoutes = require('../config/routes').users;

const EXPIRED_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwYzc1NjUxYmE5Y2JkYTQ4YjM1MjA3MyIsImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwiaWF0IjoxNjIzOTM1NTA4LCJleHAiOjE2MjM5MzkxMDh9.NN73mu31U7rx8rlMFpMs7m4OnOJRg5OVJJq3_rE989M'

describe('Auth suite', () => {

    describe('Should not give access to protected routes if token is expired', () => {

        it('should return auth error', async () => {
            const response = await request(userRoutes.getOne(), {
                method: 'GET',
                headers: { 'Authorization': `Bearer ${EXPIRED_TOKEN}`}
            });
            const responseBody = await response.json();
            expect(response.status).to.equal(401);
            expect(responseBody).to.have.property('error')
            expect(responseBody.error).to.contain('jwt expired');
        });

        it('should return auth error', async () => {
            const response = await request(questionRoutes.create, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${EXPIRED_TOKEN}`}
            });
            const responseBody = await response.json();
            expect(response.status).to.equal(401);
            expect(responseBody).to.have.property('error');
            expect(responseBody.error).to.contain('jwt expired');
        });

        it('should return auth error', async () => {
            const response = await request(questionRoutes.getAllByUserId(), {
                method: 'GET',
                headers: { 'Authorization': `Bearer ${EXPIRED_TOKEN}`}
            });
            const responseBody = await response.json();
            expect(response.status).to.equal(401);
            expect(responseBody).to.have.property('error');
            expect(responseBody.error).to.contain('jwt expired');
        });

        it('should return auth error', async () => {
            const response = await request(questionRoutes.addAnswer(), {
                method: 'PUT',
                headers: { 'Authorization': `Bearer ${EXPIRED_TOKEN}`}
            });
            const responseBody = await response.json();
            expect(response.status).to.equal(401);
            expect(responseBody).to.have.property('error');
            expect(responseBody.error).to.contain('jwt expired');
        });

        it('should return auth error', async () => {
            const response = await request(questionRoutes.updateAnswer(), {
                method: 'PUT',
                headers: { 'Authorization': `Bearer ${EXPIRED_TOKEN}`}
            });
            const responseBody = await response.json();
            expect(response.status).to.equal(401);
            expect(responseBody).to.have.property('error');
            expect(responseBody.error).to.contain('jwt expired');
        });
    });
});
