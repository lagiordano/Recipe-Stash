import React, {useEffect, useState} from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import recipePlaceholder from "../recipePlaceholder.jpeg";
import  Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

function Inspiration () {

    const navigate = useNavigate();

   const [inspoMeal, setInspoMeal] = useState({
    name: "",
        image: "",
        url: "",
        category: "",
        madeCount: 0,
        comments: []
   });



    useEffect( () => {
        fetch("https://www.themealdb.com/api/json/v1/1/random.php")
        .then(r => r.json())
        .then(data => {
            if (data["meals"][0]["strSource"]) {
                const mealCategory = (data["meals"][0]["strCategory"] === "Dessert" ? "Sweet" : "Savory");
                setInspoMeal({
                    name: data["meals"][0]["strMeal"],
                    image: data["meals"][0]["strMealThumb"],
                    url: data["meals"][0]["strSource"],
                    category: mealCategory,
                    madeCount: 0,
                    comments: []
                });
            } 
        })
    }, [])

    function handleAddClick () {
        fetch("http://localhost:6001/recipes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(inspoMeal),
        })
        .then(r => r.json())
        .then(data => {
            navigate(`/recipes/${data.id}`)
        })
        .catch( () => alert("Error: Unable to process reuqest"))
        
    }

    

    return (
        <Container>
            <Row>
                <Col sm={12} md={6} lg={5}>
                    <img src={inspoMeal.image || recipePlaceholder} alt={inspoMeal.name} style={{width: "100%", height: "50vh"}}/>
                </Col>
                <Col sm={12} md={4} lg={5}>
                    <h2>{inspoMeal.name}</h2>
                    <h4><a href={inspoMeal.url} target="_blank" >Go to recipe</a></h4>
                    <Button onClick={handleAddClick} >Add to Recipes</Button>
                </Col>
            </Row>
        </Container>
    );
}

export default Inspiration;