import React, { useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import './Home.css';
import fakeData from '../../FakeData/FakeData';
import { Link } from 'react-router-dom';

const Home = () => {
    const places = fakeData;
    const [showPlace, setShowPlace] = useState(places[0]);

    return (
        <section id="home" className="text-white">
            <Container>
                <Row className="pb-5">
                    <Col lg={8}>
                        <Row>
                            {places.map(place =>
                                <Col className="placePhoto" sm={4} key={place.name}>
                                    <Button onClick={() => setShowPlace(place)} className="small mt-3 text-white d-block bg-transparent">
                                        <img src={place.photo} alt="" className="photo" />
                                        {place.name}
                                    </Button>
                                </Col>)}
                        </Row>
                    </Col>
                    <Col lg={4} className="text-center text-lg-right">
                        <h1 className="placeName my-3">{showPlace.name}</h1>
                        <p className="text-justify">{showPlace.shortDesc}</p>
                        <Link to={"/destination/" + showPlace.name}>
                            <Button variant="warning">Book Now</Button>
                        </Link>
                    </Col>
                </Row>
                <h1 className="placeName text-center pb-5 mb-0 mt-5"> Travel Guru Helps You Travel Around Bangladesh With Luxury And Lower Cost</h1>
            </Container>
        </section>
    );
};

export default Home;