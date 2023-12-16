import React, { useRef } from "react";
import './offer-page-template.css';
import OfferPageTemplate from "./OfferPageTemplate";
import { useNavigate } from 'react-router-dom';

export const BookConsultation = () => {
    const navigate = useNavigate();
    const redirectToBookingConsultPage = () => {
        navigate('/bookingconsultpage');
    };

    return (
        <OfferPageTemplate
            tagline="Your Vision, Our Precision"
            content="Elevate prototypes with expert testing"
            buttonText="RESERVE NOW"
            onButtonClick={redirectToBookingConsultPage}
            imgsrc={require("./pictures used/engine.jpg")}
            imgalt = "close up of a car engine"
        />
    );
};