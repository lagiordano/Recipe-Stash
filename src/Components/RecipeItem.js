import React from "react";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import recipePlaceholder from "../recipePlaceholder.jpeg";

function RecipeItem ({name, image, url, madeCount, id}) {

    const imageStyles = {
        height: '30vh'
    }

    return (
        <Col >
            <Card className="h-100" >
                <Card.Img variant="top" src={image || recipePlaceholder} alt={name} style={imageStyles} />
                <Card.Body>
                    <Card.Title>{name}</Card.Title>
                    <Card.Text>
                        <a href={url} target="_blank" >Take me to the recipe!</a><br/>
                        {(madeCount > 0) ? <span>Made {madeCount} times!</span> : <span>You've not made this yet</span>}
                    </Card.Text>
                    <Button variant="primary">Increment Count</Button>
                </Card.Body>
            </Card>
        </Col>
    );
}

export default RecipeItem;