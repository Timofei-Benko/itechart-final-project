const request = require('node-fetch');
const routes = require('./routes');

module.exports = async (userId, initToken) => {

    const TEST_QUESTION_DATA = {
        question: {
            user: userId,
            title: 'TEST_QUESTION',
            content: 'TEST_QUESTION',
        },
        answer: {
            user: userId,
            content: 'TEST_ANSWER',
            score: 9,
        },
    };

    const getUserData = (uniqueIndex) => (
        {
            user: {
                firstName: 'QUESTION_TEST_USER',
                lastName: 'QUESTION_TEST_USER',
                email: `question_test_user_${uniqueIndex}@test.com`,
                password: 'testtestquestion',
                username: 'QUESTION_TEST',
                position: 'QUESTION_TEST',
                experience: 4,
                languages: ['TEST', 'TEST', 'TEST']
            }
        }
    );

    const questionResponse = await request(routes.questions.create, {
        method: 'POST',
        body: JSON.stringify(TEST_QUESTION_DATA),
        headers: {
            'Authorization': `Bearer ${initToken}`
        }
    });

    const questionResponseBody = await questionResponse.json();
    console.log(questionResponseBody);
    const questionId = questionResponseBody.question._id;
    
    const answerResponse = await request(routes.questions.addAnswer(questionId), {
        method: 'PUT',
        body: JSON.stringify(TEST_QUESTION_DATA),
        headers: {
            'Authorization': `Bearer ${initToken}`
        }
    });

    const answerResponseBody = await answerResponse.json();
    const answerId = answerResponseBody.answer._id;

    for (let i = 0; i < 10; i++) {
        let userResponse = await request(routes.users.signUp, {
            method: 'POST',
            body: getUserData(i)
        });

        let user = await userResponse.json();
        let userId = user._id;

        await request(routes.questions.updateAnswer(
            questionId,
            answerId,
            '?score=up'), {
            method: 'PUT',
            body: {
                answer: {
                    user: userId,
                    content: 'TEST_SCORE_BUMP_10'
                }
            },
            headers: {
                'Authorization': `Bearer ${initToken}`
            }
        });

        await request(routes.users.deleteOne(userId), {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${initToken}`
            }
        });
    }

    return { questionId, answerId };
};
