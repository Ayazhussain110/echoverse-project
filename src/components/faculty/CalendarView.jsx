import React, { useState } from 'react';
import { FiChevronLeft, FiChevronRight, FiCalendar } from 'react-icons/fi';

const CalendarView = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [appointments] = useState([
    { id: 1, studentName: 'Ahmed Raza', date: '2024-04-05', time: '10:00 AM', topic: 'Research Guidance' },
    { id: 2, studentName: 'Fatima Khan', date: '2024-04-05', time: '2:00 PM', topic: 'Project Discussion' },
    { id: 3, studentName: 'Ali Hassan', date: '2024-04-10', time: '11:00 AM', topic: 'Career Guidance' },
  ]);

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getAppointmentsForDay = (day) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return appointments.filter(apt => apt.date === dateStr);
  };

  return (
    <div className="faculty-calendar">
      <div className="calendar-header">
        <h2><FiCalendar /> Academic Calendar</h2>
        <div className="calendar-nav">
          <button onClick={prevMonth}><FiChevronLeft /></button>
          <span>{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</span>
          <button onClick={nextMonth}><FiChevronRight /></button>
        </div>
      </div>

      <div className="calendar-grid">
        {dayNames.map(day => <div key={day} className="calendar-weekday">{day}</div>)}
        
        {Array.from({ length: firstDay }).map((_, i) => (
          <div key={`empty-${i}`} className="calendar-day empty"></div>
        ))}
        
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const dayAppointments = getAppointmentsForDay(day);
          const isToday = new Date().toDateString() === new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toDateString();
          
          return (
            <div key={day} className={`calendar-day ${isToday ? 'today' : ''} ${dayAppointments.length > 0 ? 'has-appointments' : ''}`}>
              <span className="day-number">{day}</span>
              {dayAppointments.length > 0 && (
                <div className="day-appointments">
                  {dayAppointments.map(apt => (
                    <div key={apt.id} className="day-appointment" title={apt.topic}>
                      {apt.studentName} - {apt.time}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="upcoming-appointments">
        <h3>Upcoming Appointments</h3>
        <div className="upcoming-list">
          {appointments.map(apt => (
            <div key={apt.id} className="upcoming-item">
              <div className="upcoming-date">
                <span>{new Date(apt.date).toLocaleDateString()}</span>
                <span>{apt.time}</span>
              </div>
              <div className="upcoming-info">
                <strong>{apt.studentName}</strong>
                <p>{apt.topic}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CalendarView;