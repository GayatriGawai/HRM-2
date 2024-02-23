import { CREATE_ROLE, DELETE_ROLE } from '../actions/types.actions';

const initialState = {
    roles: [],
};

const roleReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_ROLE:
            return {
                ...state,
                roles: [...state.roles, action.payload],
            };
        case DELETE_ROLE:
            return {
                ...state,
                roles: state.roles.filter((role) => role.id !== action.payload),
            };
        default:
            return state;
    }
};

export default roleReducer;
