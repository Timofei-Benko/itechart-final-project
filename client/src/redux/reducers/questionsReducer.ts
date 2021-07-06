import {
    SET_QUESTION_DATA_ERROR,
    SET_QUESTION_DATA_LOADING,
    SET_QUESTION_DATA_SUCCESS,
} from '../actions';

const initState = {
    loading: false,
    error: '',
    data: [],
};

export default (state = initState, action) => {
    const { type, payload } = action;

    switch (type) {
        case SET_QUESTION_DATA_LOADING: {
            return {
                ...state,
                loading: true,
            }
        }
        case SET_QUESTION_DATA_SUCCESS: {
            return {
                ...state,
                loading: false,
                data: [...payload],
            }
        }
        case SET_QUESTION_DATA_ERROR: {
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
