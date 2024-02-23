import { combineReducers } from 'redux';
import employees from './employees.reducer';
import auth from './auth.reducer';
import roleReducer from './role.reducer';

export default combineReducers({
    auth,
    employees,
    roleReducer,
});
