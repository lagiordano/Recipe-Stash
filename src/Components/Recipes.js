import React, {useState, useEffect} from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import RecipeSorter from "./RecipeSorter";
import RecipeItem from "./RecipeItem";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import { v4 as uuidv4 } from 'uuid';

function Recipes ({recipes, showDeleted, setShowDeleted}) {

    useEffect( () => {
        document.title = "Recipe Stash | Your Recipes";
    }, [])

    const [search, setSearch] = useState("");
    const [select, setSelect] = useState("all");
    
    
    
    function handleCategoryChange (e) {
        setSelect(e.target.value);
    }

    const filteredRecipes = recipes.filter( recipe => {
        if (select === "all") return true;

        return recipe.category === select;
    })

    const recipesToDisplay = filteredRecipes.filter(recipe => recipe.name.toLowerCase().includes(search.toLowerCase()));
   
    

    return (
        <React.Fragment>
            <Container className="d-flex justify-content-center">
                    <RecipeSorter setSearch={setSearch} select={select} onCategoryChange={handleCategoryChange} />
            </Container>
            <Container className="mb-5">
                    <Row className="d-flex justify-content-center" xs="auto">
                        <Col className={showDeleted ? "d-block" : "d-none"}>
                            <div className="border border-danger rounded mt-2 mb-4 delete-message d-flex align-items-center overflow-auto">
                                <Button size="sm" className="m-1 float-start" variant="outline-danger" onClick={() => setShowDeleted(false)}>X</Button><span className="fs-6 text-danger ms-2 me-3">Recipe successfully deleted</span>
                            </div>
                        </Col>
                    </Row>
                    <Row xs={1} sm={2} md={3} lg={3} xl={4} className="g-4 mx-2">
                        {recipesToDisplay.map(recipe => <RecipeItem key={uuidv4()} name={recipe.name} image={recipe.image} url={recipe.url} madeCount={recipe.madeCount} id={recipe.id} /> )}
                    </Row>
            </Container>
        </React.Fragment>
    )
}


export default Recipes;

