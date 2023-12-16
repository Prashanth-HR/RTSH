import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './home/Home.tsx';
import InfoPage from "./home/react components/InfoPage.js";
import BookingPage from "./home/react components/BookingPage";
import BookingConsultPage from "./home/react components/BookingConsultPage";

import {MainPage} from './home/react components/MainPage.js';

const App = () => {
    return (
        <>
            <div className="App">
            <Router>
                <Routes>
                    <Route path='/' element={<MainPage/>} />
                    <Route path='/infopage' element={<InfoPage/>} />
                    <Route path='/bookingpage' element={<BookingPage/>} />
                    <Route path='/bookingconsultpage' element={<BookingConsultPage/>} />
                </Routes>
            </Router>
            </div>
        </>
    );
};

export default App;

