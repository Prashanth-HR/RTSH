import { useState } from "react";
import { Nav, Navbar, Container, Alert } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import { BookingsCalender } from "src/booking/BookingsCalendar";
import BookingForm from '../booking/BookingForm';
import { Bookings } from '../booking/Bookings';


const Home = () => {

    return (
        <>
            <Header />
            <Body />
            <Footer />
        </>
    )
}

const Header = () => {
    return (
        <div className="Header">
            <NavBar />
        </div>
    )
}

const Footer = () => {
    return (
        <div className="Footer">
        </div>
    )
}

const NavBar = () => {
    return (
        <>
            <Navbar >
                <Container>
                    <Navbar.Brand href="/">Home</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="/booking">Booking</Nav.Link>
                        <Nav.Link href="/simulation">Simulation</Nav.Link>
                        <Nav.Link href="/donations">Donations</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </>
    )
}

const Donations = () => {
    return (
        <Alert variant="success">
            <Alert.Heading>Hey, nice to see you</Alert.Heading>
            <p>
                Aww yeah, you successfully read this important alert message. This
                example text is going to run a bit longer so that you can see how
                spacing within an alert works with this kind of content.
            </p>
            <hr />
            <p className="mb-0">
                Whenever you need to, be sure to use margin utilities to keep things
                nice and tidy.
            </p>
        </Alert>
    )
}
const Body = () => {

    return (
        <>
            <Routes>
                <Route path='/' />
                <Route path='/simulation' />
                <Route path='/booking' element={<Bookings />} />
                <Route path='/booking/create' element={<BookingForm type='normal' />} />
                <Route path='/booking/create-parking' element={<BookingForm type='parkingLot' />} />

                <Route path='/booking/showbookings' element={<BookingsCalender />} />
                <Route path='/donations' element={<Donations />} />

            </Routes>

        </>
    )
}


export default Home