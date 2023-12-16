import { Button, Col, Container, Row } from 'react-bootstrap';
import TestBed from "./TestBed";

export const Bookings = () => {
  return (
    <>
      <Container>
        <h2>Bookings</h2>
        <Row>
          <Col md={{ span: 4, offset: 8 }}>
            <Button href="/booking/showbookings">Show Bookings</Button>
          </Col>
        </Row>
        <br />
        <Row>
          <Col md={{ span: 12 }}>
            <TestBed />
          </Col>
        </Row>
      </Container>
    </>
  )
}


