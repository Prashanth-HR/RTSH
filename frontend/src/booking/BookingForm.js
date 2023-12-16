import React, { useState } from 'react';
import { Col, Row, Button, Container, InputGroup, Form, Table } from 'react-bootstrap';
import { createBooking, checkBookAvailability } from '../services/services';


const BookingForm = () => {
  const [startDateTime, setStartDate] = useState('');
  const [endDateTime, setEndDate] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');
  const [reservationType, setReservationType] = useState({
    normal: false,
    parkingLot: false
  });
  const [availabilityChecked, setAvailabilityChecked] = useState(false);

  const handleCheckAvailability = () => {
    // Add logic to check availability based on the provided dates
    // You can make an API request to the server to check availability
    // Update the UI or show a message accordingly
    const data = {
      'start_datetime': startDateTime,
      'end_datetime': endDateTime,
    }
    checkBookAvailability(data).then((response) => {
      console.log(response)
      setAvailabilityChecked(response.data.available)
    })
    console.log('Checking availability...');

    // Assuming availability check is successful
    //setAvailabilityChecked(true);
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
    createBooking(formData).then(
      console.log("Booking Done")
    )

    console.log('Booking...');
  };

  return (
    <div>
      <h2>Booking Form</h2>
      <Row>
        <Col md={{ span: 4, offset: 4 }}>
          <Form>
            <Form.Group controlId="startDate">
              <Form.Label>Start Date:</Form.Label>
              <Form.Control
                type="date"
                value={startDateTime}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </Form.Group>
            <br />
            <Form.Group controlId="endDate">
              <Form.Label>End Date:</Form.Label>
              <Form.Control
                type="date"
                value={endDateTime}
                onChange={(e) => setEndDate(e.target.value)}
              />
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
