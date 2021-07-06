import React, { FunctionComponent, useRef, useEffect } from 'react';
import styled from 'styled-components/macro';
import { useSelector } from 'react-redux';
import store from '../redux/store';
import useQuestionStore from '../redux/hooks/useQuestionStore';

import Header from '../components/smart/Header';
import Questions from '../components/smart/Questions';
import Spinner from '../components/dumb/Spinner';

import { HEADER_HEIGHT } from '../components/constants';
import { RootState } from '../common/config/interfaces';

const HomeContainer = styled.div`
  height: calc(100% - ${HEADER_HEIGHT});
`;

const HomeQuestionContainer = styled.div`
`;

const Home: FunctionComponent = (): JSX.Element => {

    const initQuestionsState = useSelector((state: RootState) => state.questionsState);
    const questionsState = useRef(initQuestionsState);
    questionsState.current = initQuestionsState;

    useEffect(() => {
        store.dispatch(useQuestionStore());
    }, [])

    return (
        <>
            {
                questionsState.current.loading
                    ?
                <Spinner />
                    :
                <>
                    <Header />
                    <HomeContainer>
                        <HomeQuestionContainer>
                            <Questions questionsState={questionsState} withUserName />
                        </HomeQuestionContainer>
                    </HomeContainer>
                </>
            }
        </>
    )
};

export default Home;
