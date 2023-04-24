import React from "react";
import { Link } from "react-router-dom";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import recipePlaceholder from "../recipePlaceholder.jpeg";

function RecipeItem ({name, image, id}) {

    
    const imageStyles = {
        height: '30vh'
    }


        

    return (
        <Col >
            <Card className="h-100" >
                <Card.Img variant="top" src={image || recipePlaceholder} alt={name} style={imageStyles} />
                <Card.Body>
                    <Card.Title><Link to={`/recipes/${id}`}>{name}</Link></Card.Title>
                </Card.Body>
            </Card>
        </Col>
    );
}

export default RecipeItem;