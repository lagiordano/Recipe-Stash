import React, {useState} from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import RecipeSorter from "./RecipeSorter";
import RecipeItem from "./RecipeItem";

function Recipes ({recipes}) {

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
                    <Row xs={1} sm={2} md={3} lg={3} xl={4} className="g-4 mx-2">
                        {recipesToDisplay.map(recipe => <RecipeItem key={recipe.id} name={recipe.name} image={recipe.image} url={recipe.url} madeCount={recipe.madeCount} id={recipe.id} /> )}
                    </Row>
            </Container>
        </React.Fragment>
    )
}


export default Recipes;

