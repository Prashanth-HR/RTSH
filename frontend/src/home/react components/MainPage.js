import React from 'react';
import './main-page.css';
import { useNavigate } from 'react-router-dom';

import { DiscoverMore } from "./DiscoverMore";
import { BookDemo } from "./BookDemo";
import { BookConsultation } from "./BookConsultation";

export const MainPage = () => {
    const navigate =useNavigate();

    const gotoBooking = () => {
        navigate('/bookingpage');
    };

    return (
        <div className="homepage">
        <div className="background-container">

            <div className="background-image"></div>
            <div className="text-container">
                <h1>STUWERK TRACKS</h1>
                <p>Accelerate Innovation: Your Prototypes, Our Playground</p>
                <button onClick={gotoBooking}>INQUIRE NOW</button>
            </div>


        </div>
        {/* Additional components */}
        <DiscoverMore />
        <br></br>
        <BookDemo />
        <br></br>
        <BookConsultation />
        </div>
    );
};

