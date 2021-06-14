const { PORT } = require('../build/common/config');
const URL = `http://localhost:${PORT}/api`;

module.exports = {
    users: {
        signUp: `${URL}/auth/signup`,
        signIn: `${URL}/auth/signIn`,
        getOne: (userId) => `${URL}/users/${userId}`,
        deleteOne: (userId) => `${URL}/users/${userId}`,
    },
    questions: {
        getAll: `${URL}/questions`,
        create: `${URL}/questions`,
        getAllByUserId: (userId) => `${URL}/users/${userId}/questions`,
        getOne: (questionId) => `${URL}/questions/${questionId}`,
        deleteOne: (userId, questionId) =>`${URL}/users/${userId}/questions/${questionId}`,
        addAnswer: (questionId) => `${URL}/questions/${questionId}/answers`,
        updateAnswer: (userId, questionId, answerId, queryParams) => {
            return `${URL}/users/${userId}/questions/${questionId}/answers/${answerId}${queryParams}`;
        },
    }
};
