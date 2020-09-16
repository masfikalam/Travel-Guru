import React, { useState } from 'react';
import './Destination.css'
import { Button, Col, Container, Form, FormControl, InputGroup, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import fakeData from '../../FakeData/FakeData';

const Destination = () => {
    const {placeName} = useParams();
    const destination = fakeData.find(place => place.name === placeName);
    const [stay, setStay] = useState({from:0, to:0});

    // difference of days
    const fromDay = new Date(stay.from);
    const toDay = new Date(stay.to);
    const diff = Math.abs(fromDay - toDay);
    const totalDays = (((diff/1000)/3600)/24);

    return (
        <section className="destination text-white">
            <Container>
                <Row className="align-items-center">
                    <Col lg={5} className="mb-5 mb-lg-0">
                        <h3 className="placeName text-center text-md-left my-4">{destination.name}</h3>
                        <p className="text-justify">{destination.longDesc}</p>
                    </Col>
                    <Col lg={2} className="d-none d-lg-block"></Col>
                    <Col lg={5} className="mb-5 mb-lg-0">
                        <Form className="text-dark">
                            <InputGroup className="mb-3">
                                <InputGroup.Prepend>
                                <InputGroup.Text>Destination</InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl className="bg-white" aria-label="destination" readOnly value={destination.name} />
                            </InputGroup>
                            
                            <InputGroup className="mb-3">
                                <InputGroup.Prepend>
                                <InputGroup.Text>Origin</InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl aria-label="Origin" />
                            </InputGroup>

                            <InputGroup className="mb-3">
                                <InputGroup.Prepend>
                                <InputGroup.Text>From</InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl name="from" type="date" onChange={(e) => {
                                    const newFrom = {...stay};
                                    newFrom.from = e.target.value;
                                    setStay(newFrom)
                                    }} />
                            </InputGroup>

                            <InputGroup className="mb-3">
                                <InputGroup.Prepend>
                                <InputGroup.Text>To</InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl name="to" type="date" onChange={(e) => {
                                    const newTo = {...stay};
                                    newTo.to = e.target.value;
                                    setStay(newTo)
                                    }} />
                            </InputGroup>

                            <Button variant="warning" className="btn-large btn-block">Travel For {stay.to ? totalDays : 0} Days</Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default Destination;