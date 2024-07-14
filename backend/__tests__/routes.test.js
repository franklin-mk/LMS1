const chai = require('chai')
const chaiHttp = require('chai-http');
const app = require('../app'); // Adjust the path to your Express app
const { expect } = chai;

chai.use(chaiHttp);

describe('API Routes', () => {
  // Admin Tests
  describe('Admin API', () => {
    it('should register a new admin', (done) => {
      chai.request(app)
        .post('/AdminReg')
        .send({ username: 'admin', password: 'password123' })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('message').eql('Admin registered successfully');
          done();
        });
    });

    it('should log in an admin', (done) => {
      chai.request(app)
        .post('/AdminLogin')
        .send({ username: 'admin', password: 'password123' })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('token');
          done();
        });
    });

    it('should get admin details', (done) => {
      const adminId = '123456'; // Replace with a valid admin ID
      chai.request(app)
        .get(`/Admin/${adminId}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('username');
          done();
        });
    });
  });

  // Student Tests
  describe('Student API', () => {
    it('should register a new student', (done) => {
      chai.request(app)
        .post('/StudentReg')
        .send({ username: 'student', password: 'password123', classId: 'class123' })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('message').eql('Student registered successfully');
          done();
        });
    });

    it('should log in a student', (done) => {
      chai.request(app)
        .post('/StudentLogin')
        .send({ username: 'student', password: 'password123' })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('token');
          done();
        });
    });

    it('should get a list of students', (done) => {
      chai.request(app)
        .get('/Students/class123')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
          done();
        });
    });

    it('should get student details', (done) => {
      const studentId = 'student123'; // Replace with a valid student ID
      chai.request(app)
        .get(`/Student/${studentId}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('username');
          done();
        });
    });

    it('should delete a student', (done) => {
      const studentId = 'student123'; // Replace with a valid student ID
      chai.request(app)
        .delete(`/Student/${studentId}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('message').eql('Student deleted successfully');
          done();
        });
    });
  });

  // Teacher Tests
  describe('Teacher API', () => {
    it('should register a new teacher', (done) => {
      chai.request(app)
        .post('/TeacherReg')
        .send({ username: 'teacher', password: 'password123', classId: 'class123' })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('message').eql('Teacher registered successfully');
          done();
        });
    });

    it('should log in a teacher', (done) => {
      chai.request(app)
        .post('/TeacherLogin')
        .send({ username: 'teacher', password: 'password123' })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('token');
          done();
        });
    });

    it('should get a list of teachers', (done) => {
      chai.request(app)
        .get('/Teachers/class123')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
          done();
        });
    });

    it('should get teacher details', (done) => {
      const teacherId = 'teacher123'; // Replace with a valid teacher ID
      chai.request(app)
        .get(`/Teacher/${teacherId}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('username');
          done();
        });
    });

    it('should delete a teacher', (done) => {
      const teacherId = 'teacher123'; // Replace with a valid teacher ID
      chai.request(app)
        .delete(`/Teacher/${teacherId}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('message').eql('Teacher deleted successfully');
          done();
        });
    });
  });

  // Notice Tests
  describe('Notice API', () => {
    it('should create a new notice', (done) => {
      chai.request(app)
        .post('/NoticeCreate')
        .send({ title: 'New Notice', content: 'This is a new notice' })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('message').eql('Notice created successfully');
          done();
        });
    });

    it('should get a list of notices', (done) => {
      const noticeId = 'notice123'; // Replace with a valid notice ID
      chai.request(app)
        .get(`/NoticeList/${noticeId}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
          done();
        });
    });

    it('should delete a notice', (done) => {
      const noticeId = 'notice123'; // Replace with a valid notice ID
      chai.request(app)
        .delete(`/Notice/${noticeId}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('message').eql('Notice deleted successfully');
          done();
        });
    });
  });

  // Complain Tests
  describe('Complain API', () => {
    it('should create a new complain', (done) => {
      chai.request(app)
        .post('/ComplainCreate')
        .send({ title: 'New Complain', content: 'This is a new complain' })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('message').eql('Complain created successfully');
          done();
        });
    });

    it('should get a list of complains', (done) => {
      const complainId = 'complain123'; // Replace with a valid complain ID
      chai.request(app)
        .get(`/ComplainList/${complainId}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
          done();
        });
    });
  });

  // Sclass Tests
  describe('Sclass API', () => {
    it('should create a new class', (done) => {
      chai.request(app)
        .post('/SclassCreate')
        .send({ name: 'New Class' })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('message').eql('Class created successfully');
          done();
        });
    });

    it('should get a list of classes', (done) => {
      const classId = 'class123'; // Replace with a valid class ID
      chai.request(app)
        .get(`/SclassList/${classId}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
          done();
        });
    });

    it('should get class details', (done) => {
      const classId = 'class123'; // Replace with a valid class ID
      chai.request(app)
        .get(`/Sclass/${classId}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('name');
          done();
        });
    });

    it('should delete a class', (done) => {
      const classId = 'class123'; // Replace with a valid class ID
      chai.request(app)
    })
})
})
       
