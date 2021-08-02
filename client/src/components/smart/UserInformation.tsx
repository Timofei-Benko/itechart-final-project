import React, { FunctionComponent, useRef } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components/macro';

import { IUserData, RootState } from '../../common/config/interfaces';
import { reactQueryConfig } from '../../common/config/react-query-config';

import Delimiter from '../dumb/Delimiter';
import { LS_USER_ID } from '../../common/config/constants';
import { useQuery } from 'react-query';
import * as apiService from '../../common/apiService';
import Spinner from '../dumb/Spinner';

const getPlaceholderElement = (placeholderText: string): JSX.Element => {
  const Placeholder = styled.span`
    font-style: italic;
  `;

  return <Placeholder>{placeholderText}</Placeholder>;
};

const Placeholder = getPlaceholderElement('TBD');

const UserInformation: FunctionComponent = (props): JSX.Element => {
  const userId = localStorage.getItem(LS_USER_ID) as string;
  const { isLoading, data } = useQuery(
    'user',
    () => apiService.getUser(userId),
    reactQueryConfig
  );

  const initUserState = useSelector((state: RootState) => state.userState);
  const userState = useRef(initUserState);
  userState.current = initUserState;

  const {
    firstName,
    lastName,
    email,
    username,
    position,
    experience,
    languages,
    questionQty,
    answerQty,
    likedAnswerQty,
    bestAnswerQty,
  } = data?.data.user as IUserData;

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <Title>Account information</Title>
          <TextContainer>
            <TextItem>
              <Key>Full Name: </Key>
              {`${firstName} ${lastName}`}
            </TextItem>
            <TextItem>
              <Key>Email: </Key>
              {email}
            </TextItem>
          </TextContainer>

          <Delimiter />

          <Title>User Information</Title>
          <TextContainer>
            {
              <TextItem>
                <Key>Username: </Key>
                {username || Placeholder}
              </TextItem>
            }

            {
              <TextItem>
                <Key>Experience: </Key>
                {experience
                  ? `${experience} ${experience === 1 ? 'year' : 'years'}`
                  : Placeholder}
              </TextItem>
            }

            {
              <TextItem>
                <Key>Position: </Key>
                {position || Placeholder}
              </TextItem>
            }

            {languages && languages.length !== 0 ? (
              <TextItem>
                <Key>Preferred languages: </Key>
                {languages.join(', ')}
              </TextItem>
            ) : (
              <TextItem>
                <Key>Preferred languages: </Key>
                {Placeholder}
              </TextItem>
            )}
          </TextContainer>

          <Delimiter />

          <Title>My Statistics</Title>
          <TextContainer>
            <TextItem>
              <Key>Questions posted: </Key>
              {questionQty}
            </TextItem>
            <TextItem>
              <Key>Answers posted: </Key>
              {answerQty}
            </TextItem>
            <TextItem>
              <Key>Best answer quantity: </Key>
              {bestAnswerQty}
            </TextItem>
            <TextItem>
              <Key>Popular answer quantity: </Key>
              {likedAnswerQty}
            </TextItem>
          </TextContainer>
        </>
      )}
    </>
  );
};

const Title = styled.h2`
  text-transform: capitalize;
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
`;

const Key = styled.span`
  font-weight: bold;
`;

export default UserInformation;
