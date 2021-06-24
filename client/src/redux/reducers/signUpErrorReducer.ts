import { SET_SIGN_UP_ERROR, SET_SIGN_UP_ERROR_MESSAGE, SET_SIGN_UP_ERROR_DISPLAY } from "../actions";

const initState = {
    display: false,
    message: '',
};

export default (state = initState, action) => {
    const { type, payload } = action;

    switch (type) {
        case SET_SIGN_UP_ERROR: {
            return {
                ...state,
                ...payload,
            }
        }
        case SET_SIGN_UP_ERROR_DISPLAY: {
            return {
                ...state,
                display: payload,
            };
        }
        case SET_SIGN_UP_ERROR_MESSAGE: {
            return {
                ...state,
                message: payload,
            };
        }
        default:
            return state
    }
};
