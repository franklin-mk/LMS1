import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import App from '../App';
import { BrowserRouter } from 'react-router-dom';

const mockStore = configureStore([]);

describe('App', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      user: { currentRole: null },
    });
  });

  test('renders Homepage when currentRole is null', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText(/Homepage/i)).toBeInTheDocument();
  });

  test('renders AdminDashboard when currentRole is Admin', () => {
    store = mockStore({
      user: { currentRole: 'Admin' },
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText(/Admin Dashboard/i)).toBeInTheDocument();
  });

  test('renders StudentDashboard when currentRole is Student', () => {
    store = mockStore({
      user: { currentRole: 'Student' },
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText(/Student Dashboard/i)).toBeInTheDocument();
  });

  test('renders TeacherDashboard when currentRole is Teacher', () => {
    store = mockStore({
      user: { currentRole: 'Teacher' },
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText(/Teacher Dashboard/i)).toBeInTheDocument();
  });
});
