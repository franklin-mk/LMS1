//src/components/Calendar.js
// Calendar.js
import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

// Setup the localizer by providing the moment (or globalize) Object
const localizer = momentLocalizer(moment);

const MyCalendar = ({ events }) => (
  <div style={{ height: '500px', padding: '20px' }}>
    <Calendar
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
      style={{ height: '100%' }}
    />
  </div>
);

export default MyCalendar;
