import React from "react";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";


function NavBar () {

    return (
            <Navbar collapseOnSelect expand="lg" className="p-2" id="nav-style">
                <Container>
                    <Navbar.Brand href="/" className="fs-1 ps-2 ps-lg-4 ps-xl-5 " id="brand">Recipe Stash</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" className="pe-2 pe-md-4 pe-lg-5" >
                        <Nav className="me-auto">
                            <NavLink to="/recipes" className="px-3 fs-3">Your Recipes</NavLink>
                            <NavLink to="/new_recipe" className="px-3 fs-3">Add Recipe</NavLink>
                            <NavLink to="/meal_inspiration" className="px-3 fs-3">Meal Inspo</NavLink>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        
);
    
}

export default NavBar;