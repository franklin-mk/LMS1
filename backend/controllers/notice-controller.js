const Notice = require('../models/noticeSchema.js');

// Function to create a new notice
const noticeCreate = async (req, res) => {
    try {
        const notice = new Notice({
            //simplifies the code by directly extracting all fields from req.body without listing each one explicitl
            ...req.body,
            school: req.body.adminID // Set the school ID based on the admin ID from request body
        });
        const result = await notice.save(); // Save the new notice to the database
        res.send(result); // Send back the saved notice object as response
    } catch (err) {
        res.status(500).json(err); // Handle any errors that occur during creation and saving of the notice
    }
};

// Function to fetch a list of notices for a specific school
const noticeList = async (req, res) => {
    try {
        let notices = await Notice.find({ school: req.params.id }); // Find all notices associated with the specified school ID
        if (notices.length > 0) {
            res.send(notices); // Send the list of notices as response if found
        } else {
            res.send({ message: "No notices found" }); // Send a message if no notices are found
        }
    } catch (err) {
        res.status(500).json(err); // Handle any errors that occur during fetching of notices
    }
};

// Function to update a specific notice by its ID
const updateNotice = async (req, res) => {
    try {
        const result = await Notice.findByIdAndUpdate(
            req.params.id, // ID of the notice to update
            { $set: req.body }, // Update fields based on request body
            { new: true } // Return the updated notice object
        );
        res.send(result); // Send back the updated notice object as response
    } catch (error) {
        res.status(500).json(error); // Handle any errors that occur during update operation
    }
};

// Function to delete a specific notice by its ID
const deleteNotice = async (req, res) => {
    try {
        const result = await Notice.findByIdAndDelete(req.params.id); // Find and delete the notice by its ID
        res.send(result); // Send back the deleted notice object as response
    } catch (error) {
        res.status(500).json(err); // Handle any errors that occur during deletion
    }
};

// Function to delete all notices associated with a specific school
const deleteNotices = async (req, res) => {
    try {
        const result = await Notice.deleteMany({ school: req.params.id }); // Delete all notices associated with the specified school ID
        if (result.deletedCount === 0) {
            res.send({ message: "No notices found to delete" }); // Send a message if no notices were deleted
        } else {
            res.send(result); // Send back the deletion result object
        }
    } catch (error) {
        res.status(500).json(err); // Handle any errors that occur during deletion
    }
};

module.exports = {
    noticeCreate,
    noticeList,
    updateNotice,
    deleteNotice,
    deleteNotices
};
