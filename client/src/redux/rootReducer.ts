import { combineReducers } from "redux";

import signUpErrorReducer from './reducers/signUpErrorReducer';
import authenticationStatusReducer from "./reducers/authenticationStatusReducer";
import userReducer from "./reducers/userReducer";
import userQuestionsReducer from './reducers/userQuestionsReducer';

const rootReducer = combineReducers(
    {
        signUpError: signUpErrorReducer,
        authenticationStatus: authenticationStatusReducer,
        userState: userReducer,
        userQuestionState: userQuestionsReducer,
    }
);

export default rootReducer;
