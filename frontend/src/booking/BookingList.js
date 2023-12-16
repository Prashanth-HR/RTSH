import React, { useEffect, useState } from 'react';
import { Col, Row, Button, Container, InputGroup, Form, Table } from 'react-bootstrap';
import { getBookings } from '../services/services'

const BookingList = () => {

  const [bookings, setBookings] = useState([])

  const fetchBookings = async () => {
    const result = await getBookings();
    setBookings(result.data);
  };

  //useEffect(() => {
  //  fetchBookings();
  //}, [])

  return (
    <>
      <div className="booking-list">
        <h2>Bookings</h2>
        <Row>
          <Col md={{ span: 4, offset: 8 }}>
            <Button href="/vehicles/create">New Vehicle</Button>
          </Col>
        </Row>
        <ul>
          {bookings.map((booking) => (
            <li key={booking.id}>
              <span>{booking.name}</span>
              <span>{booking.date}</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default BookingList;
