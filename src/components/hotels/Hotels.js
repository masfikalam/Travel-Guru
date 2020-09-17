import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import fakeData from '../../FakeData/FakeData';
import star from './star.png';

const Hotels = () => {
    const {placeName} = useParams();
    const {hotels, map} = fakeData.find(place => place.name === placeName);

    return (
        <section className="hotels text-white">
            <Container>
                <h3 className="text-center text-warning mb-3">{hotels.length} hotels are available for {placeName}</h3>
                <Row className="align-items-stretch">
                    <Col md={6}>
                        {hotels.map(hotel => 
                        <Row key={hotel.name} className="align-items-stretch bg-light p-3 text-dark rounded my-3">
                            <Col sm={6}>
                                <img src={hotel.photo} alt="" className="w-100 h-100 mb-3"/>
                            </Col>
                            <Col sm={6}>
                                <h5>{hotel.name}</h5>
                                <div className="d-flex justify-content-between">
                                    <h6><img src={star} className="w-25 mb-1 mr-1" alt=""/>{hotel.rating}</h6>
                                    <h6>Night: ${hotel.perNight}</h6>
                                </div>
                                <ul className="list-unstyled mt-4">
                                    <p>AC / nonAC, Free Wifi, Bathroom</p>
                                    <li>
                                        <button className="btn btn-warning rounded-pill btn-sm btn-block mt-1">Book Now</button>
                                    </li>
                                </ul>
                            </Col>
                        </Row>)}
                    </Col>
                    <Col md={6} className="my-3">
                        <iframe title={placeName} src={map} width="100%" height="675" frameBorder="1" allowFullScreen="" aria-hidden="false" tabIndex="0"></iframe>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default Hotels;