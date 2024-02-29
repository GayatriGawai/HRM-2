// profileActions.js

import {
    CREATE_PROFILE_SUCCESS,
    CREATE_PROFILE_FAIL,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAIL,
    DELETE_PROFILE_SUCCESS,
    DELETE_PROFILE_FAIL,
} from '../types.actions';

// Action creators for creating, updating, and deleting profiles
export const createProfile = (profileData) => async (dispatch) => {
    try {
        const response = await fetch('/api/profiles', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(profileData),
        });

        if (!response.ok) {
            throw new Error('Failed to create profile');
        }

        const data = await response.json();

        dispatch({
            type: CREATE_PROFILE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        console.error('Error creating profile:', error.message);
        dispatch({
            type: CREATE_PROFILE_FAIL,
            payload: { error: error.message },
        });
    }
};

export const updateProfile =
    (profileId, updatedProfileData) => async (dispatch) => {
        try {
            const response = await fetch(`/api/profiles/${profileId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedProfileData),
            });

            if (!response.ok) {
                throw new Error('Failed to update profile');
            }

            const data = await response.json();

            dispatch({
                type: UPDATE_PROFILE_SUCCESS,
                payload: data,
            });
        } catch (error) {
            console.error('Error updating profile:', error.message);
            dispatch({
                type: UPDATE_PROFILE_FAIL,
                payload: { error: error.message },
            });
        }
    };

export const partialUpdateProfile =
    (profileId, updatedFields) => async (dispatch) => {
        try {
            const response = await fetch(`/api/profiles/${profileId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedFields),
            });

            if (!response.ok) {
                throw new Error('Failed to partially update profile');
            }

            const data = await response.json();

            dispatch({
                type: UPDATE_PROFILE_SUCCESS,
                payload: data,
            });
        } catch (error) {
            console.error('Error partially updating profile:', error.message);
            dispatch({
                type: UPDATE_PROFILE_FAIL,
                payload: { error: error.message },
            });
        }
    };

export const deleteProfile = (profileId) => async (dispatch) => {
    try {
        const response = await fetch(`/api/profiles/${profileId}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('Failed to delete profile');
        }

        dispatch({
            type: DELETE_PROFILE_SUCCESS,
            payload: profileId,
        });
    } catch (error) {
        console.error('Error deleting profile:', error.message);
        dispatch({
            type: DELETE_PROFILE_FAIL,
            payload: { error: error.message },
        });
    }
};
