import React from "react";
import RecipeList from "./RecipeList";
import RecipeSorter from "./RecipeSorter";

function Recipes ({recipes}) {

    return (
        <div>
            <RecipeSorter />
            <RecipeList recipes={recipes}/>
        </div>
    );
}


export default Recipes;