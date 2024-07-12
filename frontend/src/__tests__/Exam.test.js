import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import StudentExamMarks from '../pages/admin/studentRelated/StudentExamMarks';
import '@testing-library/jest-dom';
import {  updateStudentFields } from '../redux/studentRelated/studentHandle';
import {  MemoryRouter, Route, Routes } from 'react-router-dom';

// Mocking the necessary actions
jest.mock('../redux/userRelated/userHandle.js', () => ({
  getUserDetails: jest.fn(),
}));
jest.mock('../redux/sclassRelated/sclassHandle.js', () => ({
  getSubjectList: jest.fn(),
}));
jest.mock('../redux/studentRelated/studentHandle.js', () => ({
  updateStudentFields: jest.fn(),
}));

const mockStore = configureStore([]);

describe('StudentExamMarks', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      user: {
        currentUser: { _id: '1', teachSubject: { subName: 'Math' } },
        userDetails: { _id: '2', name: 'John Doe', sclassName: { _id: '3' } },
        loading: false,
      },
      sclass: { subjectsList: [{ subName: 'Math', _id: '1' }, { subName: 'Science', _id: '2' }] },
      student: { response: null, error: null, statestatus: null },
    });

    store.dispatch = jest.fn();
  });

  test('renders loading state', () => {
    store = mockStore({
      user: {
        currentUser: { _id: '1', teachSubject: { subName: 'Math' } },
        userDetails: { _id: '2', name: 'John Doe', sclassName: { _id: '3' } },
        loading: true,
      },
      sclass: { subjectsList: [] },
      student: { response: null, error: null, statestatus: null },
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/admin/student/2']}>
          <Routes>
            <Route path='/admin/student/:id' element={<StudentExamMarks situation="Student" />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  test('renders StudentExamMarks and allows input', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/admin/student/2']}>
          <Routes>
            <Route path='/admin/student/:id' element={<StudentExamMarks situation="Student" />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Student Name: John Doe/i)).toBeInTheDocument();

    // Change subject
    fireEvent.mouseDown(screen.getByLabelText(/Select Subject/i));
    const listbox = screen.getByRole('listbox');
    fireEvent.click(listbox);
    expect(screen.getByText(/Math/i)).toBeInTheDocument();

    // Change marks
    fireEvent.change(screen.getByLabelText(/Enter marks/i), { target: { value: '95' } });
    expect(screen.getByLabelText(/Enter marks/i)).toHaveValue(95);

    // Submit form
    fireEvent.click(screen.getByRole('button', { name: /Submit/i }));

    await waitFor(() => {
      expect(updateStudentFields).toHaveBeenCalled();
      
    });
  });

  test('displays response message on successful submission', async () => {
    store = mockStore({
      user: {
        currentUser: { _id: '1', teachSubject: { subName: 'Math' } },
        userDetails: { _id: '2', name: 'John Doe', sclassName: { _id: '3' } },
        loading: false,
      },
      sclass: { subjectsList: [{ subName: 'Math', _id: '1' }, { subName: 'Science', _id: '2' }] },
      student: { response: 'Success', error: null, statestatus: 'added' },
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/admin/student/2']}>
          <Routes>
            <Route path='/admin/student/:id' element={<StudentExamMarks situation="Student" />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Done Successfully/i)).toBeInTheDocument();
  });

  test('displays error message on failed submission', async () => {
    store = mockStore({
      user: {
        currentUser: { _id: '1', teachSubject: { subName: 'Math' } },
        userDetails: { _id: '2', name: 'John Doe', sclassName: { _id: '3' } },
        loading: false,
      },
      sclass: { subjectsList: [{ subName: 'Math', _id: '1' }, { subName: 'Science', _id: '2' }] },
      student: { response: null, error: 'Error occurred', statestatus: null },
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/admin/student/2']}>
          <Routes>
            <Route path='/admin/student/:id' element={<StudentExamMarks situation="Student" />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/error/i)).toBeInTheDocument();
  });
});
