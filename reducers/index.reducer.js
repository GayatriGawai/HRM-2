import { combineReducers } from 'redux';
import employees from './employees';
import auth from './auth';
import alert from './alert';

export default combineReducers({
    alert,
    auth,
    employees,
});
