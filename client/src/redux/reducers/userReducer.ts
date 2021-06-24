import { SET_USER_DATA_LOADING, SET_USER_DATA_SUCCESS, SET_USER_DATA_ERROR } from "../actions";

const initState = {
    loading: false,
    error: '',
    data: {},
};

export default (state = initState, action) => {
    const { type, payload } = action;

    switch (type) {
        case SET_USER_DATA_LOADING: {
            return {
                ...state,
                loading: true,
            }
        }
        case SET_USER_DATA_SUCCESS: {
            return {
                ...state,
                loading: false,
                data: payload,
            }
        }
        case SET_USER_DATA_ERROR: {
            return {
                ...state,
                loading: false,
                error: payload,
            }
        }
        default:
            return state
    }
};
