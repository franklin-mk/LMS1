//src/components/Calendar.js
// Calendar.js
import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

// Setup the localizer by providing the moment (or globalize) Object
// The localizer is responsible for handling date formatting and parsing
const localizer = momentLocalizer(moment);

// Define the MyCalendar component
// It takes 'events' as a prop which is an array of event objects
const MyCalendar = ({ events }) => (
  // Define a div to contain the calendar with a fixed height and padding
  <div style={{ height: '500px', padding: '20px' }}>
    {/* Render the Calendar component */}
    <Calendar
      // Provide the localizer for date formatting and parsing
      localizer={localizer}
      // Provide the events to the Calendar component
      events={events}
      // Define the start accessor to determine the start time of events
      startAccessor="start"
      // Define the end accessor to determine the end time of events
      endAccessor="end"
      // Style the calendar to take the full height of its container
      style={{ height: '100%' }}
    />
  </div>
);

// Export the MyCalendar component as the default export
export default MyCalendar;