import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import ViewStdAttendance from './ViewStdAttendance.js';


// Mock CustomBarChart component
jest.mock('../components/CustomBarChart.js', () => () => <div>Mocked CustomBarChart</div>);

// Mock data
const mockStore = configureStore([thunk]);
const initialState = {
  user: {
    userDetails: {
      attendance: [
        {
          subId: '1',
          subName: 'Math',
          present: 10,
          sessions: 12,
          allData: [{ date: '2023-07-01', status: 'Present' }, { date: '2023-07-02', status: 'Absent' }],
        },
        {
          subId: '2',
          subName: 'Science',
          present: 8,
          sessions: 10,
          allData: [{ date: '2023-07-03', status: 'Present' }, { date: '2023-07-04', status: 'Present' }],
        },
      ],
    },
    currentUser: { _id: '123' },
    loading: false,
    response: null,
    error: null,
  },
};

describe('ViewStdAttendance', () => {
  let store;

  beforeEach(() => {
    store = mockStore(initialState);
  });

  test('renders ViewStdAttendance component', () => {
    render(
      <Provider store={store}>
        <ViewStdAttendance />
      </Provider>
    );

    expect(screen.getByText(/Attendance/i)).toBeInTheDocument();
  });

  test('renders attendance table', () => {
    render(
      <Provider store={store}>
        <ViewStdAttendance />
      </Provider>
    );

    expect(screen.getByText('Math')).toBeInTheDocument();
    expect(screen.getByText('Science')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
    expect(screen.getByText('12')).toBeInTheDocument();
    expect(screen.getByText('8')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
  });

  test('renders chart section when chart tab is clicked', () => {
    render(
      <Provider store={store}>
        <ViewStdAttendance />
      </Provider>
    );

    fireEvent.click(screen.getByLabelText(/Chart/i));

    expect(screen.getByText('Mocked CustomBarChart')).toBeInTheDocument();
  });

  test('renders no attendance message when there is no attendance data', () => {
    const emptyState = {
      user: {
        userDetails: { attendance: [] },
        currentUser: { _id: '123' },
        loading: false,
        response: null,
        error: null,
      },
    };

    store = mockStore(emptyState);

    render(
      <Provider store={store}>
        <ViewStdAttendance />
      </Provider>
    );

    expect(screen.getByText(/Currently You Have No Attendance Details/i)).toBeInTheDocument();
  });

  test('toggles attendance details when button is clicked', () => {
    render(
      <Provider store={store}>
        <ViewStdAttendance />
      </Provider>
    );

    fireEvent.click(screen.getAllByText(/Details/i)[0]);

    expect(screen.getByText('Attendance Details')).toBeInTheDocument();
  });
});
