import React from 'react';

function BookingList({ bookings, onRemoveBooking }) {
  return (
    <div className="booking-list">
      <h2>Bookings</h2>
      <ul>
        {bookings.map((booking) => (
          <li key={booking.id}>
            <span>{booking.name}</span>
            <span>{booking.date}</span>
            <button onClick={() => onRemoveBooking(booking.id)}>Cancel</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BookingList;
