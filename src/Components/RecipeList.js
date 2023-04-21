import React from "react";
import RecipeItem from "./RecipeItem";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function RecipeList ({recipes}) {



    return (
        <Container >
            <Row xs={1} sm={1} md={2} lg={3} xl={4} className="g-3">
                {recipes.map(recipe => <RecipeItem key={recipe.id} name={recipe.name} image={recipe.image} url={recipe.url} madeCount={recipe.madeCount} id={recipe.id} /> )}
            </Row>
        </Container>
    )
}

export default RecipeList;