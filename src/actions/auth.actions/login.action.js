import {
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    CLEAR_PROFILE,
    LOGOUT,
} from '../types.actions';
import axios from 'axios';
import { setAlert } from '../alert';

export const login = (email, password, roles) => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const body = JSON.stringify({ email, password, roles });

    try {
        const res = await axios.post(
            'http://localhost:5000/api/auth/login',
            body,
            config
        );
        console.log('Response:', res.data);

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data,
        });
        dispatch(setAlert('Login success', 'success')); // Optionally add success alert
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: LOGIN_FAIL,
            message: { msgBody: 'Log in failed' }, // Pass the errors to the payload
        });
    }
};

export const logout = () => (dispatch) => {
    dispatch(setAlert('Logout successful', 'success'));
    dispatch({ type: CLEAR_PROFILE });
    dispatch({ type: LOGOUT });
};
