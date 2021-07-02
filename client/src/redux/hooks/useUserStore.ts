import * as apiService from '../../common/apiService';
import { SET_USER_DATA_LOADING, SET_USER_DATA_SUCCESS, SET_USER_DATA_ERROR } from "../actions";

export default function useUserStore() {
    return async dispatch => {
        dispatch({
            type: SET_USER_DATA_LOADING,
        });

        const userId = localStorage.getItem('user_id') as string;

        try {
            const response = await apiService.getUser(userId);

            dispatch({
                type: SET_USER_DATA_SUCCESS,
                payload: response.data.user,
            });

        } catch (e) {
            dispatch({
                type: SET_USER_DATA_ERROR,
                payload: e,
            });
        }
    };
};
