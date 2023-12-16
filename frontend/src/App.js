import React, { useState } from 'react';
import NavBar from './navbar/NavBar';
import BookingForm from './booking/BookingForm';
import BookingList from './booking/BookingList';

function App() {
  const [bookings, setBookings] = useState([]);

  // Function to add a new booking to the list
  const addBooking = (newBooking) => {
    setBookings([...bookings, newBooking]);
  };

  // Function to remove a booking from the list
  const removeBooking = (id) => {
    const updatedBookings = bookings.filter((booking) => booking.id !== id);
    setBookings(updatedBookings);
  };

  return (
    <div className="app">
      <NavBar />
      <div className="container">
        <BookingForm onAddBooking={addBooking} />
        <BookingList bookings={bookings} onRemoveBooking={removeBooking} />
      </div>
    </div>
  );
}

export default App;
