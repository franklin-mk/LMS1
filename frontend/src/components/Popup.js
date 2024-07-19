import * as React from 'react';
import { useDispatch } from 'react-redux';
import { underControl } from '../redux/userRelated/userSlice';
import { underStudentControl } from '../redux/studentRelated/studentSlice';
import MuiAlert from '@mui/material/Alert';
import { Snackbar } from '@mui/material';

// Define the Popup component that takes message, setShowPopup, and showPopup as props
const Popup = ({ message, setShowPopup, showPopup }) => {
    // Initialize the dispatch function to dispatch actions
    const dispatch = useDispatch();

    // Set the vertical and horizontal positions for the Snackbar
    const vertical = "top";
    const horizontal = "right";

    // Function to handle the closing of the Snackbar
    const handleClose = (event, reason) => {
        // Prevent the Snackbar from closing if the reason is a clickaway
        if (reason === 'clickaway') {
            return;
        }
        // Set showPopup to false to hide the Snackbar
        setShowPopup(false);
        // Dispatch actions to update the state (assuming these actions are defined in your Redux store)
        dispatch(underControl());
        dispatch(underStudentControl());
    };

    // Render the Popup component
    return (
        <>
            {/* Snackbar component to show messages */}
            <Snackbar
                open={showPopup} // Controls the visibility of the Snackbar
                autoHideDuration={2000} // Auto hide after 2000 milliseconds
                onClose={handleClose} // Function to call when Snackbar closes
                anchorOrigin={{ vertical, horizontal }} // Position of the Snackbar
                key={vertical + horizontal} // Unique key for the Snackbar position
            >
                {
                    // Conditionally render the Alert component based on the message
                    (message === "Done Successfully") ?
                        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                            {message}
                        </Alert>
                        :
                        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                            {message}
                        </Alert>
                }
            </Snackbar>
        </>
    );
};

// Export the Popup component as the default export
export default Popup;

// Define a custom Alert component using React.forwardRef to allow forwarding refs
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
