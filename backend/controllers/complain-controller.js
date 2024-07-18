const Complain = require('../models/complainSchema.js');

// Function to create a new complaint
const complainCreate = async (req, res) => {
    try {
        const complain = new Complain(req.body); // Create a new complaint instance using request body
        const result = await complain.save(); // Save the complaint to the database
        res.send(result); // Send back the saved complaint object as response
    } catch (err) {
        res.status(500).json(err); // Handle any errors that occur during creation and saving of the complaint
    }
};

// Function to fetch a list of complaints for a specific school
const complainList = async (req, res) => {
    try {
        let complains = await Complain.find({ school: req.params.id }).populate("user", "name");
        // Find all complaints associated with the specified school ID, and populate the "user" field with the "name" property

        if (complains.length > 0) {
            res.send(complains); // Send the list of complaints as response if found
        } else {
            res.send({ message: "No complains found" }); // Send a message if no complaints are found
        }
    } catch (err) {
        res.status(500).json(err); // Handle any errors that occur during fetching of complaints
    }
};

module.exports = {
    complainCreate,
    complainList
};
