const bcrypt = require('bcrypt'); // Library for hashing passwords
const Student = require('../models/studentSchema.js'); // Student model
const Subject = require('../models/subjectSchema.js'); // Subject model

// Register a new student
const studentRegister = async (req, res) => {
    try {
        // Generate salt and hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password, salt);

        // Check if a student with the same roll number, school, and class already exists
        const existingStudent = await Student.findOne({
            rollNum: req.body.rollNum,
            school: req.body.adminID,
            sclassName: req.body.sclassName,
        });

        if (existingStudent) {
            res.send({ message: 'Roll Number already exists' });
        } else {
            // Create a new student
            const student = new Student({
                ...req.body,
                school: req.body.adminID,
                password: hashedPass
            });

            let result = await student.save();

            // Remove password from the result before sending the response
            result.password = undefined;
            res.send(result);
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

// Log in a student
const studentLogIn = async (req, res) => {
    try {
        // Find student by roll number and name
        let student = await Student.findOne({ rollNum: req.body.rollNum, name: req.body.studentName });
        if (student) {
            // Validate password
            const validated = await bcrypt.compare(req.body.password, student.password);
            if (validated) {
                // Populate related fields and remove sensitive data before sending the response
                student = await student.populate("school", "schoolName")
                student = await student.populate("sclassName", "sclassName")
                student.password = undefined;
                student.examResult = undefined;
                student.attendance = undefined;
                res.send(student);
            } else {
                res.send({ message: "Invalid password" });
            }
        } else {
            res.send({ message: "Student not found" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

// Get all students for a specific school
const getStudents = async (req, res) => {
    try {
        // Find students by school ID and populate class name
        let students = await Student.find({ school: req.params.id }).populate("sclassName", "sclassName");
        if (students.length > 0) {
            
            //create a new array of students where each student object has its password field removed before being returned.
            let modifiedStudents = students.map((student) => {
                //create a shallow copy of the student object's properties.
                return { ...student._doc, password: undefined };
            });
            res.send(modifiedStudents);
        } else {
            res.send({ message: "No students found" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

// Get details of a specific student
const getStudentDetail = async (req, res) => {
    try {
        // Find student by ID and populate related fields
        let student = await Student.findById(req.params.id)
        //adds/populates data in the referenced mongoose docs so you don't have to add it manually
        //Populates the school field in the Student document with details from the referenced school document, specifically fetching only the schoolName.
            .populate("school", "schoolName")
            .populate("sclassName", "sclassName")
            .populate("examResult.subName", "subName")
            .populate("attendance.subName", "subName sessions");
        if (student) {
            // Remove password from the result before sending the response
            student.password = undefined;
            res.send(student);
        } else {
            res.send({ message: "No student found" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
}

// Delete a specific student
const deleteStudent = async (req, res) => {
    try {
        const result = await Student.findByIdAndDelete(req.params.id);
        res.send(result);
    } catch (error) {
        res.status(500).json(err);
    }
}

// Delete all students of a specific school
const deleteStudents = async (req, res) => {
    try {
        const result = await Student.deleteMany({ school: req.params.id });
        if (result.deletedCount === 0) {
            res.send({ message: "No students found to delete" });
        } else {
            res.send(result);
        }
    } catch (error) {
        res.status(500).json(err);
    }
}

// Delete all students of a specific class
const deleteStudentsByClass = async (req, res) => {
    try {
        const result = await Student.deleteMany({ sclassName: req.params.id });
        if (result.deletedCount === 0) {
            res.send({ message: "No students found to delete" });
        } else {
            res.send(result);
        }
    } catch (error) {
        res.status(500).json(err);
    }
}

// Update a specific student's information
const updateStudent = async (req, res) => {
    try {
        // If the password is being updated, hash the new password
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            res.body.password = await bcrypt.hash(res.body.password, salt);
        }
        // Update student information and return the updated result
        let result = await Student.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );

        // Remove password from the result before sending the response
        result.password = undefined;
        res.send(result);
    } catch (error) {
        res.status(500).json(error);
    }
}

// Update exam result for a specific student
const updateExamResult = async (req, res) => {
    const { subName, marksObtained } = req.body;

    try {
        const student = await Student.findById(req.params.id);

        if (!student) {
            return res.send({ message: 'Student not found' });
        }

        // Check if exam result for the subject already exists
        //used to find a specific exam result entry in the examResult array of a student document based on the subName.
        const existingResult = student.examResult.find(
            (result) => result.subName.toString() === subName
        );

        if (existingResult) {
            // Update existing result
            existingResult.marksObtained = marksObtained;
        } else {
            // Add new result
            student.examResult.push({ subName, marksObtained });
        }

        const result = await student.save();
        return res.send(result);
    } catch (error) {
        res.status(500).json(error);
    }
};

// Update attendance for a specific student
const studentAttendance = async (req, res) => {
    const { subName, status, date } = req.body;

    try {
        const student = await Student.findById(req.params.id);

        if (!student) {
            return res.send({ message: 'Student not found' });
        }

        const subject = await Subject.findById(subName);

        // Check if attendance record for the subject on the same date already exists
        const existingAttendance = student.attendance.find(
            (a) =>
                a.date.toDateString() === new Date(date).toDateString() &&
                a.subName.toString() === subName
        );

        if (existingAttendance) {
            // Update existing attendance
            existingAttendance.status = status;
        } else {
            // Check if the student has already attended the maximum number of sessions
            const attendedSessions = student.attendance.filter(
                (a) => a.subName.toString() === subName
            ).length;

            if (attendedSessions >= subject.sessions) {
                return res.send({ message: 'Maximum attendance limit reached' });
            }

            // Add new attendance
            student.attendance.push({ date, status, subName });
        }

        const result = await student.save();
        return res.send(result);
    } catch (error) {
        res.status(500).json(error);
    }
};

// Clear all attendance records for a specific subject across all students
const clearAllStudentsAttendanceBySubject = async (req, res) => {
    const subName = req.params.id;

    try {
        const result = await Student.updateMany(
            { 'attendance.subName': subName },
            { $pull: { attendance: { subName } } }
        );
        return res.send(result);
    } catch (error) {
        res.status(500).json(error);
    }
};

// Clear all attendance records for a specific school
const clearAllStudentsAttendance = async (req, res) => {
    const schoolId = req.params.id;

    try {
        const result = await Student.updateMany(
            { school: schoolId },
            { $set: { attendance: [] } }
        );

        return res.send(result);
    } catch (error) {
        res.status(500).json(error);
    }
};

// Remove attendance records for a specific subject for a specific student
const removeStudentAttendanceBySubject = async (req, res) => {
    const studentId = req.params.id;
    const subName = req.body.subId;

    try {
        const result = await Student.updateOne(
            //This is the filter criteria
            { _id: studentId },
            { $pull: { attendance: { subName: subName } } }
        );

        return res.send(result);
    } catch (error) {
        res.status(500).json(error);
    }
};

// Remove all attendance records for a specific student
const removeStudentAttendance = async (req, res) => {
    const studentId = req.params.id;

    try {
        const result = await Student.updateOne(
            { _id: studentId },
            { $set: { attendance: [] } }
        );

        return res.send(result);
    } catch (error) {
        res.status(500).json(error);
    }
};


module.exports = {
    studentRegister,
    studentLogIn,
    getStudents,
    getStudentDetail,
    deleteStudents,
    deleteStudent,
    updateStudent,
    studentAttendance,
    deleteStudentsByClass,
    updateExamResult,

    clearAllStudentsAttendanceBySubject,
    clearAllStudentsAttendance,
    removeStudentAttendanceBySubject,
    removeStudentAttendance,
}
           
