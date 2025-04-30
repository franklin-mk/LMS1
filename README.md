# MERN Stack Learning Management System
# update readme

This is a School Management System built using the MERN (MongoDB, Express.js, React, Node.js) stack. The frontend is developed with React and Vite, with styling done using CSS.

## Features

- *Admin Dashboard:* Administrators can manage student records, teacher information, courses, exams, assignments, track student attendance, add teachers, and view school performance metrics.
- *Student Dashboard:* Students have access to their own dashboard where they can view their class schedules, assignments, submit assignments, and track their academic progress.
- *Teachers Dashboard:* Teachers can manage class schedules, assign and grade exams and assignments, and view student performance metrics.

### Operations Include:
- *Adding Students:* Admins can add new student records, including personal details and academic information.
- *Class Management:* Admins can create and manage classes, assign teachers, and schedule classes.
- *Exam Management:* Teachers can create and manage exams, assign them to classes, and grade student submissions.
- *Assignment Management:* Teachers can create assignments, assign them to classes, and track student submissions.
- *Student Submission:* Students can submit assignments through the student dashboard.
- *Adding Teachers:* Admins can add new teachers to the system.
- *School Performance Metrics:* Admins can view various metrics related to the school's performance.

## Technologies Used

- *Frontend:* React, JavaScript
- *Backend:* Node.js, Express.js
- *Database:* MongoDB
- *Authentication:* JSON Web Tokens (JWT)
- *Deployment:* Render

## Deloyed Version:

https://lms1-frontend.onrender.com


## Application Walkthrough via presantation:

https://drive.google.com/file/d/1Paa8boOG6XV2zP0_QUEWZ2LKGDwVMj8l/view?usp=drive_link    





## Local Setup Instructions

1. *Get the repository:*

download as zip and then extract the files     OR
git clone https://github.com/franklin-mk/LMS1.git

2. *Install dependencies:*
- *Backend:*
cd backend
npm install

- *Frontend:*
cd frontend
npm install


3. *Set up environment variables:*

- Create a .env file in the backend directory.
- Define the following environment variables:
            MONGO_URL='with your mongodb url here'
            PORT=5000

- Create a .env file in the frontend directory.     
- Define the following environment variables:
          REACT_APP_API_URL='http://localhost:5000'
  

4. *Run the development servers:*  

- Start the backend server:

  cd backend
  npm start

- Start the frontend server:

  cd frontend 
  npm run dev
  

5. *Access the application locally:*

Open your browser and navigate to http://localhost:5173

Thank you
