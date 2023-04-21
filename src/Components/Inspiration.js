import React, {useEffect, useState} from "react";

function Inspiration () {

   const [inspoMeal, setInspoMeal] = useState({});

    useEffect( () => {
        fetch("https://www.themealdb.com/api/json/v1/1/random.php")
        .then(r => r.json())
        .then(data => {
            console.log(data)
            const recipeName = data["meals"][0]["strMeal"];
            const recipeUrl = data["meals"][0]["strSource"];
            setInspoMeal({name: recipeName, url: recipeUrl})
        })
    }, [])

    console.log(inspoMeal)

    return (
        <div>
            <h2>Recipe Inspo</h2>
            <p>{inspoMeal.name}: {inspoMeal.url}</p>
        </div>
    );
}

export default Inspiration;