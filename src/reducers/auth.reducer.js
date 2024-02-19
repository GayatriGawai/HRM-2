import { LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from '../actions/types.actions';

const initialState = {
    token: localStorage.getItem('token'),
    loading: true,
};

export default function (state = initialState, action) {
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
}
