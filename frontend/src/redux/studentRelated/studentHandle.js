// Importing axios for making HTTP requests
import axios from 'axios';

// Importing action creators from the studentSlice for dispatching actions
import {
    getRequest,
    getSuccess,
    getFailed,
    getError,
    stuffDone
} from './studentSlice';

// Asynchronous action creator to fetch all students based on an ID
export const getAllStudents = (id) => async (dispatch) => {
    // Dispatching getRequest action to indicate loading state
    dispatch(getRequest());

    try {
        // Making a GET request to fetch student data
        const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/Students/${id}`);

        // Checking if the response contains an error message
        if (result.data.message) {
            // Dispatching getFailed action with the error message if present
            dispatch(getFailed(result.data.message));
        } else {
            // Dispatching getSuccess action with the fetched data if no error
            dispatch(getSuccess(result.data));
        }
    } catch (error) {
        // Dispatching getError action with the error if the request fails
        dispatch(getError(error));
    }
}

// Asynchronous action creator to update student fields based on an ID and address
export const updateStudentFields = (id, fields, address) => async (dispatch) => {
    // Dispatching getRequest action to indicate loading state
    dispatch(getRequest());

    try {
        // Making a PUT request to update student data
        const result = await axios.put(`${process.env.REACT_APP_BASE_URL}/${address}/${id}`, fields, {
            headers: { 'Content-Type': 'application/json' },
        });

        // Checking if the response contains an error message
        if (result.data.message) {
            // Dispatching getFailed action with the error message if present
            dispatch(getFailed(result.data.message));
        } else {
            // Dispatching stuffDone action if the update is successful
            dispatch(stuffDone());
        }
    } catch (error) {
        // Dispatching getError action with the error if the request fails
        dispatch(getError(error));
    }
}

// Asynchronous action creator to remove or perform an action on a student based on an ID and address
export const removeStuff = (id, address) => async (dispatch) => {
    // Dispatching getRequest action to indicate loading state
    dispatch(getRequest());

    try {
        // Making a PUT request to remove or update student data
        const result = await axios.put(`${process.env.REACT_APP_BASE_URL}/${address}/${id}`);

        // Checking if the response contains an error message
        if (result.data.message) {
            // Dispatching getFailed action with the error message if present
            dispatch(getFailed(result.data.message));
        } else {
            // Dispatching stuffDone action if the request is successful
            dispatch(stuffDone());
        }
    } catch (error) {
        // Dispatching getError action with the error if the request fails
        dispatch(getError(error));
    }
}
