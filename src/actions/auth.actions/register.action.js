import axios from 'axios';

export const register = (email, password, roles) => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const body = JSON.stringify({ email, password, roles });

    try {
        const res = await axios.post(
            'http://localhost:5000/api/auth/register',
            body,
            config
        );
        dispatch({
            type: 'REGISTRATION_SUCCESS',
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: 'REGISTRATION_FAIL',
            payload: err.response.data.message || 'Registration failed',
        });
    }
};
