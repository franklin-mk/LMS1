// admin-controller.test.js

const bcrypt = require('bcrypt');
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../index'); // Assuming your Express app is defined in app.js
const Admin = require('../models/adminSchema');

// Mocking a test admin object for registration
const testAdmin = {
    name: 'Test Admin',
    email: 'test@admin.com',
    password: 'testpassword',
    schoolName: 'Test School'
};

beforeAll(async () => {
    // Connect to a mock database
    await mongoose.connect('mongodb+srv://mfranklin:Xranklin431@cluster0.cl54dys.mongodb.net/school1?retryWrites=true&w=majority&appName=Cluster0',{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    });
});

afterAll(async () => {
    // Disconnect mongoose connection after all tests
    await mongoose.disconnect();
});

describe('Admin Registration API', () => {
    it('should register a new admin', async () => {
        const response = await request(app)
            
        // Add more assertions as needed
    });

    it('should not register with existing email', async () => {
        // Simulate existing admin with same email in database
        await Admin.create(testAdmin);

        const response = await request(app)
            .post('/AdminReg')
            .send(testAdmin)
            .expect(200);

        expect(response.body).toEqual({ message: 'Email already exists' });
    });
});

describe('Admin Login API', () => {
    it('should log in with correct credentials', async () => {
        const response = await request(app)
            
    });

    it('should return error with incorrect password', async () => {
        const response = await request(app)
            
           

        
    });
});

describe('Admin Detail API', () => {
    let adminId;

    beforeAll(async () => {
        // Create a test admin and store its ID for use in tests
        const createdAdmin = await Admin.create(testAdmin);
        adminId = createdAdmin._id;
    });

    it('should get admin details by ID', async () => {
        const response = await request(app)
            .get(`/Admin/${adminId}`)
            .expect(200);

        expect(response.body).toHaveProperty('_id', adminId.toHexString());
        expect(response.body.name).toBe(testAdmin.name);
        // Add more assertions as needed
    });

    it('should return error for non-existing admin ID', async () => {
        const nonExistingId = mongoose.Types.ObjectId(); // Generate a non-existing ID

        const response = await request(app)
            .get(`/Admin/${nonExistingId}`)
            .expect(200); // Assuming you handle 404 in controller

        expect(response.body).toEqual({ message: 'No admin found' });
    });
});
