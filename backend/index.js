// Importing required modules
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Initializing an Express application
const app = express();

// Importing routes
const Routes = require("./routes/route.js");

// Setting the port number from environment variables or defaulting to 5000
const PORT = process.env.PORT || 5000;

// Loading environment variables from a .env file
dotenv.config();

// Middleware to parse JSON requests with a body size limit of 10MB
app.use(express.json({ limit: '10mb' }));

// Middleware to enable Cross-Origin Resource Sharing (CORS)
app.use(cors());

// Connecting to MongoDB Atlas using the URL from environment variables
mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("Connected to MongoDB ATLAS")) // Logging successful connection
    .catch((err) => console.log("COULD NOT CONNECT TO DATABASE!", err)); // Logging connection errors

// Using the imported routes for handling requests
app.use('/', Routes);

// Starting the server and listening on the specified port
app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`);
});
