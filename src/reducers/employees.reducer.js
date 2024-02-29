import {
    CREATE_PROFILE_SUCCESS,
    CREATE_PROFILE_ERROR,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_ERROR,
    GET_EMPLOYEE_LIST,
    GET_EMPLOYEE_LIST_FAILED,
    GET_EMPLOYEE_PROFILE,
    GET_EMPLOYEE_PROFILE_ERROR,
    DELETE_EMPLOYEE_PROFILE,
    DELETE_EMPLOYEE_PROFILE_FAILED,
    CLEAR_PROFILE,
} from '../actions/types.actions';

const initialState = {
    profile: {},
    loading: true,
    error: {},
};

const employees = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case GET_EMPLOYEE_PROFILE:
        case UPDATE_PROFILE_SUCCESS:
        case CREATE_PROFILE_SUCCESS:
            return {
                ...state,
                profile: payload,
                loading: false,
            };

        case GET_EMPLOYEE_LIST:
            return {
                ...state,
                profile: payload.employees,
                loading: false,
            };
        case GET_EMPLOYEE_LIST_FAILED:
        case GET_EMPLOYEE_PROFILE_ERROR:
        case UPDATE_PROFILE_ERROR:
        case DELETE_EMPLOYEE_PROFILE_FAILED:
        case CREATE_PROFILE_ERROR:
            return {
                ...state,
                error: action.error,
                loading: false,
            };
        case DELETE_EMPLOYEE_PROFILE:
        case CLEAR_PROFILE:
            return {
                ...state,
                profile: null,
                loading: false,
                error: null,
            };

        default:
            return state;
    }
};

export default employees;
