import React from "react";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";


function RecipeItem ({name, image, url, madeCount, id}) {

    const imageStyles = {
        height: '30vh'
    }

    return (
        <Col >
            <Card className="h-100" >
                <Card.Img variant="top" src={image} alt={name} style={imageStyles} />
                <Card.Body>
                    <Card.Title>{name}</Card.Title>
                    <Card.Text>
                        <a href={url} target="_blank" >Take me to the recipe!</a>
                        {(madeCount > 0) ? <p>`Made ${madeCount} times!`</p> : <p>"You've not made this yet"</p>}
                    </Card.Text>
                    <Button variant="primary">Increase Made Count</Button>
                </Card.Body>
            </Card>
        </Col>
    );
}

export default RecipeItem;