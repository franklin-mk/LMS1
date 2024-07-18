const bcrypt = require('bcrypt'); // Import bcrypt for password hashing
const Teacher = require('../models/teacherSchema.js'); // Import the Teacher model
const Subject = require('../models/subjectSchema.js'); // Import the Subject model

// Register a new teacher
const teacherRegister = async (req, res) => {
    const { name, email, password, role, school, teachSubject, teachSclass } = req.body; // Destructure the request body
    try {
        const salt = await bcrypt.genSalt(10); // Generate a salt for hashing the password
        const hashedPass = await bcrypt.hash(password, salt); // Hash the password

        // Create a new Teacher object
        const teacher = new Teacher({ name, email, password: hashedPass, role, school, teachSubject, teachSclass });

        // Check if a teacher with the same email already exists
        const existingTeacherByEmail = await Teacher.findOne({ email });

        if (existingTeacherByEmail) {
            res.send({ message: 'Email already exists' }); // If email exists, send a message
        } else {
            let result = await teacher.save(); // Save the new teacher
            await Subject.findByIdAndUpdate(teachSubject, { teacher: teacher._id }); // Update the subject with the new teacher's ID
            result.password = undefined; // Remove password from the response
            res.send(result); // Send the saved teacher object as response
        }
    } catch (err) {
        res.status(500).json(err); // Send error if something goes wrong
    }
};

// Teacher login
const teacherLogIn = async (req, res) => {
    try {
        let teacher = await Teacher.findOne({ email: req.body.email }); // Find the teacher by email
        if (teacher) {
            const validated = await bcrypt.compare(req.body.password, teacher.password); // Validate the password
            if (validated) {
                // Populate related fields
                teacher = await teacher.populate("teachSubject", "subName sessions");
                teacher = await teacher.populate("school", "schoolName");
                teacher = await teacher.populate("teachSclass", "sclassName");
                teacher.password = undefined; // Remove password from the response
                res.send(teacher); // Send the teacher object as response
            } else {
                res.send({ message: "Invalid password" }); // If password is invalid, send a message
            }
        } else {
            res.send({ message: "Teacher not found" }); // If teacher not found, send a message
        }
    } catch (err) {
        res.status(500).json(err); // Send error if something goes wrong
    }
};

// Get all teachers of a school
const getTeachers = async (req, res) => {
    try {
        let teachers = await Teacher.find({ school: req.params.id }) // Find teachers by school ID
            .populate("teachSubject", "subName") // Populate related fields
            .populate("teachSclass", "sclassName");
        if (teachers.length > 0) {
            let modifiedTeachers = teachers.map((teacher) => {
                return { ...teacher._doc, password: undefined }; // Remove password from each teacher object
            });
            res.send(modifiedTeachers); // Send the list of teachers as response
        } else {
            res.send({ message: "No teachers found" }); // If no teachers found, send a message
        }
    } catch (err) {
        res.status(500).json(err); // Send error if something goes wrong
    }
};

// Get details of a specific teacher
const getTeacherDetail = async (req, res) => {
    try {
        let teacher = await Teacher.findById(req.params.id) // Find teacher by ID
            .populate("teachSubject", "subName sessions") // Populate related fields
            .populate("school", "schoolName")
            .populate("teachSclass", "sclassName");
        if (teacher) {
            teacher.password = undefined; // Remove password from the response
            res.send(teacher); // Send the teacher object as response
        } else {
            res.send({ message: "No teacher found" }); // If teacher not found, send a message
        }
    } catch (err) {
        res.status(500).json(err); // Send error if something goes wrong
    }
};

// Update a teacher's subject
const updateTeacherSubject = async (req, res) => {
    const { teacherId, teachSubject } = req.body; // Destructure the request body
    try {
        const updatedTeacher = await Teacher.findByIdAndUpdate(
            teacherId,
            { teachSubject }, // Update the subject
            { new: true }
        );

        await Subject.findByIdAndUpdate(teachSubject, { teacher: updatedTeacher._id }); // Update the subject with the teacher's ID

        res.send(updatedTeacher); // Send the updated teacher object as response
    } catch (error) {
        res.status(500).json(error); // Send error if something goes wrong
    }
};

// Delete a teacher
const deleteTeacher = async (req, res) => {
    try {
        const deletedTeacher = await Teacher.findByIdAndDelete(req.params.id); // Delete the teacher by ID

        await Subject.updateOne(
            { teacher: deletedTeacher._id, teacher: { $exists: true } }, // Remove the teacher from the subject
            { $unset: { teacher: 1 } }
        );

        res.send(deletedTeacher); // Send the deleted teacher object as response
    } catch (error) {
        res.status(500).json(error); // Send error if something goes wrong
    }
};

// Delete all teachers of a school
const deleteTeachers = async (req, res) => {
    try {
        const deletionResult = await Teacher.deleteMany({ school: req.params.id }); // Delete teachers by school ID

        const deletedCount = deletionResult.deletedCount || 0; // Get the number of deleted teachers

        if (deletedCount === 0) {
            res.send({ message: "No teachers found to delete" }); // If no teachers found, send a message
            return;
        }

        const deletedTeachers = await Teacher.find({ school: req.params.id }); // Find the deleted teachers

        await Subject.updateMany(
            { teacher: { $in: deletedTeachers.map(teacher => teacher._id) }, teacher: { $exists: true } }, // Remove the teachers from the subjects
            { $unset: { teacher: "" }, $unset: { teacher: null } }
        );

        res.send(deletionResult); // Send the deletion result as response
    } catch (error) {
        res.status(500).json(error); // Send error if something goes wrong
    }
};

// Delete all teachers of a specific class
const deleteTeachersByClass = async (req, res) => {
    try {
        const deletionResult = await Teacher.deleteMany({ sclassName: req.params.id }); // Delete teachers by class name

        const deletedCount = deletionResult.deletedCount || 0; // Get the number of deleted teachers

        if (deletedCount === 0) {
            res.send({ message: "No teachers found to delete" }); // If no teachers found, send a message
            return;
        }

        const deletedTeachers = await Teacher.find({ sclassName: req.params.id }); // Find the deleted teachers

        await Subject.updateMany(
            { teacher: { $in: deletedTeachers.map(teacher => teacher._id) }, teacher: { $exists: true } }, // Remove the teachers from the subjects
            { $unset: { teacher: "" }, $unset: { teacher: null } }
        );

        res.send(deletionResult); // Send the deletion result as response
    } catch (error) {
        res.status(500).json(error); // Send error if something goes wrong
    }
};

// Record teacher attendance
const teacherAttendance = async (req, res) => {
    const { status, date } = req.body; // Destructure the request body

    try {
        const teacher = await Teacher.findById(req.params.id); // Find the teacher by ID

        if (!teacher) {
            return res.send({ message: 'Teacher not found' }); // If teacher not found, send a message
        }

        // Find if there's an existing attendance record for the given date
        const existingAttendance = teacher.attendance.find(
            (a) => a.date.toDateString() === new Date(date).toDateString()
        );

        if (existingAttendance) {
            existingAttendance.status = status; // Update the status if record exists
        } else {
            teacher.attendance.push({ date, status }); // Add new attendance record
        }

        const result = await teacher.save(); // Save the teacher object
        return res.send(result); // Send the updated teacher object as response
    } catch (error) {
        res.status(500).json(error); // Send error if something goes wrong
    }
};

// Export all the functions
module.exports = {
    teacherRegister,
    teacherLogIn,
    getTeachers,
    getTeacherDetail,
    updateTeacherSubject,
    deleteTeacher,
    deleteTeachers,
    deleteTeachersByClass,
    teacherAttendance
};
