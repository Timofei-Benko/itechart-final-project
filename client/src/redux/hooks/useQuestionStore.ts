import * as apiService from '../../common/apiService';
import {
    SET_QUESTION_DATA_LOADING,
    SET_QUESTION_DATA_SUCCESS,
    SET_QUESTION_DATA_ERROR,
} from "../actions";

export default function useQuestionStore(): (dispatch) => Promise<void> {
    return async dispatch => {
        dispatch({
            type: SET_QUESTION_DATA_LOADING,
        });

        try {
            const response = await apiService.getAllQuestions('?order=desc');

            dispatch({
                type: SET_QUESTION_DATA_SUCCESS,
                payload: response.data.questions,
            });

        } catch (e) {
            dispatch({
                type: SET_QUESTION_DATA_ERROR,
                payload: e,
            });
        }
    };
}
