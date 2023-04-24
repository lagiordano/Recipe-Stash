import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

function AddNewRecipe () {

    const navigate = useNavigate();

    const [newRecipe, setNewRecipe] = useState({
        name: "",
        image: "",
        url: "",
        category: "",
        madeCount: 0,
        comments: []

    })

   
    function handleFormChange (e) {
        const name=e.target.name;
        const value= e.target.value;

        setNewRecipe({
            ...newRecipe,
            [name]: value,
        });
    }

    function handleSubmit (e) {
        e.preventDefault();
        console.log(newRecipe);
        fetch("http://localhost:6001/recipes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json", 
            },
            body: JSON.stringify(newRecipe),
        })
        .then(r => r.json())
        .then((data) => {
            setNewRecipe({
                name: "",
                image: "",
                url: "",
                category: "",
                madeCount: 0,
                comments: []
        
            });
            navigate(`/recipes/${data.id}`)
        })
        .catch(() => {
            alert("Sorry, there has been an error submitting this recipe");
        });
    }


    return (
        <Container>
            <Row>
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label>Recipe Name:</Form.Label>
                        <Form.Control type="text" name="name" value={newRecipe.name} placeholder="Enter recipe name" required onChange={handleFormChange}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Recipe Link (website URL):</Form.Label>
                        <Form.Control type="url" name="url" value={newRecipe.url} placeholder="Enter recipe link" required onChange={handleFormChange}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Image:</Form.Label>
                        <Form.Control type="url" name="image" value={newRecipe.image} placeholder="Enter recipe image address (optional)" onChange={handleFormChange}/>
                    </Form.Group>
                    <Form.Group name="category" value={newRecipe.category} required onChange={handleFormChange}>
                        <Form.Label>Category</Form.Label>
                        <Form.Check inline name="category" type="radio" value="Savory" label="Savory" />
                        <Form.Check inline name="category" type="radio" value="Sweet" label="Sweet" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Made how many times previously?</Form.Label>
                        <Form.Control type="number" name="madeCount" value={newRecipe.madeCount} required onChange={handleFormChange}/>
                    </Form.Group>
                    <Button variant="primary" type="submit">Submit</Button>
                </Form>
            </Row>
        </Container>
    );
}

export default AddNewRecipe;