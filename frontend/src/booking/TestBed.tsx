import  {useState} from 'react';
import './TestBed.css'; // Import your CSS file for styling
import { Col, Row, Button, Container, InputGroup, Form, Table } from 'react-bootstrap';

const TestBed = () => {
  return (
    <div className="image-container">
      <img src="./IMG_3324.JPG" alt="Your Image" className="image" />
      
      <Button href="/booking/create-parking" type="submit" variant="warning" className="first image-button">Book me!</Button>

      <Button href="/booking/create" type="submit" variant="primary" className="second image-button">Book me!</Button>
    </div>
  );
};

export default TestBed;
