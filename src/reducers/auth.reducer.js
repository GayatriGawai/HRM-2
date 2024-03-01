import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    REGISTRATION_SUCCESS,
    REGISTRATION_FAIL,
    USER_LOADED,
    AUTH_ERROR,
} from '../actions/types.actions';

const storedToken = localStorage.getItem('token');
const initialState = {
    token: storedToken ? storedToken : null,
    loading: true,
    user: null,
    error: {},
    isAuthenticated: null,
};

const AuthReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case USER_LOADED:
            return {
                ...state,
                user: payload,
                isAuthenticated: true,
                loading: false,
            };
        case LOGIN_SUCCESS:
            localStorage.setItem('token', payload.token);
            return {
                ...state,
                ...payload,
                loading: false,
                isAuthenticated: true,
            };

        case LOGIN_FAIL:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                loading: false,
                error: payload,
            };

        case REGISTRATION_SUCCESS:
            localStorage.setItem('token', payload.token);
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                loading: false,
            };
        case REGISTRATION_FAIL:
        case AUTH_ERROR:
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
