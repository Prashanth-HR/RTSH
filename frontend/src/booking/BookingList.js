import React, { useEffect, useState } from 'react';
import { Col, Row, Button, Container, InputGroup, Form, Table } from 'react-bootstrap';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';

import { getBookings } from '../services/services'

const BookingList = () => {

  const [bookings, setBookings] = useState([])

  const fetchBookings = async () => {
    const result = await getBookings();
    console.log(result)
    setBookings(result.data);
  };

  useEffect(() => {
    fetchBookings();
  }, [])

  return (
    <>
      <div className="booking-list">
        <h2>Bookings</h2>
        <Row>
          <Col md={{ span: 4, offset: 8 }}>
            <Button href="/booking/create">Create Booking</Button>
          </Col>
        </Row>
        <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin]}
                initialView="timeGridWeek"
                events={bookings.map(dateRange => ({
                    title: 'Reserved',
                    start: dateRange.start_datetime,
                    end: dateRange.end_datetime,
                }))}
            />
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
