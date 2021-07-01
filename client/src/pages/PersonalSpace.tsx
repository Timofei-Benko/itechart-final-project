import React, { FunctionComponent, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components/macro';

import isSignedIn from '../common/authentication/isSignedIn';
import { RootState } from '../common/config/interfaces';

import Header from '../components/smart/Header';

import ContentContainer from '../components/dumb/ContentContainer';
import Delimiter from '../components/dumb/Delimiter';

const PersonalSpaceContainer = styled.div`
  padding: 2rem;
  width: 100%;
  height: 100%;
  background-color: #FFFFFF;
`;

const Title = styled.h2`
  text-transform: capitalize
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
`;

const TextItem = styled.span`
  display: block;
  max-width: 500px;
  
  span {
    font-weight: bold;
  }
`;

const PersonalSpace: FunctionComponent = (): JSX.Element => {

    const initUserState = useSelector((state: RootState) => state.userState);
    const userState = useRef(initUserState);
    userState.current = initUserState;

    return (
        !isSignedIn() ?
            <Redirect to={'/login'} />
            :
            <>
                <Header />
                <ContentContainer inner={true}>
                    <PersonalSpaceContainer>
                        <Title>Account information</Title>
                        <TextContainer>
                            <TextItem>
                                <span>Full Name: </span>
                                { `${userState.current.data.firstName} ${userState.current.data.lastName}` }</TextItem>
                            <TextItem>
                                <span>Email: </span>
                                { userState.current.data.email }
                            </TextItem>
                        </TextContainer>

                        <Delimiter />

                        <Title>User Information</Title>
                        <TextContainer>
                            {
                                userState.current.data.username
                                &&
                                <TextItem>
                                    <span>Username: </span>
                                    { userState.current.data.username }
                                </TextItem>
                            }

                            {
                                userState.current.data.experience
                                &&
                                <TextItem>
                                    <span>Experience: </span>
                                    {
                                        `
                                            ${userState.current.data.experience} 
                                            ${userState.current.data.experience === 1 ? 'year' : 'years'}
                                        `
                                    }
                                </TextItem>
                            }

                            {
                                userState.current.data.position
                                &&
                                <TextItem>
                                    <span>Position: </span>
                                    { userState.current.data.position }
                                </TextItem>
                            }

                            {
                                userState.current.data.languages
                                    &&
                                userState.current.data.languages.length !== 0
                                    &&
                                <TextItem>
                                    <span>Preferred languages: </span>
                                    { userState.current.data.languages.join(', ') }
                                </TextItem>
                            }

                        </TextContainer>

                        <Delimiter />

                        <Title>User Statistics</Title>
                        <TextContainer>
                            <TextItem>
                                <span>Questions posted: </span>
                                { userState.current.data.questionQty }
                            </TextItem>
                            <TextItem>
                                <span>Answers posted: </span>
                                { userState.current.data.answerQty }
                            </TextItem>
                            <TextItem>
                                <span>Best answer quantity: </span>
                                { userState.current.data.bestAnswerQty }
                            </TextItem>
                            <TextItem>
                                <span>Popular answer quantity: </span>
                                { userState.current.data.likedAnswerQty }
                            </TextItem>
                        </TextContainer>
                    </PersonalSpaceContainer>
                </ContentContainer>
            </>
    )
};

export default PersonalSpace;
