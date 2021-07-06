import React, { FunctionComponent, useRef, useEffect } from 'react';
import styled from 'styled-components/macro';
import { useSelector } from 'react-redux';
import store from '../redux/store';
import useQuestionStore from '../redux/hooks/useQuestionStore';

import Header from '../components/smart/Header';
import Questions from '../components/smart/Questions';
import Spinner from '../components/dumb/Spinner';
import ContentContainer from "../components/dumb/ContentContainer";

import { HEADER_HEIGHT } from '../components/constants';
import { RootState, IQuestionsState } from '../common/config/interfaces';

const HomeContainer = styled.div`
  height: calc(100% - ${HEADER_HEIGHT});
`;

const Home: FunctionComponent = (): JSX.Element => {

    const initQuestionsState = useSelector((state: RootState) => state.questionsState);
    const questionsState: React.MutableRefObject<IQuestionsState & { loading: boolean }> = useRef(initQuestionsState);
    questionsState.current = initQuestionsState;

    useEffect(() => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
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
                        <ContentContainer>
                            <Questions questionsState={questionsState} withUserName/>
                        </ContentContainer>
                    </HomeContainer>
                </>
            }
        </>
    )
};

export default Home;
