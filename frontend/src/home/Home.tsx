import { useState } from "react";
import { Nav, Navbar, Container } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import { BookingsCalender } from "src/booking/BookingsCalendar";
import BookingForm from '../booking/BookingForm';
import {Bookings} from '../booking/Bookings';


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
                    </Nav>
                </Container>
            </Navbar>
        </>
    )
}

const Body = () => {
    
    return (
        <>
            <Routes>
                <Route path='/'  />
                <Route path='/simulation'  />
                <Route path='/booking' element={<Bookings />} />
                <Route path='/booking/create' element={<BookingForm type='normal'/>} />
                <Route path='/booking/create-parking' element={<BookingForm type='parkingLot'/>} />
                
                <Route path='/booking/showbookings' element={<BookingsCalender />} />
            </Routes>

        </>
    )
}


export default Home