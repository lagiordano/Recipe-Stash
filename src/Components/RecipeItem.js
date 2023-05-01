import React from "react";
import { Link } from "react-router-dom";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import recipePlaceholder from "../images/recipePlaceholder.jpeg";

function RecipeItem ({name, image, id}) {

    
    const imageStyles = {
        height: '25vh'
    }


        

    return (
        <Col >
            <Link to={`/recipes/${id}`} className="text-decoration-none">
                <Card className="h-100" id="recipe-card" >
                    <Card.Img variant="top" src={image || recipePlaceholder} alt={name} style={imageStyles} />
                    <Card.Body className="d-flex align-items-center justify-content-center">
                        <Card.Title className="text-dark"> {name}</Card.Title>
                    </Card.Body>
                </Card>
            </Link>
        </Col>
    );
}

export default RecipeItem;