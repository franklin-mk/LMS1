const Subject = require('../models/subjectSchema.js');
const Teacher = require('../models/teacherSchema.js');
const Student = require('../models/studentSchema.js');

// Function to create subjects
const subjectCreate = async (req, res) => {
    try {
        const subjects = req.body.subjects.map((subject) => ({
            subName: subject.subName,
            subCode: subject.subCode,
            sessions: subject.sessions,
        }));

        // Check if any subject with the same subCode exists for the given school
        const existingSubjectBySubCode = await Subject.findOne({
            'subjects.subCode': subjects[0].subCode,
            school: req.body.adminID,
        });

        if (existingSubjectBySubCode) {
            res.send({ message: 'Sorry this subcode must be unique as it already exists' });
        } else {
            // Prepare new subjects with additional fields
            const newSubjects = subjects.map((subject) => ({
                ...subject,
                sclassName: req.body.sclassName,
                school: req.body.adminID,
            }));

            // Insert new subjects into the database
            const result = await Subject.insertMany(newSubjects);
            res.send(result);
        }
    } catch (err) {
        res.status(500).json(err); // Handle errors
    }
};

// Function to fetch all subjects for a school
const allSubjects = async (req, res) => {
    try {
        let subjects = await Subject.find({ school: req.params.id })
            .populate("sclassName", "sclassName"); // Populate class names associated with subjects
        if (subjects.length > 0) {
            res.send(subjects); // Send found subjects
        } else {
            res.send({ message: "No subjects found" }); // No subjects found
        }
    } catch (err) {
        res.status(500).json(err); // Handle errors
    }
};

// Function to fetch subjects for a specific class
const classSubjects = async (req, res) => {
    try {
        let subjects = await Subject.find({ sclassName: req.params.id });
        if (subjects.length > 0) {
            res.send(subjects); // Send found subjects
        } else {
            res.send({ message: "No subjects found" }); // No subjects found for the class
        }
    } catch (err) {
        res.status(500).json(err); // Handle errors
    }
};

// Function to fetch free subjects (not assigned to any teacher) for a class
const freeSubjectList = async (req, res) => {
    try {
        let subjects = await Subject.find({ sclassName: req.params.id, teacher: { $exists: false } });
        if (subjects.length > 0) {
            res.send(subjects); // Send free subjects
        } else {
            res.send({ message: "No subjects found" }); // No free subjects found
        }
    } catch (err) {
        res.status(500).json(err); // Handle errors
    }
};

// Function to fetch details of a specific subject
const getSubjectDetail = async (req, res) => {
    try {
        let subject = await Subject.findById(req.params.id)
            .populate("sclassName", "sclassName") // Populate class name
            .populate("teacher", "name"); // Populate teacher name
        if (subject) {
            res.send(subject); // Send subject details
        } else {
            res.send({ message: "No subject found" }); // No subject found with the given ID
        }
    } catch (err) {
        res.status(500).json(err); // Handle errors
    }
};

// Function to delete a specific subject by its ID
const deleteSubject = async (req, res) => {
    try {
        const deletedSubject = await Subject.findByIdAndDelete(req.params.id); // Delete subject by ID

        // Unset teachSubject field in teachers associated with the deleted subject
        await Teacher.updateOne(
            { teachSubject: deletedSubject._id },
            { $unset: { teachSubject: "" } }
        );

        // Remove the deleted subject from students' examResult and attendance arrays
        await Student.updateMany(
            {},
            { $pull: { examResult: { subName: deletedSubject._id }, attendance: { subName: deletedSubject._id } } }
        );

        res.send(deletedSubject); // Send deleted subject details
    } catch (error) {
        res.status(500).json(error); // Handle errors
    }
};

// Function to delete all subjects for a specific school
const deleteSubjects = async (req, res) => {
    try {
        const deletedSubjects = await Subject.deleteMany({ school: req.params.id }); // Delete subjects by school ID

        // Unset teachSubject field in teachers associated with the deleted subjects
        await Teacher.updateMany(
            { teachSubject: { $in: deletedSubjects.map(subject => subject._id) } },
            { $unset: { teachSubject: "" } }
        );

        // Set examResult and attendance to null in all students for the deleted subjects
        await Student.updateMany(
            {},
            { $set: { examResult: null, attendance: null } }
        );

        res.send(deletedSubjects); // Send deleted subjects details
    } catch (error) {
        res.status(500).json(error); // Handle errors
    }
};

// Function to delete all subjects for a specific class
const deleteSubjectsByClass = async (req, res) => {
    try {
        const deletedSubjects = await Subject.deleteMany({ sclassName: req.params.id }); // Delete subjects by class ID

        // Unset teachSubject field in teachers associated with the deleted subjects
        await Teacher.updateMany(
            { teachSubject: { $in: deletedSubjects.map(subject => subject._id) } },
            { $unset: { teachSubject: "" } }
        );

        // Set examResult and attendance to null in all students for the deleted subjects
        await Student.updateMany(
            {},
            { $set: { examResult: null, attendance: null } }
        );

        res.send(deletedSubjects); // Send deleted subjects details
    } catch (error) {
        res.status(500).json(error); // Handle errors
    }
};

module.exports = {
    subjectCreate,
    freeSubjectList,
    classSubjects,
    getSubjectDetail,
    deleteSubjectsByClass,
    deleteSubjects,
    deleteSubject,
    allSubjects
};
