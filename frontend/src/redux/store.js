// Importing configureStore from Redux Toolkit to set up the Redux store
import { configureStore } from '@reduxjs/toolkit';

// Importing the reducers from their respective slices
import { userReducer } from './userRelated/userSlice';
import { studentReducer } from './studentRelated/studentSlice';
import { noticeReducer } from './noticeRelated/noticeSlice';
import { sclassReducer } from './sclassRelated/sclassSlice';
import { teacherReducer } from './teacherRelated/teacherSlice';
import { complainReducer } from './complainRelated/complainSlice';

// Configuring the Redux store and combining the reducers
const store = configureStore({
    reducer: {
        user: userReducer,       // Reducer for user-related state
        student: studentReducer, // Reducer for student-related state
        teacher: teacherReducer, // Reducer for teacher-related state
        notice: noticeReducer,   // Reducer for notice-related state
        complain: complainReducer, // Reducer for complaint-related state
        sclass: sclassReducer    // Reducer for class-related state
    },
});

// Exporting the configured store to be used in the application
export default store;
