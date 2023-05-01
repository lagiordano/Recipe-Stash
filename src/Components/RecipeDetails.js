import React, {useState, useEffect} from "react";
import { useParams, useNavigate} from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import recipePlaceholder from "../images/recipePlaceholder.jpeg";
import InputGroup from "react-bootstrap/InputGroup";
import { v4 as uuidv4 } from 'uuid';



function RecipeDetails ({onDeleteClick}) {

    

    const params = useParams()
    const navigate = useNavigate();
    const [recipe, setRecipe] = useState({});
    const [made, setMade] = useState("");
    const [commentsArr, setCommentsArr] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [disabled, setDisabled] = useState(false);


    useEffect( () => {
        fetch(`http://localhost:6001/recipes/${params.id}`)
        .then(r => r.json())
        .then( data => {
        setRecipe(data);
        setMade(data.madeCount);
        setCommentsArr(data.comments);
        })
        .catch(() => alert("There's been an error loading your recipe information"));
    }, [params.id])

    const madeCountDisplay = (
        <div className="d-flex justify-content-center align-items-center p-1 p-md-2 p-lg-3">
            {(made > 0) ? <span className="fs-5">Made {made} time{(made === 1) ? "" : "s"}:&nbsp;</span> : <span className="fs-5">Not made yet:&nbsp;</span> }
            <Button size="sm"variant="outline-dark" onClick={handleIncreaseClick} className="m-1">+</Button><Button variant="outline-dark" size="sm" onClick={handleDecreaseClick} className="m-1">-</Button>
        </div>
    );
    

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
        if (made === 0) {
            setDisabled(true);
        } else {
            setDisabled(false);
            setMade(made => made - 1);
        }
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
            onDeleteClick(recipe);
            navigate("/recipes");
        })
        .catch(() => alert("Error: Could not process request"));
   }

  
   

    return (
        <Container>
            <div className="border rounded my-4 mx-2 mx-md-4 my-md-5 m-lg-5  details ">
                <Row className=" d-flex justify-content-center align-items-center">
                    <Col sm={12} md={6} lg={5} >
                        <img src={recipe.image || recipePlaceholder} alt={recipe.name} style={{width: "95%", height: "45vh"}} className="m-2 m-md-4 m-lg-5 border rounded"/>
                    </Col>
                    <Col sm={12} md={6} lg={7} className="d-flex align-items-center justify-content-center">
                        <div className="p1 p-md-2">
                            <h1 className="text-capitalize p-1 p-md-2">{recipe.name}</h1>
                            <h4 className="p-1 p-md-2"><a href={recipe.url} target="_blank" rel="noreferrer" className="text-dark" >Go to Recipe</a></h4>
                            {madeCountDisplay}
                            <Button className="m-3 m-md-2" variant="outline-dark" onClick={handleDeleteRecipe} >Delete Recipe</Button>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col sm={12}>
                        <Form onSubmit={handleSubmit} className="m-2 mx-md-4 mx-lg-5">
                            <InputGroup >
                                <Form.Control type="text" placeholder="Add new comment here..." value={newComment} onChange={handleCommentChange} className="details"/>
                                <Button type="submit" variant="outline-dark" >Add</Button>
                            </InputGroup>
                        </Form>
                    </Col>
                </Row>
                <Row className="mx-2 mx-md-4 mx-lg-5 mb-lg-4 details">
                    <Col sm={12} className="text-start">
                        <h4 className="m-2">Comments:</h4>
                        <ul >
                            {commentsArr.map(comment => <li key={uuidv4()}>{comment}</li>)}
                        </ul>
                    </Col>
                </Row>
            </div>
        </Container>


        
    )
}

export default RecipeDetails;