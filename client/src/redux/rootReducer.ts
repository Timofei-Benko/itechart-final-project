import { combineReducers } from "redux";

import signUpErrorReducer from './reducers/signUpErrorReducer';
import authenticationStatusReducer from "./reducers/authenticationStatusReducer";
import userReducer from "./reducers/userReducer";

const rootReducer = combineReducers(
    {
        signUpError: signUpErrorReducer,
        authenticationStatus: authenticationStatusReducer,
        userState: userReducer,
    }
);

export default rootReducer;
