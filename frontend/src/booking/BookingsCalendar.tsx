import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { getBookings, getBookingsParking } from "src/services/services";

export const BookingsCalender = () => {

    const [bookings, setBookings] = useState([])
    const [bookingsParking, setBookingsParking] = useState([])
  
    const fetchBookings = async () => {
      const result = await getBookings();
      console.log(result)
      setBookings(result.data);
    };
  
    const fetchBookingsParking = async () => {
      const result = await getBookingsParking();
      console.log(result)
      setBookingsParking(result.data);
    };
  
    const isParkingLotReservation = (reservation) => {
      return bookingsParking.includes(reservation);
    };
  
    let allBookings = [...bookings, ...bookingsParking];
  
    useEffect(() => {
      fetchBookings();
      fetchBookingsParking();
    }, [])
  
    return (
      <>
        <Row>
          <Col md={{ span: 10, offset: 1 }}>
            <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin]}
              initialView="timeGridWeek"
              events={allBookings.map(booking => ({
                title: `${booking.description || 'Reserved'} - ${booking.name} - ${booking.email}`,
                start: booking.start_datetime,
                end: booking.end_datetime,
                color: isParkingLotReservation(booking) ? '#ff7f50' : '#007bff',
                // Add more properties as needed
                extendedProps: {
                  email: booking.email,
                  name: booking.name,
                  description: booking.description
                }
              }))}
            />
          </Col>
        </Row>
  
      </>
    )
  }