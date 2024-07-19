import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllNotices } from '../redux/noticeRelated/noticeHandle';
import { Paper } from '@mui/material';
import TableViewTemplate from './TableViewTemplate';


// Define the SeeNotice component
const SeeNotice = () => {
    // Initialize the dispatch function to dispatch actions
    const dispatch = useDispatch();

    // Extract currentUser and currentRole from the user slice of the state
    const { currentUser, currentRole } = useSelector(state => state.user);
    // Extract noticesList, loading, error, and response from the notice slice of the state
    const { noticesList, loading, error, response } = useSelector((state) => state.notice);

    // useEffect hook to fetch notices based on the currentRole
    useEffect(() => {
        // If the current role is Admin, fetch all notices for the Admin
        if (currentRole === "Admin") {
            dispatch(getAllNotices(currentUser._id, "Notice"));
        }
        // Otherwise, fetch all notices for the school
        else {
            dispatch(getAllNotices(currentUser.school._id, "Notice"));
        }
    }, [dispatch, currentUser, currentRole]);

    // Log any error that occurs while fetching notices
    if (error) {
        console.log(error);
    }

    // Define the columns for the notice table
    const noticeColumns = [
        { id: 'title', label: 'Title', minWidth: 170 },
        { id: 'details', label: 'Details', minWidth: 100 },
        { id: 'date', label: 'Date', minWidth: 170 },
    ];

    // Map over the noticesList to create rows for the table
    const noticeRows = noticesList.map((notice) => {
        // Convert the notice date to a string in YYYY-MM-DD format
        const date = new Date(notice.date);
        const dateString = date.toString() !== "Invalid Date" ? date.toISOString().substring(0, 10) : "Invalid Date";
        // Return an object with the notice details
        return {
            title: notice.title,
            details: notice.details,
            date: dateString,
            id: notice._id,
        };
    });

    // Render the component
    return (
        <div style={{ marginTop: '50px', marginRight: '20px' }}>
            {/* Show loading message if loading */}
            {loading ? (
                <div style={{ fontSize: '20px' }}>Loading...</div>
            ) : response ? (
                // Show message if there are no notices to display
                <div style={{ fontSize: '20px' }}>No Notices to Show Right Now</div>
            ) : (
                <>
                    {/* Render the Notices header */}
                    <h3 style={{ fontSize: '30px', marginBottom: '40px' }}>Notices</h3>
                    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                        {/* Render the TableViewTemplate if there are notices to display */}
                        {Array.isArray(noticesList) && noticesList.length > 0 &&
                            <TableViewTemplate columns={noticeColumns} rows={noticeRows} />
                        }
                    </Paper>
                </>
            )}
        </div>
    );
}

export default SeeNotice