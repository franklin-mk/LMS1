/* 
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
*/

// src/pages/admin/AdminCalendarPage.js
import React, { useState, useEffect } from 'react';
import MyCalendar from '../../../components/Calendar';

const AdminCalendarPage = () => {
  const [events, setEvents] = useState(() => {
    const savedEvents = localStorage.getItem('events');
    return savedEvents ? JSON.parse(savedEvents) : [
      {
        title: 'Mid-term Exam',
        start: new Date(),
        end: new Date(),
      },
    ];
  });
  
  const [title, setTitle] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');

  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(events));
  }, [events]);

  const addEvent = () => {
    const newEvent = {
      title,
      start: new Date(start),
      end: new Date(end),
    };
    setEvents([...events, newEvent]);
    setTitle('');
    setStart('');
    setEnd('');
  };

  return (
    <div>
      <h1 id="calendar">Calendar</h1>
      <div id='add-event' style={{ margin: '1.25rem' }}>
        <input
          id='calendar-input'
          type="text"
          placeholder="Event Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          id='calendar-input'
          type="datetime-local"
          placeholder="Start Date"
          value={start}
          onChange={(e) => setStart(e.target.value)}
          required
        />
        <input
          id='calendar-input'
          type="datetime-local"
          placeholder="End Date"
          value={end}
          onChange={(e) => setEnd(e.target.value)}
          required
        />
        <button onClick={addEvent}>Add Event</button>
      </div>
      <MyCalendar events={events} />
    </div>
  );
};

export default AdminCalendarPage;
