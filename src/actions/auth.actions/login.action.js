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
        console.log('Response:', res);

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data,
            loading: false,
        });
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
        }
        console.log(err);

        dispatch({
            type: LOGIN_FAIL,
            payload: err.response.data.errors,
        });
    }
};

//LOGOUT CLEAR PROFILE

export const logout = () => (dispatch) => {
    dispatch(setAlert('Logout successfull', 'success'));

    dispatch({ type: CLEAR_PROFILE });
    dispatch({ type: LOGOUT });
};
