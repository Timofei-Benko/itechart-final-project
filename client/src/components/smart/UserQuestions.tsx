import React, {FunctionComponent, useRef, useEffect, useCallback} from 'react';
import store from '../../redux/store';
import { useSelector } from 'react-redux';
import styled from 'styled-components/macro';

import useUserQuestionStore from '../../redux/hooks/useUserQuestionStore';
import { RootState } from '../../common/config/interfaces';

const UserQuestions: FunctionComponent = (): JSX.Element => {

    useEffect(() => {
        store.dispatch(useUserQuestionStore());
    }, []);

    const initUserQuestionState = useSelector((state: RootState) => state.userQuestionState);
    const userQuestionState = useRef(initUserQuestionState);
    userQuestionState.current = initUserQuestionState;

    return (
        <h1>Henlo</h1>
    )
};

export default UserQuestions;