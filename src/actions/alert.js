import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SET_ALERT, REMOVE_ALERT } from './types.actions';

export const setAlert =
    (msg, alertType, timeout = 5000) =>
    (dispatch) => {
        // Show toast notification
        toast(msg, { type: alertType, autoClose: timeout });

        // Dispatch action to set alert
        const id = Date.now(); // Use current timestamp as ID
        dispatch({
            type: SET_ALERT,
            payload: { id, msg, alertType },
        });

        // Automatically remove alert after specified timeout
        setTimeout(
            () => dispatch({ type: REMOVE_ALERT, payload: id }),
            timeout
        );
    };
