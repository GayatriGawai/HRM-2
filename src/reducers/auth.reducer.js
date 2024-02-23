import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    REGISTRATION_SUCCESS,
    REGISTRATION_FAIL,
} from '../actions/types.actions';

const storedToken = localStorage.getItem('token');
const initialState = {
    token: storedToken ? storedToken : null,
    loading: true,
    error: {},
};

const AuthReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case LOGIN_SUCCESS:
            localStorage.setItem('token', payload.token);
            return {
                ...state,
                ...payload,
                loading: false,
            };

        case LOGIN_FAIL:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                loading: false,
                error: payload,
            };

        case 'REGISTRATION_SUCCESS':
            localStorage.setItem('token', payload.token);
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                loading: false,
            };
        case 'REGISTRATION_FAIL':
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
                error: payload,
            };

        case LOGOUT:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                loading: false,
            };
        default:
            return state;
    }
};
export default AuthReducer;
