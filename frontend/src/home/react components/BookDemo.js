import React from 'react';
import './offer-page-template.css';
import { useNavigate } from 'react-router-dom';
import "./book_demo.css"
export const BookDemo = () => {
    const navigate = useNavigate();
    const redirectToBookingPage = () => {
        navigate('/bookingpage');
    };

    return (
        <div className="page-container-demo">
            <div className="picture-column-demo">
                <img className="photo-demo" src={require("./pictures used/road twisty.jpg")} alt="lone car on twisty road" />
            </div>
            <div className="content-column-demo">
                <h1 className="tagline-demo">Your Space, Your Pace</h1>
                <p className="content-demo">Reserve, Innovate, Succeed: Book your breakthrough today</p>
                <button onClick={redirectToBookingPage}>RESERVE NOW</button>

            </div>
        </div>

);
};