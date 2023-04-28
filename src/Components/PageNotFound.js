import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function PageNotFound () {
    return (
        <Container class="home">
            <Row style={{height: "80vh"}}>
                <Col className="d-flex align-items-center justify-content-center">
                        <div class="border border-danger rounded p-4 welcome-message">
                            <h4 class="text-danger">Sorry, no page could be found at this address</h4>
                        </div>

                </Col>
            </Row>
    </Container>
    )
}

export default PageNotFound;