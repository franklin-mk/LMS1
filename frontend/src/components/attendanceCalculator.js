// Function to calculate the attendance percentage for a subject
// Takes the count of present sessions and total sessions as arguments
export const calculateSubjectAttendancePercentage = (presentCount, totalSessions) => {
    // If there are no sessions or the present count is zero, return 0%
    if (totalSessions === 0 || presentCount === 0) {
        return 0;
    }
    // Calculate the attendance percentage
    const percentage = (presentCount / totalSessions) * 100;
    // Return the percentage rounded to two decimal places as a number
    return parseFloat(percentage.toFixed(2));
};

// Function to group attendance data by subject
// Takes an array of attendance records as argument
export const groupAttendanceBySubject = (subjectAttendance) => {
    // Initialize an empty object to hold the grouped attendance data
    const attendanceBySubject = {};

    // Iterate through each attendance record
    subjectAttendance.forEach((attendance) => {
        const subName = attendance.subName.subName; // Extract subject name
        const sessions = attendance.subName.sessions; // Extract total sessions for the subject
        const subId = attendance.subName._id; // Extract subject ID

        // If the subject is not already in the attendanceBySubject object, initialize it
        if (!attendanceBySubject[subName]) {
            attendanceBySubject[subName] = {
                present: 0,
                absent: 0,
                sessions: sessions,
                allData: [],
                subId: subId
            };
        }
        // Increment the count of present or absent sessions based on the attendance status
        if (attendance.status === "Present") {
            attendanceBySubject[subName].present++;
        } else if (attendance.status === "Absent") {
            attendanceBySubject[subName].absent++;
        }
        // Add the attendance record to the allData array for the subject
        attendanceBySubject[subName].allData.push({
            date: attendance.date,
            status: attendance.status,
        });
    });

    // Return the grouped attendance data
    return attendanceBySubject;
}

// Function to calculate the overall attendance percentage across all subjects
// Takes an array of attendance records as argument
export const calculateOverallAttendancePercentage = (subjectAttendance) => {
    let totalSessionsSum = 0; // Initialize the sum of total sessions
    let presentCountSum = 0; // Initialize the sum of present sessions
    const uniqueSubIds = []; // Array to keep track of unique subject IDs

    // Iterate through each attendance record
    subjectAttendance.forEach((attendance) => {
        const subId = attendance.subName._id; // Extract subject ID

        // If the subject ID is not already in uniqueSubIds, add its sessions to totalSessionsSum
        if (!uniqueSubIds.includes(subId)) {
            const sessions = parseInt(attendance.subName.sessions);
            totalSessionsSum += sessions;
            uniqueSubIds.push(subId);
        }

        // Increment the presentCountSum if the status is "Present"
        presentCountSum += attendance.status === "Present" ? 1 : 0;
    });

    // If there are no sessions or no present sessions, return 0%
    if (totalSessionsSum === 0 || presentCountSum === 0) {
        return 0;
    }

    // Calculate the overall attendance percentage
    const percentage = (presentCountSum / totalSessionsSum) * 100;
    // Return the percentage rounded to two decimal places as a number
    return parseFloat(percentage.toFixed(2));
};
