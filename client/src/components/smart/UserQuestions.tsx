import React, { FunctionComponent, useRef, useEffect } from 'react';
import store from '../../redux/store';
import { useSelector } from 'react-redux';
import styled from 'styled-components/macro';

import Questions from './Questions';

import userQuestionStore from '../../redux/hooks/useUserQuestionStore';
import { RootState } from '../../common/config/interfaces';

const UserQuestionsContainer = styled.div``;

const UserQuestions: FunctionComponent = (): JSX.Element => {

    useEffect(() => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        store.dispatch(userQuestionStore());
    }, []);

    const initUserQuestionState = useSelector((state: RootState) => state.userQuestionState);
    const userQuestionState = useRef(initUserQuestionState);
    userQuestionState.current = initUserQuestionState;

    return (
        <UserQuestionsContainer>
            <Questions questionsState={ userQuestionState } />
        </UserQuestionsContainer>
    );
};

export default UserQuestions;
