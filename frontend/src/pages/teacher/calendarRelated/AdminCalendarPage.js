//src/pages/admin/AdminCalendarPage.js
// AdminCalendarPage.js
import React, { useState } from 'react';
import MyCalendar from '../../../components/Calendar';

const AdminCalendarPage = () => {
  const [events, setEvents] = useState([
    {
      title: 'Mid-term Exam',
      start: new Date(),
      end: new Date(),
    },
    // Add more events here
  ]);

  return (
    <div>
      <h1 id='calendar'>Calendar</h1>
      <MyCalendar events={events} />
    </div>
  );
};

export default AdminCalendarPage;
