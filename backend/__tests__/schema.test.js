const mongoose = require('mongoose');
const Admin = require('../models/adminSchema');

describe('Admin Model', () => {
  beforeAll(async () => {
    await mongoose.connect('mongodb://localhost:27017/testdb', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.disconnect();
  });

  afterEach(async () => {
    await Admin.deleteMany();
  });

  it('should create a new admin', async () => {
    const adminData = {
      name: 'Test Admin',
      email: 'testadmin@example.com',
      password: 'password123',
      schoolName: 'Test School',
    };

    const admin = new Admin(adminData);
    await admin.save();

    expect(admin._id).toBeDefined();
    expect(admin.name).toBe(adminData.name);
    expect(admin.email).toBe(adminData.email);
    expect(admin.schoolName).toBe(adminData.schoolName);
    expect(admin.role).toBe('Admin');
  });

  it('should fail validation if required fields are missing', async () => {
    const adminData = {
      email: 'testadmin@example.com',
      password: 'password123',
    };

    let err;
    try {
      const admin = new Admin(adminData);
      await admin.validate();
    } catch (error) {
      err = error;
    }

    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.name).toBeDefined();
    expect(err.errors.name.properties.type).toBe('required');
    expect(err.errors.schoolName).toBeDefined();
    expect(err.errors.schoolName.properties.type).toBe('required');
  });

  it('should fail validation if email or schoolName are not unique', async () => {
    const adminData1 = {
      name: 'Test Admin 1',
      email: 'testadmin@example.com',
      password: 'password123',
      schoolName: 'Test School',
    };

    const adminData2 = {
      name: 'Test Admin 2',
      email: 'testadmin@example.com',
      password: 'password456',
      schoolName: 'Test School',
    };

    const admin1 = new Admin(adminData1);
    await admin1.save();

    let err;
    try {
      const admin2 = new Admin(adminData2);
      await admin2.save();
    } catch (error) {
      err = error;
    }

    
  });

  // Add more tests as needed for specific scenarios like password validation, etc.
});
