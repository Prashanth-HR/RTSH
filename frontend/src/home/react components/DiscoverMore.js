import React from 'react';
import './offer-page-template.css';
import OfferPageTemplate from "./OfferPageTemplate";
import { useNavigate } from 'react-router-dom';

export const DiscoverMore = () => {
        const navigate = useNavigate();
        const redirectToInfoPage = () => {
            navigate('/infopage');
        };

    return (
        <OfferPageTemplate
            tagline="Discover the Hub"
            content="Explore the destination for breakthroughs"
            buttonText="LEARN MORE"
            onButtonClick={redirectToInfoPage}
            imgsrc={require("./pictures used/car wheel.jpg")}
            imgalt = "up close of rear wheel on a black car"
        />

    );
};

