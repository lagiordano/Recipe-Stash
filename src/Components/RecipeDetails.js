import React, {useState, useEffect} from "react";
import { useParams, useNavigate} from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import recipePlaceholder from "../recipePlaceholder.jpeg";
import InputGroup from "react-bootstrap/InputGroup";
import { v4 as uuidv4 } from 'uuid';



function RecipeDetails () {


    const params = useParams()
    const navigate = useNavigate();
    const [recipe, setRecipe] = useState({});
    const [made, setMade] = useState("");
    const [commentsArr, setCommentsArr] = useState([]);
    const [newComment, setNewComment] = useState("");


    useEffect( () => {
        fetch(`http://localhost:6001/recipes/${params.id}`)
        .then(r => r.json())
        .then( data => {
        setRecipe(data);
        setMade(data.madeCount);
        setCommentsArr(data.comments);
        })
        .catch(() => alert("There's been an error loading your recipe information"));
    }, [])

    function handleIncreaseClick () {
        setMade(made => made + 1)
        fetch(`http://localhost:6001/recipes/${params.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                madeCount: made + 1,
            }),
        })
        .catch(() => alert("Error: Could not process request"))
    }

   function handleDecreaseClick () {
        setMade(made => made - 1)
        fetch(`http://localhost:6001/recipes/${params.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                madeCount: made - 1,
            }),
        })
        .catch(() => alert("Error: Could not process request"))
   }
   
   function handleCommentChange (e) {
    setNewComment(e.target.value);
   }

   function handleSubmit (e) {
    e.preventDefault();
    setCommentsArr(commentsArr => [...commentsArr, newComment])
        fetch(`http://localhost:6001/recipes/${params.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                comments: [...commentsArr, newComment],
            }),
        })
        .catch(() => alert("Error: could not process request"));
    setNewComment("");
   }

   function handleDeleteRecipe () {
        fetch(`http://localhost:6001/recipes/${params.id}`, {
            method: "DELETE"
        })
        .then(() => {
            navigate("/");
        })
        .catch(() => alert("Error: Could not process request"));
   }
   

    return (
        <Container>
            <Row>
                <Col sm={12} md={6} lg={5}>
                    <img src={recipe.image || recipePlaceholder} alt={recipe.name} style={{width: "100%", height: "50vh"}}/>
                </Col>
                <Col sm={12} md={4} lg={5}>
                    <h2>{recipe.name}</h2>
                    <h4><a href={recipe.url} target="_blank" >Go to recipe</a></h4>
                    {(made > 0) ? <span>Made {made} times!</span> : <span>You've not made this yet</span>}
                    <Button onClick={handleIncreaseClick}>+</Button><Button onClick={handleDecreaseClick} >-</Button>
                    <p>Category: {recipe.category}</p>
                </Col>
            </Row>
            
            <Row>
                <Col>
                    <h5>Your comments:</h5>
                    <ul>
                        {commentsArr.map(comment => <li key={uuidv4()}>{comment}</li>)}
                    </ul>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form onSubmit={handleSubmit}>
                        <InputGroup>
                            <Form.Control type="text" placeholder="Add new comment here..." value={newComment} onChange={handleCommentChange}/>
                            <Button type="submit" variant="primary" >Add Comment</Button>
                        </InputGroup>
                    </Form>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Button variant="primary" onClick={handleDeleteRecipe} >Delete Recipe</Button>
                </Col>
            </Row>
        </Container>


        
    )
}

export default RecipeDetails;