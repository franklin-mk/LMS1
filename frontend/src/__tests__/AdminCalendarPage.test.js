import React from 'react';
import { render, screen } from '@testing-library/react';
import AdminCalendarPage from '../pages/admin/calendarRelated/AdminCalendarPage';
import '@testing-library/jest-dom';

// Mock the MyCalendar component
jest.mock('../components/Calendar.js', () => {
  return ({ events }) => (
    <div>
      {events.map((event, index) => (
        <div key={index}>
          <span>{event.title}</span>
          <span>{event.start.toString()}</span>
          <span>{event.end.toString()}</span>
        </div>
      ))}
    </div>
  );
});

describe('AdminCalendarPage', () => {
  test('renders Calendar heading', () => {
    render(<AdminCalendarPage />);
    expect(screen.getByText(/Calendar/i)).toBeInTheDocument();
  });

  test('renders MyCalendar with events', () => {
    render(<AdminCalendarPage />);
    expect(screen.getByText(/Mid-term Exam/i)).toBeInTheDocument();
  });
});
