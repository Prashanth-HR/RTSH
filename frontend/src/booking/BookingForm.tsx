import { useState } from 'react';
import { Col, Row, Button, Container, InputGroup, Form, Table } from 'react-bootstrap';
import { createBooking, checkBookAvailability, checkBookAvailabilityParking, createBookingParking } from '../services/services';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router';



const BookingForm = (type = 'normal') => {
  const navigate = useNavigate();

  const [startDateTime, setStartDate] = useState('');
  const [endDateTime, setEndDate] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');

  const [availabilityChecked, setAvailabilityChecked] = useState(false);

  const handleCheckAvailability = () => {
    // Add logic to check availability based on the provided dates
    // You can make an API request to the server to check availability
    // Update the UI or show a message accordingly
    const data = {
      'start_datetime': startDateTime,
      'end_datetime': endDateTime,
    }
    if (type == 'normal') {
      checkBookAvailability(data).then((response) => {
        console.log(response)
        let available = response.data.available
        setAvailabilityChecked(available)
        if (available != true) {
          window.alert('The selected slot is not available')
        }
      })
    } else {
      checkBookAvailabilityParking(data).then((response) => {
        console.log(response)
        let available = response.data.available
        setAvailabilityChecked(available)
        if (available != true) {
          window.alert('The selected slot is not available')
        }
      })
    }

  };

  const handleBook = () => {
    // Add logic to handle the booking
    // You can make an API request to the server to save the booking
    // Update the UI or show a confirmation message
    const formData = {
      'start_datetime': startDateTime,
      'end_datetime': endDateTime,
      'name': name,
      'email': email,
      'description': description,
    }
    if (type == "normal") {
      createBooking(formData).then(() => {
        console.log('Normal Booking Created');
        navigate('/vehicles')
      })
    }else{
      createBookingParking(formData).then(() => {
        console.log('Parking Booking Created');
        navigate('/vehicles')
      })
    }
  };

  return (
    <div>
      <h2>Booking Form</h2>
      <Row>
        <Col md={{ span: 4, offset: 4 }}>
          <Form>
            <Form.Group controlId="startDate">
              <Form.Label>Start Date:</Form.Label>
              <br />
              <DatePicker
                selected={startDateTime}
                onChange={date => setStartDate(date)}
                showTimeSelect
                dateFormat="Pp"
                timeIntervals={15}
              />
              {/* <Form.Control
                type="date"
                value={startDateTime}
                onChange={(e) => setStartDate(e.target.value)}
              /> */}
            </Form.Group>
            <br />
            <Form.Group controlId="endDate">
              <Form.Label>End Date:</Form.Label>
              <br />
              <DatePicker
                selected={endDateTime}
                onChange={date => setEndDate(date)}
                showTimeSelect
                dateFormat="Pp"
                minDate={startDateTime}
                timeIntervals={15}
              />
              {/* <Form.Control
                type="date"
                value={endDateTime}
                onChange={(e) => setEndDate(e.target.value)}
              /> */}
            </Form.Group>
            <br />
            <Button
              variant="primary"
              onClick={handleCheckAvailability}
            >
              Check Availability
            </Button>

            {availabilityChecked && (
              <>
                <Form.Group controlId="name">
                  <Form.Label>Name:</Form.Label>
                  <Form.Control
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Form.Group>
                <br />
                <Form.Group controlId="email">
                  <Form.Label>Email:</Form.Label>
                  <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>
                <br />
                <Button
                  variant="success"
                  onClick={handleBook}
                >
                  Book
                </Button>
              </>
            )}
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default BookingForm;
