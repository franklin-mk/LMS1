const bcrypt = require('bcrypt'); // Library for hashing passwords
const Admin = require('../models/adminSchema.js'); // Admin model
const Sclass = require('../models/sclassSchema.js'); // Sclass model
const Student = require('../models/studentSchema.js'); // Student model
const Teacher = require('../models/teacherSchema.js'); // Teacher model
const Subject = require('../models/subjectSchema.js'); // Subject model
const Notice = require('../models/noticeSchema.js'); // Notice model
const Complain = require('../models/complainSchema.js'); // Complain model

// Register a new admin
const adminRegister = async (req, res) => {
    try {
        // Create a new admin instance
        const admin = new Admin({
            ...req.body
        });

        // Check if an admin with the same email or school name already exists
        const existingAdminByEmail = await Admin.findOne({ email: req.body.email });
        const existingSchool = await Admin.findOne({ schoolName: req.body.schoolName });

        if (existingAdminByEmail) {
            res.send({ message: 'Email already exists' });
        }
        else if (existingSchool) {
            res.send({ message: 'School name already exists' });
        }
        else {
            // Save the admin and remove password before sending the response
            let result = await admin.save();
            result.password = undefined;
            res.send(result);
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

// Log in admin
const adminLogIn = async (req, res) => {
    if (req.body.email && req.body.password) {
        // Find admin by email
        let admin = await Admin.findOne({ email: req.body.email });
        if (admin) {
            // Compare passwords
            if (req.body.password === admin.password) {
                admin.password = undefined;
                res.send(admin);
            } else {
                res.send({ message: "Invalid password" });
            }
        } else {
            res.send({ message: "User not found" });
        }
    } else {
        res.send({ message: "Email and password are required" });
    }
};

// Get admin details by ID
const getAdminDetail = async ( async (req, res) => {
    try {
        let admin = await Admin.findById(req.params.id);
        if (admin) {
            admin.password = undefined;
            res.send(admin);
        }
        else {
            res.send({ message: "No admin found" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
})


module.exports = { adminRegister, adminLogIn, getAdminDetail };