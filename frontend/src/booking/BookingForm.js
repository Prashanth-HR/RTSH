import React, { useState } from 'react';
import { Col, Row, Button, Container, InputGroup, Form, Table } from 'react-bootstrap';

function BookingForm({ onAddBooking }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() === '' || endDate.trim() === '' || startDate.trim() === '' || phone.trim() === '') {
      return;
    }

    const newBooking = {
      id: new Date().getTime(),
      name,
      endDate,
      startDate,
    };

    onAddBooking(newBooking);

    setName('');
    setStartDate('');
    setEndDate('');
  };

  return (
    <div className="booking-form">
      <h2>Add a Booking</h2>
      <form onSubmit={handleSubmit}>
        <Row>
          <Col> 
          
          <InputGroup className="mb-3">
      <InputGroup.Text id="start-date-addon">Start Date</InputGroup.Text>
      <Form.Control
        type="date"
        placeholder="Select start date"
        aria-label="Start date"
        aria-describedby="start-date-addon"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
      />
    </InputGroup>
        </Col>
        

        <Col> 
        <InputGroup className="mb-3">
      <InputGroup.Text id="end-date-addon">End Date</InputGroup.Text>
      <Form.Control
        type="date"
        placeholder="Select end date"
        aria-label="End date"
        aria-describedby="end-date-addon"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
      />
    </InputGroup>
        </Col>
        
        <Col> 
      
        <Button type="submit" variant="secondary" >Check the booking</Button>{' '}
        </Col>
        
        </Row> 

        <Row>
          <Col>
          <InputGroup className="mb-3">
          <InputGroup.Text id="phone-addon">Name</InputGroup.Text>
      <Form.Control
        placeholder="John"
        aria-label="Name"
        aria-describedby="basic-addon1"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
    </InputGroup>
          </Col> 

        <Col>
        <InputGroup className="mb-3">
      <InputGroup.Text id="phone-addon">Phone</InputGroup.Text>
      <Form.Control
        placeholder="+49 123 456 78 89"
        aria-label="Phone number"
        aria-describedby="phone-addon"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
    </InputGroup>
        </Col>
        <Col>
        <Button type="submit" variant="secondary">    Book    </Button>{' '}
       
        </Col>
        
        </Row>
      </form>
    </div>
  );
}

export default BookingForm;
