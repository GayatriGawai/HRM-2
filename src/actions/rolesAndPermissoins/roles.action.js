import { CREATE_ROLE, DELETE_ROLE } from '../types.actions';

export const createRole = (role) => {
    return {
        type: CREATE_ROLE,
        payload: role,
    };
};

export const deleteRole = (roleId) => {
    return {
        type: DELETE_ROLE,
        payload: roleId,
    };
};
