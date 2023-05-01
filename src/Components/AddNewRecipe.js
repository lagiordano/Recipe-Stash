import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

function AddNewRecipe ({setRerender, rerender}) {

    useEffect( () => {
        document.title = "Recipe Stash | Add Recipe";
    }, [])

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
            setRerender(!rerender);
            navigate(`/recipes/${data.id}`)
        })
        .catch(() => {
            alert("Sorry, there has been an error submitting this recipe");
        });
    }


    return (
        <Container className="d-flex justify-content-center">
            <Row className="w-100 d-flex justify-content-center">
                <Col xs={12} md={10} lg={8} >
                    <Form onSubmit={handleSubmit} className="text-start  my-3 my-md-4 my-lg-5 p-3 p-md-3 p-lg-4 p-xl-5 border rounded" id="add-recipe">
                        <Form.Group className="mb-3">
                            <Form.Label >Recipe Name:</Form.Label>
                            <Form.Control type="text" name="name" value={newRecipe.name} placeholder="Enter recipe name" required onChange={handleFormChange}/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Recipe Link:</Form.Label>
                            <Form.Control type="url" name="url" value={newRecipe.url} placeholder="Enter recipe link" required onChange={handleFormChange}/>
                            <Form.Text className="text-muted">The website url of the recipe</Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Image Link:</Form.Label>
                            <Form.Control type="url" name="image" value={newRecipe.image} placeholder="Enter recipe image address (optional)" onChange={handleFormChange}/>
                            <Form.Text className="text-muted">Right click on recipe image and then select copy image address</Form.Text>
                        </Form.Group>
                        <Form.Group name="category" value={newRecipe.category} required onChange={handleFormChange} className="mb-2">
                            <Form.Label>Category:&nbsp;&nbsp;</Form.Label>
                            <Form.Check inline name="category" type="radio" value="Savoury" label="Savoury" />
                            <Form.Check inline name="category" type="radio" value="Sweet" label="Sweet" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Made how many times previously?</Form.Label>
                            <Form.Control type="number" min="0" name="madeCount" value={newRecipe.madeCount} required onChange={handleFormChange}/>
                        </Form.Group>
                        <Button variant="outline-dark" type="submit" >Submit</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default AddNewRecipe;