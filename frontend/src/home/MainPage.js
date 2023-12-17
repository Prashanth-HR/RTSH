import './main-page.css';
import './offer-page-template.css';
import "./book_demo.css"

import { useNavigate } from 'react-router';


export const MainPage = () => {
    const navigate =useNavigate();

    return (
        <div className="homepage">
            <StuwerkTracks navigate={navigate}/>
            <br />
            <DiscoverMore navigate={navigate}/>
            <br></br>
            <BookDemo navigate={navigate}/>
            <br></br>
            <BookConsultation navigate={navigate}/>
        </div>
    );
};

const StuwerkTracks = (props) => {

    return (
        <>
            <div className="background-container">
                <div className="background-image"></div>
                <div className="text-container">
                    <h1>STUWERK TRACKS</h1>
                    <p>Accelerate Innovation: Your Prototypes, Our Playground</p>
                    <button onClick={() => {props.navigate('/booking')}}>INQUIRE NOW</button>
                </div>
            </div>
        </>
    )
}

const DiscoverMore = (props) => {

    return (
        <OfferPageTemplate
            tagline="Discover the Hub"
            content="Explore the destination for breakthroughs"
            buttonText="LEARN MORE"
            onButtonClick={() => {props.navigate('/')}}
            imgsrc={require("./pictures used/car wheel.jpg")}
            imgalt="up close of rear wheel on a black car"
        />

    );
}

const BookDemo = (props) => {
    return (
        <div className="page-container-demo">
            <div className="picture-column-demo">
                <img className="photo-demo" src={require("./pictures used/road twisty.jpg")} alt="lone car on twisty road" />
            </div>
            <div className="content-column-demo">
                <h1 className="tagline-demo">Your Space, Your Pace</h1>
                <p className="content-demo">Reserve, Innovate, Succeed: Book your breakthrough today</p>
                <button onClick={() => {props.navigate('/booking/create')}}>RESERVE NOW</button>

            </div>
        </div>
    )
}

const BookConsultation = (props) => {
    return (
        <OfferPageTemplate
            tagline="Your Vision, Our Precision"
            content="Elevate prototypes with expert testing"
            buttonText="RESERVE NOW"
            onButtonClick={() => {props.navigate('/')}}
            imgsrc={require("./pictures used/engine.jpg")}
            imgalt="close up of a car engine"
        />
    );
}

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
