import React, { useEffect, useState } from 'react'
import { Container, Grid, Paper, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux';
import { calculateOverallAttendancePercentage } from '../../components/attendanceCalculator';
import CustomPieChart from '../../components/CustomPieChart';
import { getUserDetails } from '../../redux/userRelated/userHandle';
import styled from 'styled-components';
import SeeNotice from '../../components/SeeNotice';
import CountUp from 'react-countup';
import Subject from "../../assets/subjects.svg";
import Assignment from "../../assets/assignment.svg";
import { getSubjectList } from '../../redux/sclassRelated/sclassHandle';

const StudentHomePage = () => {
    // useDispatch is used to dispatch actions to the Redux store
    const dispatch = useDispatch();

    // useSelector is used to select parts of the state from the Redux store
    const { userDetails, currentUser, loading, response } = useSelector((state) => state.user);
    const { subjectsList } = useSelector((state) => state.sclass);

    // Local state to store attendance information for subjects
    const [subjectAttendance, setSubjectAttendance] = useState([]);

    // Extracting class ID from current user's class information
    const classID = currentUser.sclassName._id;

    // useEffect to fetch user details and the list of subjects for the class when component mounts or dependencies change
    useEffect(() => {
        // Dispatch action to get user details for the current user
        dispatch(getUserDetails(currentUser._id, "Student"));
        // Dispatch action to get the list of subjects for the class
        dispatch(getSubjectList(classID, "ClassSubjects"));
    }, [dispatch, currentUser._id, classID]);

    // Calculate the number of subjects, checking if subjectsList exists to avoid errors
    const numberOfSubjects = subjectsList && subjectsList.length;

    // useEffect to set the subject attendance when userDetails changes
    useEffect(() => {
        if (userDetails) {
            // Set the subject attendance from userDetails or default to an empty array if not available
            setSubjectAttendance(userDetails.attendance || []);
        }
    }, [userDetails]);

    // Function to calculate the overall attendance percentage
    const overallAttendancePercentage = calculateOverallAttendancePercentage(subjectAttendance);
    // Calculate the overall absent percentage
    const overallAbsentPercentage = 100 - overallAttendancePercentage;

    // Data to be used in a chart to represent attendance and absence percentages
    const chartData = [
        { name: 'Present', value: overallAttendancePercentage },
        { name: 'Absent', value: overallAbsentPercentage }
    ];

    // Component's JSX goes here


    return (
        <>
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={3} lg={3}>
                        <StyledPaper>
                            <img src={Subject} alt="Subjects" />
                            <Title>
                                Total Subjects
                            </Title>
                            <Data start={0} end={numberOfSubjects} duration={2.5} />
                        </StyledPaper>
                    </Grid>
                    <Grid item xs={12} md={3} lg={3}>
                        <StyledPaper>
                            <img src={Assignment} alt="Assignments" />
                            <Title>
                                Total Assignments
                            </Title>
                            <Data start={0} end={15} duration={4} />
                        </StyledPaper>
                    </Grid>
                    <Grid item xs={12} md={4} lg={3}>
                        <ChartContainer>
                            {
                                response ?
                                    <Typography variant="h6">No Attendance Found</Typography>
                                    :
                                    <>
                                        {loading
                                            ? (
                                                <Typography variant="h6">Loading...</Typography>
                                            )
                                            :
                                            <>
                                                {
                                                    subjectAttendance && Array.isArray(subjectAttendance) && subjectAttendance.length > 0 ? (
                                                        <>
                                                            <CustomPieChart data={chartData} />
                                                        </>
                                                    )
                                                        :
                                                        <Typography variant="h6">No Attendance Found</Typography>
                                                }
                                            </>
                                        }
                                    </>
                            }
                        </ChartContainer>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                            <SeeNotice />
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}

const ChartContainer = styled.div`
  padding: 2px;
  display: flex;
  flex-direction: column;
  height: 240px;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const StyledPaper = styled(Paper)`
  padding: 16px;
  display: flex;
  flex-direction: column;
  height: 200px;
  justify-content: space-between;
  align-items: center;
  text-align: center;
`;

const Title = styled.p`
  font-size: 1.25rem;
`;

const Data = styled(CountUp)`
  font-size: calc(1.3rem + .6vw);
  color: green;
`;



export default StudentHomePage