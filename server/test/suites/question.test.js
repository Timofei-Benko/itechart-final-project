const expect = require('chai').expect;
const request = require('node-fetch');
const questionRoutes = require('./config/routes').questions;
const userRoutes = require('./config/routes').users;
const addTenToScore = require('./config/addTenToAnswerScore');

const TEST_USER_DATA = {
    user: {
        firstName: 'QUESTION_TEST_USER',
        lastName: 'QUESTION_TEST_USER',
        email: 'questiontestuser@test.com',
        password: 'testtestquestion',
        username: 'QUESTION_TEST',
        position: 'QUESTION_TEST',
        experience: 4,
        languages: ['TEST', 'TEST', 'TEST']
    }
};

let userId, questionId, answerId, token;

const TEST_QUESTION_DATA = {
    question: {
        title: 'TEST_QUESTION',
        content: 'TEST_QUESTION',
    },
    answer: {
        content: 'TEST_ANSWER'
    },
};

const NONEXISTENT_USER_ID = '60c37aa8d7c69c566e1e7f53';
const NONEXISTENT_QUESTION_ID = '60a37ac5d7a69c566e5e7f83';
const NONEXISTENT_ANSWER_ID = '60e37ac4d7a69c536e5e7f83';

describe('Question suite', () => {

    before(async () => {
        await request(userRoutes.signUp, {
            method: 'POST',
            body: JSON.stringify(TEST_USER_DATA),
            headers: { 'Content-Type': 'application/json' },
        });

        const signInResponse = await request(userRoutes.signIn, {
            method: 'POST',
            body: JSON.stringify(TEST_USER_DATA),
            headers: { 'Content-Type': 'application/json' },
        });

        const signInResponseBody = await signInResponse.json();
        userId = signInResponseBody.user._id;
        token = signInResponseBody.token;
    });

    after(async () => {
        await request(questionRoutes.deleteOne(userId, questionId), {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` },
        });

        await request(userRoutes.deleteOne(userId), {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` },
        });
    });

    describe('POST', () => {

        it('should return error if user doesn\'t exist', async () => {
            const response = await request(questionRoutes.create, {
                method: 'POST',
                body: JSON.stringify({ question: { ...TEST_QUESTION_DATA.question, user: NONEXISTENT_USER_ID } }),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            const responseBody = await response.json();
            expect(response.status).to.equal(404);
            expect(responseBody).to.have.property('error');
        });

        it('should post question and update questionQty field in corresponding user document', async () => {
            const response = await request(questionRoutes.create, {
                method: 'POST',
                body: JSON.stringify({
                    question: { ...TEST_QUESTION_DATA.question, user: userId },
                }),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            const responseBody = await response.json();
            questionId = responseBody.question._id;
            const userResponse = await request(userRoutes.getOne(userId), {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            const userResponseBody = await userResponse.json();
            expect(response.status).to.equal(201);
            expect(responseBody).to.have.property('status');
            expect(responseBody).to.have.property('question');
            expect(userResponseBody.user.questionQty).to.be.greaterThan(0);
        })
    });

    describe('GET', () => {

        it('should get all questions', async () => {
            const response = await request(questionRoutes.getAll, {
                method: 'GET',
            });
            const responseBody = await response.json();
            expect(response.status).to.equal(200);
            expect(responseBody).to.have.property('questions');
            expect(responseBody.questions).to.be.an('array');

            if (responseBody.questions[0].answers.length) {
                expect(responseBody.questions[0].answers[0]).to.have.property('user');
                expect(responseBody.questions[0].answers[0].user).to.be.an('object');
            }
        });

        it('should get all questions posted by a user', async () => {
            const response = await request(questionRoutes.getAllByUserId(userId), {
                method: 'GET',
                headers: { 'Authorization': `Bearer ${token}` },
            });
            const responseBody = await response.json();
            expect(response.status).to.equal(200);
            expect(responseBody).to.have.property('questions');
            expect(responseBody.questions).to.be.an('array');
        })

        it('should get a question', async () => {
            const response = await request(questionRoutes.getOne(questionId), {
                method: 'GET',
            });
            const responseBody = await response.json();
            expect(response.status).to.equal(200);
            expect(responseBody).to.have.property('question');
        });
    });

    describe('PUT', () => {

        it('should return error if question doesn\'t exist', async () => {
            const response = await request(questionRoutes.addAnswer(NONEXISTENT_QUESTION_ID), {
                method: 'PUT',
                body: JSON.stringify(TEST_QUESTION_DATA),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            const responseBody = await response.json();
            expect(response.status).to.equal(404);
            expect(responseBody).to.have.property('error');
        });

        it('should return error if user doesn\'t exist', async () => {
            const response = await request(questionRoutes.addAnswer(questionId), {
                method: 'PUT',
                body: JSON.stringify({ answer: { ...TEST_QUESTION_DATA.answer, user: NONEXISTENT_USER_ID } }),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            const responseBody = await response.json();
            expect(response.status).to.equal(404);
            expect(responseBody).to.have.property('error');
        });

        it('should add answer', async () => {
            const response = await request(questionRoutes.addAnswer(questionId), {
                method: 'PUT',
                body: JSON.stringify({ answer: { ...TEST_QUESTION_DATA.answer, user: userId } }),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            const responseBody = await response.json();
            answerId = responseBody.answer._id;

            const userResponse = await request(userRoutes.getOne(userId), {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            const userResponseBody = await userResponse.json();

            expect(response.status).to.be.oneOf([ 200, 201 ]);
            expect(responseBody).to.have.property('answer');
            expect(userResponseBody.user.answerQty).to.be.greaterThan(0);
        });

        it('should return error if question doesn\'t exist', async () => {
            const response = await request(questionRoutes.updateAnswer(NONEXISTENT_QUESTION_ID, answerId, '?score=up'), {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            const responseBody = await response.json();
            expect(response.status).to.equal(404);
            expect(responseBody).to.have.property('error');
        });

        it('should return error if answer doesn\'t exist', async () => {
            const response = await request(questionRoutes.updateAnswer(questionId, NONEXISTENT_ANSWER_ID, '?score=up'), {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            const responseBody = await response.json();
            expect(response.status).to.equal(404);
            expect(responseBody).to.have.property('error');
        });

        it('should update answer score', async () => {
            const response = await request(questionRoutes.updateAnswer(questionId, answerId, '?score=up'), {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            const responseBody = await response.json();

            const questionResponse = await request(questionRoutes.getOne(questionId), {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            const questionResponseBody = await questionResponse.json();
            const answer = questionResponseBody.question.answers.find(answer => answer._id.toString() === answerId);
            expect(response.status).to.equal(200);
            expect(responseBody).to.have.property('status');
            expect(answer.score).to.be.greaterThan(0);
        });

        it('should update isBest status and bestAnswerQty field in corresponding user document', async () => {
            const response = await request(questionRoutes.updateAnswer(questionId, answerId, '?isBest=1'), {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            const responseBody = await response.json();

            const questionResponse = await request(questionRoutes.getOne(questionId), {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            const questionResponseBody = await questionResponse.json();
            const answer = questionResponseBody.question.answers.find(answer => answer._id.toString() === answerId);

            const userResponse = await request(userRoutes.getOne(userId), {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            const userResponseBody = await userResponse.json();

            expect(response.status).to.equal(200);
            expect(responseBody).to.have.property('status');
            expect(answer.isBest).to.equal(true);
            expect(userResponseBody.user.bestAnswerQty).to.be.greaterThan(0);
        });

        it(`should set isLiked field in answer subdocument to true 
        and update likedAnswerQty field in corresponding user document`,async () => {

            await addTenToScore(questionId, answerId, token);

            const questionResponse = await request(questionRoutes.getOne(questionId), {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            const questionResponseBody = await questionResponse.json();
            const answer = questionResponseBody.question.answers.find(answer => answer._id.toString() === answerId);

            const userResponse = await request(userRoutes.getOne(userId), {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            const userResponseBody = await userResponse.json();

            expect(answer.isLiked).to.equal(true);
            expect(userResponseBody.user.likedAnswerQty).to.be.greaterThan(0);
        });
    });
});
