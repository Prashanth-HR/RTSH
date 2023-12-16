import React from 'react';
import './offer-page-template.css'

const OfferPageTemplate = ({tagline, content, buttonText, onButtonClick, imgsrc, imgalt}) => {
    return (
        <div className="page-container">
            <div className="content-column">
            <h1 className="tagline">{tagline}</h1>
            <p className="content">{content}</p>
            <button onClick={onButtonClick}>{buttonText}</button>
            </div>
            <div className="picture-column">
                <img src={imgsrc} alt={imgalt} />
            </div>

        </div>
    );
};

export default OfferPageTemplate;