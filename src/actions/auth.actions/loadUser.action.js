import setAuthToken from '../../utils/setAuthtoken';
import axios from 'axios';
import { USER_LOADED, AUTH_ERROR } from '../types.actions';

export const loadUser = () => async (dispatch) => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }

    //making the request

    try {
        const res = await axios.get('./api/auth');
        dispatch({
            type: USER_LOADED,
            payload: res.data,
        });
    } catch (error) {
        dispatch({
            type: AUTH_ERROR,
        });
    }
};
