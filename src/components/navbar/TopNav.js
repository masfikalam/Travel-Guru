import React from 'react';
import './Navbar.css'
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import logo from './travel.png';
import { Link } from 'react-router-dom';

const TopNav = () => {
    return (
        <Navbar collapseOnSelect expand="lg" variant="dark" fixed="top" id="nav">
            <Container fluid>
                <Link to="/">
                    <Navbar.Brand>
                        <img src={logo} alt="Travel Guru" width="100px" height="50px" />
                    </Navbar.Brand>
                </Link>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav" className="text-center">
                    <Nav className="ml-auto">
                        <Nav.Link className="text-white">Blogs</Nav.Link>
                        <Nav.Link className="text-white">News</Nav.Link>
                        <Nav.Link className="text-white">Destinations</Nav.Link>
                        <Nav.Link className="text-white">About</Nav.Link>
                        <Button variant="warning" className="mx-2">Login</Button>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default TopNav;