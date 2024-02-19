import { combineReducers } from 'redux';
import employees from './employees.reducer';
import auth from './auth.reducer';

export default combineReducers({
    auth,
    employees,
});
