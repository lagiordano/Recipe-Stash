import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import { NavLink } from "react-router-dom";


function NavBar () {

    return (
        <Navbar collapseOnSelect bg="dark" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand href="#home">Recipe Finder!</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/recipes">Recipes</Nav.Link>
                        <Nav.Link href="/new_recipe">Add New Recipe</Nav.Link>
                        <Nav.Link href="/meal_inspiration">Recipe Inspo!</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
);
    
}

export default NavBar;