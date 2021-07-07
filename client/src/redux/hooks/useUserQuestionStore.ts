import * as apiService from '../../common/apiService';
import {
    SET_USER_QUESTION_DATA_LOADING,
    SET_USER_QUESTION_DATA_SUCCESS,
    SET_USER_QUESTION_DATA_ERROR,
} from "../actions";

export default function useUserQuestionStore(): (dispatch) => Promise<void> {
    return async dispatch => {
        dispatch({
            type: SET_USER_QUESTION_DATA_LOADING,
        });

        const userId = localStorage.getItem('user_id') as string;

        try {
            const response = await apiService.getAllUserQuestions(userId, '?order=desc');

            dispatch({
                type: SET_USER_QUESTION_DATA_SUCCESS,
                payload: response.data.questions,
            });

        } catch (e) {
            dispatch({
                type: SET_USER_QUESTION_DATA_ERROR,
                payload: e,
            });
        }
    };
}
