import {
    GET_EMPLOYEE,
    GET_EMPLOYEE_SUCCESS,
    GET_EMPLOYEE_FAILURE,
    GET_EMPLOYEES,
    EMPLOYEE_ERROR,
    UPDATE_EMPLOYEE,
    DELETE_EMPLOYEE,
    CLEAR_EMPLOYEE,
    UPDATE_EMPLOYEE_DATA,
} from '../actions/types.action';

const initialState = {
    employee: {},
    loading: true,
    error: {},
};

const employees = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case GET_EMPLOYEE:
        case UPDATE_EMPLOYEE:
            return {
                ...state,
                employee: payload,
                loading: false,
            };

        case GET_EMPLOYEE_SUCCESS:
            console.log('Reducer Payload:', action.payload);
            return {
                ...state,
                employee: action.payload,
                loading: false,
            };
        case GET_EMPLOYEES:
            return {
                ...state,
                employee: payload.employees,
                loading: false,
            };
        case EMPLOYEE_ERROR:
        case GET_EMPLOYEE_FAILURE:
            return {
                ...state,
                error: payload,
                loading: false,
            };
        case DELETE_EMPLOYEE:
        case CLEAR_EMPLOYEE:
            return {
                ...state,
                employee: null,
                loading: false,
            };

        default:
            return state;
    }
};

export default employees;
