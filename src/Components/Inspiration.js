import React, {useEffect, useState} from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import recipePlaceholder from "../recipePlaceholder.jpeg";
import  Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

function Inspiration () {

    const navigate = useNavigate();

    const [newInspo, setNewInspo] = useState(true);
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
            }  else {
                setNewInspo(newInspo => !newInspo);
            }
        })
    }, [newInspo])

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
            navigate(`/${data.id}`)
        })
        .catch( () => alert("Error: Unable to process reuqest"))
        
    }

    

    return (
        <Container className=" d-flex justify-content-center" id="inspiration">
            <Row className="border rounded my-3 mx-2 m-md-4 m-lg-5" id="inspo-meal">
                <Col sm={12} md={6} className="d-flex justify-content-center">
                    <img src={inspoMeal.image || recipePlaceholder} alt={inspoMeal.name} style={{width: "100%", height: "50vh"}} className="my-3 mx-2 m-md-3 border rounded"/>
                </Col>
                <Col sm={12} md={6} className="d-flex align-items-center justify-content-center">
                    <div className="mb-3 mx-2 ">
                        <h1>{inspoMeal.name}</h1>
                        <h4 className="mt-3"><a href={inspoMeal.url} target="_blank" className=" text-dark">Go to Recipe</a></h4>
                        <Button className="m-2 m-md-3 m-lg-4" size="sm" variant="outline-dark" onClick={handleAddClick} >Add to Recipes</Button><br />
                        <Button variant="outline-dark" size="sm" onClick={() => setNewInspo(newInspo => !newInspo)}>Get New Recipe</Button>
                    </div >
                </Col>
            </Row>
        </Container>
    );
}

export default Inspiration;