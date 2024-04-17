// Calendar.js
import React from 'react';

function Calendar({ events }) {
  return (
    <div className="calendar">
      <h2>Calendário</h2>
      <ul>
        {events.map((event, index) => (
          <li key={index}>{event.title} - {event.date}</li>
        ))}
      </ul>
    </div>
  );
}

export default Calendar;
