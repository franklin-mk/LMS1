import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getSubjectList } from '../../redux/sclassRelated/sclassHandle';
import { BottomNavigation, BottomNavigationAction, Container, Paper, Table, TableBody, TableHead, Typography } from '@mui/material';
import { getUserDetails } from '../../redux/userRelated/userHandle';
import CustomBarChart from '../../components/CustomBarChart'

import InsertChartIcon from '@mui/icons-material/InsertChart';
import InsertChartOutlinedIcon from '@mui/icons-material/InsertChartOutlined';
import TableChartIcon from '@mui/icons-material/TableChart';
import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined';
import { StyledTableCell, StyledTableRow } from '../../components/styles';

const StudentSubjects = () => {

    // useDispatch is used to dispatch actions to the Redux store
    const dispatch = useDispatch();
    
    // useSelector is used to select parts of the state from the Redux store
    const { subjectsList, sclassDetails } = useSelector((state) => state.sclass);
    const { userDetails, currentUser, loading, response, error } = useSelector((state) => state.user);

    // useEffect to fetch user details when the component mounts or currentUser._id changes
    useEffect(() => {
        // Dispatch action to get user details for the current user
        dispatch(getUserDetails(currentUser._id, "Student"));
    }, [dispatch, currentUser._id]);

    // Log response or error if they exist
    if (response) { 
        console.log(response); 
    } else if (error) { 
        console.log(error); 
    }

    // Local state to store exam results and the currently selected section of the UI
    const [subjectMarks, setSubjectMarks] = useState([]);
    const [selectedSection, setSelectedSection] = useState('table');

    // useEffect to set the subject marks when userDetails changes
    useEffect(() => {
        if (userDetails) {
            // Set the subject marks from userDetails or default to an empty array if not available
            setSubjectMarks(userDetails.examResult || []);
        }
    }, [userDetails]);

    // useEffect to fetch the list of subjects if subjectMarks is empty
    useEffect(() => {
        if (subjectMarks.length === 0) {
            // Dispatch action to get the list of subjects for the class
            dispatch(getSubjectList(currentUser.sclassName._id, "ClassSubjects"));
        }
    }, [subjectMarks, dispatch, currentUser.sclassName._id]);

    // Function to handle changes in the selected section of the UI
    const handleSectionChange = (event, newSection) => {
        setSelectedSection(newSection);
    };


    const renderTableSection = () => {
        return (
            <>
                <Typography variant="h4" align="center" gutterBottom>
                    Subject Marks
                </Typography>
                <Table>
                    <TableHead>
                        <StyledTableRow>
                            <StyledTableCell>Subject</StyledTableCell>
                            <StyledTableCell>Marks</StyledTableCell>
                        </StyledTableRow>
                    </TableHead>
                    <TableBody>
                        {subjectMarks.map((result, index) => {
                            if (!result.subName || !result.marksObtained) {
                                return null;
                            }
                            return (
                                <StyledTableRow key={index}>
                                    <StyledTableCell>{result.subName.subName}</StyledTableCell>
                                    <StyledTableCell>{result.marksObtained}</StyledTableCell>
                                </StyledTableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </>
        );
    };

    const renderChartSection = () => {
        return <CustomBarChart chartData={subjectMarks} dataKey="marksObtained" />;
    };

    const renderClassDetailsSection = () => {
        return (
            <Container>
                <Typography variant="h4" align="center" gutterBottom>
                    Class Details
                </Typography>
                <Typography variant="h5" gutterBottom>
                    You are currently in Class {sclassDetails && sclassDetails.sclassName}
                </Typography>
                <Typography variant="h6" gutterBottom>
                    And these are the subjects:
                </Typography>
                {subjectsList &&
                    subjectsList.map((subject, index) => (
                        <div key={index}>
                            <Typography variant="subtitle1">
                                {subject.subName} ({subject.subCode})
                            </Typography>
                        </div>
                    ))}
            </Container>
        );
    };

    return (
        <>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <div>
                    {subjectMarks && Array.isArray(subjectMarks) && subjectMarks.length > 0
                        ?
                        (<>
                            {selectedSection === 'table' && renderTableSection()}
                            {selectedSection === 'chart' && renderChartSection()}

                            <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
                                <BottomNavigation value={selectedSection} onChange={handleSectionChange} showLabels>
                                    <BottomNavigationAction
                                        label="Table"
                                        value="table"
                                        icon={selectedSection === 'table' ? <TableChartIcon /> : <TableChartOutlinedIcon />}
                                    />
                                    <BottomNavigationAction
                                        label="Chart"
                                        value="chart"
                                        icon={selectedSection === 'chart' ? <InsertChartIcon /> : <InsertChartOutlinedIcon />}
                                    />
                                </BottomNavigation>
                            </Paper>
                        </>)
                        :
                        (<>
                            {renderClassDetailsSection()}
                        </>)
                    }
                </div>
            )}
        </>
    );
};

export default StudentSubjects;