import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import StudentSubjects from '../pages/student/StudentSubjects';
import '@testing-library/jest-dom/extend-expect';

import { BrowserRouter } from 'react-router-dom';

// Mocking the necessary actions
jest.mock('../redux/userRelated/userHandle.js', () => ({
  getUserDetails: jest.fn(),
  getSubjectList: jest.fn(),
}));

// Mock the CustomBarChart component
jest.mock('../components/CustomBarChart.js', () => {
  return ({ chartData, dataKey }) => (
    <div>
      {chartData.map((data, index) => (
        <div key={index}>
          <span>{data[dataKey]}</span>
        </div>
      ))}
    </div>
  );
});

const mockStore = configureStore([]);

describe('StudentSubjects', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      sclass: { subjectsList: [], sclassDetails: { sclassName: '10A' } },
      user: {
        userDetails: {
          examResult: [
            { subName: { subName: 'Math' }, marksObtained: 90 },
            { subName: { subName: 'Science' }, marksObtained: 85 },
          ],
        },
        currentUser: { _id: '123', sclassName: { _id: '456' } },
        loading: false,
        response: null,
        error: null,
      },
    });

    store.dispatch = jest.fn();
  });

  test('renders the table section with subject marks', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <StudentSubjects />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText(/Subject Marks/i)).toBeInTheDocument();
    expect(screen.getByText(/Math/i)).toBeInTheDocument();
    expect(screen.getByText('90')).toBeInTheDocument();
    expect(screen.getByText(/Science/i)).toBeInTheDocument();
    expect(screen.getByText('85')).toBeInTheDocument();
  });

  test('renders the chart section when selected', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <StudentSubjects />
        </BrowserRouter>
      </Provider>
    );

    fireEvent.click(screen.getByLabelText('Chart'));
    expect(screen.getByText('90')).toBeInTheDocument();
    expect(screen.getByText('85')).toBeInTheDocument();
  });

  test('renders class details section when no subject marks', () => {
    store = mockStore({
      sclass: {
        subjectsList: [
          { subName: 'Math', subCode: 'MTH101' },
          { subName: 'Science', subCode: 'SCI101' },
        ],
        sclassDetails: { sclassName: '10A' },
      },
      user: {
        userDetails: { examResult: [] },
        currentUser: { _id: '123', sclassName: { _id: '456' } },
        loading: false,
        response: null,
        error: null,
      },
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <StudentSubjects />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText(/Class Details/i)).toBeInTheDocument();
    expect(screen.getByText(/You are currently in Class 10A/i)).toBeInTheDocument();
    expect(screen.getByText(/Math/i)).toBeInTheDocument();
    expect(screen.getByText(/MTH101/i)).toBeInTheDocument();
    expect(screen.getByText(/Science/i)).toBeInTheDocument();
    expect(screen.getByText(/SCI101/i)).toBeInTheDocument();
  });

  test('displays loading state', () => {
    store = mockStore({
      sclass: { subjectsList: [], sclassDetails: null },
      user: {
        userDetails: null,
        currentUser: { _id: '123', sclassName: { _id: '456' } },
        loading: true,
        response: null,
        error: null,
      },
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <StudentSubjects />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });
});
