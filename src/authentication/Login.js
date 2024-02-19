import { LOGIN_FAIL, LOGIN_SUCCESS, CLEAR_EMPLOYEE, LOGOUT } from './types';
import axios from 'axios';
import { setAlert } from './alert';

export const login = (email, password) => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const body = JSON.stringify({ email, password });

    try {
        const res = await axios.post(
            'http://localhost:5000/api/login',
            body,
            config
        );
        console.log('Response:', res);
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data,
        });
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: LOGIN_FAIL,
        });
    }
};

//LOGOUT CLEAR PROFILE

export const logout = () => (dispatch) => {
    dispatch({ type: CLEAR_EMPLOYEE });
    dispatch({ type: LOGOUT });
};
