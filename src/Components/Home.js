import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";

function Home () {

    return (
        <Container class="home">
            <Row style={{height: "85vh"}}>
                <Col className="d-flex align-items-center justify-content-center">
                        <div class="border rounded mx-2 p-2 p-md-3 p-lg-4 welcome-message">
                            <h1 class="p-2">Welcome Back!</h1>
                            <h5 class="p-2">Browse your recipe collection <Link to={"/recipes"}>here</Link></h5>
                            <h5 class="p-2">Stuck for motivation?</h5>
                            <h5 class="p-2">Check out our <Link to={"/meal_inspiration"}>inspo page</Link> for ideas</h5>
                        </div>

                </Col>
            </Row>
        </Container>
    );

}

export default Home;