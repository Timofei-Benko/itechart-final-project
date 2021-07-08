import React from 'react';
import styled from 'styled-components/macro';
import { v4 as uuid } from 'uuid';

import Spinner from '../dumb/Spinner';

import { IQuestionsState } from '../../common/config/interfaces';

const QuestionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  width: 100%;
`;

const Question = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  border: 1px solid black;
  border-radius: 15px;
  cursor: pointer;
`;

const QuestionTitle = styled.h3`
  font-size: 2rem;
  padding-bottom: 2rem;
  border-bottom: 2px solid black;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

const QuestionInfoContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 1rem;
`;

const QuestionInfo = styled.div`
    margin-top: .5rem;
`;

const QuestionInfoTitle = styled.h4`
`;

const QuestionInfoItem = styled.span`
  display: block;
  font-size: 1rem;
`;

const Questions = (props: { questionsState: React.MutableRefObject<any>, withUserName?: boolean }): JSX.Element => {

    const { questionsState, withUserName } = props;

    return (
        questionsState.current.loading
            ?
        <Spinner />
            :
        <QuestionContainer>
            {
                questionsState.current.data.map(question => (
                    <Question key={ uuid() } onClick={() => console.log(question._id)}>
                        <QuestionTitle>
                            { question.title }
                        </QuestionTitle>

                        <QuestionInfoContainer>
                            <QuestionInfo>
                                <QuestionInfoTitle>
                                    Answers:
                                </QuestionInfoTitle>
                                <QuestionInfoItem>
                                    { question.answers.length }
                                </QuestionInfoItem>
                            </QuestionInfo>

                            <QuestionInfo>
                                <QuestionInfoTitle>
                                    Posted on:
                                </QuestionInfoTitle>
                                <QuestionInfoItem>
                                    { new Date(question.createdAt).toLocaleString() }
                                </QuestionInfoItem>
                            </QuestionInfo>

                            <QuestionInfo>
                                <QuestionInfoTitle>
                                    Last updated on:
                                </QuestionInfoTitle>
                                <QuestionInfoItem>
                                    { new Date(question.updatedAt).toLocaleString() }
                                </QuestionInfoItem>
                            </QuestionInfo>

                            {
                                withUserName
                                    &&
                                <QuestionInfo>
                                    <QuestionInfoTitle>
                                        By:
                                    </QuestionInfoTitle>
                                    <QuestionInfoItem>
                                        { question.user ? question.user.username || `${question.user.firstName} ${question.user.lastName}` : 'unknown' }
                                    </QuestionInfoItem>
                                </QuestionInfo>
                            }

                        </QuestionInfoContainer>
                    </Question>
                ))
            }
        </QuestionContainer>
    );
};

export default Questions;
