import { MainPage } from './MainPage.js';
import { Nav, Navbar, Container, Alert } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import { BookingsCalender } from "src/booking/BookingsCalendar";
import BookingForm from '../booking/BookingForm';
import { Bookings } from '../booking/Bookings';
import Simulation from '../simulation/Simulation'


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
                        <Nav.Link href="/get-certified">Get Certified</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </>
    )
}

const GetCertified = () => {
        return (
            <Alert variant="success">
              <Alert.Heading>Hey, nice to see you</Alert.Heading>
              <div>
                U can get your route planning software certified by us. Please contact "info@stuwerk-tracks.mail" .
              </div>
            </Alert>
          );
}
const Body = () => {

    return (
        <>
            <Routes>
                <Route path='/' element={<MainPage/>}/>
                <Route path='/simulation' element={<Simulation />}/>
                <Route path='/booking' element={<Bookings />} />
                <Route path='/booking/create' element={<BookingForm type='normal' />} />
                <Route path='/booking/create-parking' element={<BookingForm type='parkingLot' />} />

                <Route path='/booking/showbookings' element={<BookingsCalender />} />
                <Route path='/get-certified' element={<GetCertified />} />

            </Routes>

        </>
    )
}


export default Home