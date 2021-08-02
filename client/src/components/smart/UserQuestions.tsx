import React, { FunctionComponent, useRef, useEffect } from 'react';
import store from '../../redux/store';
import { useSelector } from 'react-redux';
import styled from 'styled-components/macro';

import Questions from './Questions';

import userQuestionStore from '../../redux/hooks/useUserQuestionStore';
import { RootState } from '../../common/config/interfaces';
import { LS_USER_ID } from '../../common/config/constants';
import { useQuery } from 'react-query';
import * as apiService from '../../common/apiService';
import { reactQueryConfig } from '../../common/config/react-query-config';

const UserQuestionsContainer = styled.div``;

const UserQuestions: FunctionComponent = (): JSX.Element => {
  const userId = localStorage.getItem(LS_USER_ID) as string;
  const { isLoading, data } = useQuery(
    'questions',
    () => apiService.getAllUserQuestions(userId, '?order=desc'),
    reactQueryConfig
  );

  useEffect(() => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    store.dispatch(userQuestionStore());
  }, []);

  const initUserQuestionState = useSelector(
    (state: RootState) => state.userQuestionState
  );
  const userQuestionState = useRef(initUserQuestionState);
  userQuestionState.current = initUserQuestionState;

  return (
    <UserQuestionsContainer>
      <Questions questionsState={userQuestionState} />
    </UserQuestionsContainer>
  );
};

export default UserQuestions;
