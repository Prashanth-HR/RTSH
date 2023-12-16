import { useState } from "react";
import { Nav, Navbar, Container } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import BookingForm from '../booking/BookingForm';
import BookingList from '../booking/BookingList';


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

    const [bookings, setBookings] = useState([]);

    // Function to add a new booking to the list
    const addBooking = (newBooking) => {
      setBookings([...bookings, newBooking]);
    };
  
    // Function to remove a booking from the list
    const removeBooking = (id) => {
      const updatedBookings = bookings.filter((booking) => booking.id !== id);
      setBookings(updatedBookings);
    };

    
    return (
        <>
            <Routes>
                <Route path='/'  />
                <Route path='/simulation'  />
                <Route path='/booking' element={<BookingList bookings={bookings} onRemoveBooking={removeBooking} />} />
                <Route path='/booking/create' element={<BookingForm onAddBooking={addBooking} />} />
            </Routes>
        </>
    )
}

export default Home