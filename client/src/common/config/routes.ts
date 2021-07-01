export default {
    users: {
        signUp: `/auth/signup`,
        signIn: `/auth/signIn`,
        reauthenticate: (userId) => `/users/${userId}/reauthenticate`,
        getOne: (userId) => `/users/${userId}`,
        deleteOne: (userId) => `/users/${userId}`,
    },
    questions: {
        getAll: (queryParams) => queryParams ? `/questions${queryParams}` : '/questions',
        create: `/questions`,
        getAllByUserId: (userId) => `/users/${userId}/questions`,
        getOne: (questionId) => `/questions/${questionId}`,
        deleteOne: (userId, questionId) =>`/users/${userId}/questions/${questionId}`,
        addAnswer: (questionId) => `/questions/${questionId}/answers`,
        updateAnswer: (questionId, answerId, queryParams) => {
            return `/questions/${questionId}/answers/${answerId}${queryParams}`;
        },
    },
};
