import React from "react";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import icon from "../images/frypan.png";


function NavBar () {

    return (
            <Navbar collapseOnSelect expand="lg" className="p-2" id="nav-style">
                <Container>
                        <Navbar.Brand href="/" className="fs-2 ps-2 ps-md-4 ps-lg-5" id="brand">
                            <img src={icon} alt="fry pan logo" width="38" height="35" className="d-inline-block align-top mt-md-1 me-1 me-lg-2 " />
                            {'  '}Recipe Stash</Navbar.Brand>
                    
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav" className="pe-2 pe-md-4 pe-lg-5 justify-content-end" >
                            <Nav className="">
                                <NavLink to="/recipes" className="px-3 fs-4">Your Recipes</NavLink>
                                <NavLink to="/new_recipe" className="px-3 fs-4">Add Recipe</NavLink>
                                <NavLink to="/meal_inspiration" className="px-3 fs-4">Meal Inspo</NavLink>
                            </Nav>
                        </Navbar.Collapse>
                </Container>
            </Navbar>
        
);
    
}

export default NavBar;