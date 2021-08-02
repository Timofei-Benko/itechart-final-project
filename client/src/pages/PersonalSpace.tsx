import React, { FunctionComponent, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, useRouteMatch, Route, Switch } from 'react-router-dom';
import styled from 'styled-components/macro';

import { RootState } from '../common/config/interfaces';

import Header from '../components/smart/Header';
import Sidebar from '../components/smart/Sidebar';
import UserInformation from '../components/smart/UserInformation';
import Questions from '../components/smart/UserQuestions';

import ContentContainer from '../components/dumb/ContentContainer';
import Spinner from '../components/dumb/Spinner';

import { HEADER_HEIGHT, BOX_SHADOW } from '../components/constants';
import { useQuery, useQueryClient } from 'react-query';
import { LS_USER_ID } from '../common/config/constants';
import * as apiService from '../common/apiService';

const PersonalSpaceContainer = styled.div`
  position: relative;
  display: flex;
  margin: 2rem;
  padding: 2rem;
  height: 650px;
  width: 100%;
  border-radius: 15px;
  background-color: #ffffff;
  box-shadow: ${BOX_SHADOW};
  transition: all 0.2s ease-in-out;
`;

const PSContentContainer = styled.div`
  width: 100%;
  overflow: scroll;
`;

//TODO: remove all server state logic to this page's children components
const PersonalSpace: FunctionComponent = (): JSX.Element => {
  const userId = localStorage.getItem(LS_USER_ID) as string;
  const { isLoading, data: userData } = useQuery('user', () =>
    apiService.getUser(userId)
  );

  const { path } = useRouteMatch();

  return (
    <>
      <Header />
      <ContentContainer height={`calc(100% - ${HEADER_HEIGHT})`}>
        <PersonalSpaceContainer>
          {isLoading ? (
            <Spinner />
          ) : (
            <>
              <Sidebar path={path} />
              <PSContentContainer>
                <Switch>
                  <Route exact path={`${path}/`}>
                    <Redirect to={`${path}/account`} />
                  </Route>
                  <Route exact path={`${path}/account`}>
                    <UserInformation />
                  </Route>
                  <Route exact path={`${path}/questions`}>
                    <Questions />
                  </Route>
                </Switch>
              </PSContentContainer>
            </>
          )}
        </PersonalSpaceContainer>
      </ContentContainer>
    </>
  );
};

export default PersonalSpace;
