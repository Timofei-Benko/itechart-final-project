const request = require('node-fetch');
const questionRoutes = require('./routes').questions;

module.exports = async (questionId, answerId, token) => {
    await request(questionRoutes.updateAnswer(questionId, answerId, '?score=up'), {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });

    await request(questionRoutes.updateAnswer(questionId, answerId, '?score=up'), {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });

    await request(questionRoutes.updateAnswer(questionId, answerId, '?score=up'), {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });

    await request(questionRoutes.updateAnswer(questionId, answerId, '?score=up'), {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });

    await request(questionRoutes.updateAnswer(questionId, answerId, '?score=up'), {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });

    await request(questionRoutes.updateAnswer(questionId, answerId, '?score=up'), {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });

    await request(questionRoutes.updateAnswer(questionId, answerId, '?score=up'), {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });

    await request(questionRoutes.updateAnswer(questionId, answerId, '?score=up'), {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });

    await request(questionRoutes.updateAnswer(questionId, answerId, '?score=up'), {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });

    await request(questionRoutes.updateAnswer(questionId, answerId, '?score=up'), {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });
};
