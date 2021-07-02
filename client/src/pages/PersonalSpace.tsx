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

const PersonalSpaceContainer = styled.div`
  position: relative;
  display: flex;
  margin: 2rem;
  padding: 2rem;
  min-height: 650px;
  width: 100%;
  border-radius: 15px;
  height: calc(100% - ${HEADER_HEIGHT});
  background-color: #FFFFFF;
  box-shadow: ${BOX_SHADOW};
  transition: all .2s ease-in-out;
`;

const PSContentContainer = styled.div``;

const PersonalSpace: FunctionComponent = (): JSX.Element => {

    const initUserState = useSelector((state: RootState) => state.userState);
    const userState = useRef(initUserState);
    userState.current = initUserState;

    const { path } = useRouteMatch();

    return (
        <>
            <Header />
            <ContentContainer height={`calc(100% - ${HEADER_HEIGHT})`}>
                    <PersonalSpaceContainer>
                        {
                            userState.current.loading
                                ?
                                <Spinner />
                                :
                                <>
                                    <Sidebar path={path}/>
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
                        }
                    </PersonalSpaceContainer>
            </ContentContainer>
        </>
    )
};

export default PersonalSpace;
