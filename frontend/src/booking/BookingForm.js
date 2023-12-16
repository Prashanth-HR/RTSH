import React, { useState } from 'react';

function BookingForm({ onAddBooking }) {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() === '' || date.trim() === '') {
      return;
    }

    const newBooking = {
      id: new Date().getTime(),
      name,
      date,
    };

    onAddBooking(newBooking);

    setName('');
    setDate('');
  };

  return (
    <div className="booking-form">
      <h2>Add Booking</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="date"
          placeholder="Date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <button type="submit">Book</button>
      </form>
    </div>
  );
}

export default BookingForm;
