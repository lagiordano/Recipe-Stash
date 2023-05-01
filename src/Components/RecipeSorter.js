import React from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Row from "react-bootstrap/Row";

function RecipeSorter ({setSearch, search, select, onCategoryChange}) {

    
    function handleSearchChange (e) {
        setSearch(e.target.value);
    }


    return (
        <Row className="w-100 mx-2">
                <Col  md={12} lg={5}>
                    <FloatingLabel label="Category" className="my-3 my-lg-4 p-0">
                        <Form.Select onChange={onCategoryChange} value={select} className="w-100 search-form">
                            <option value="all" >All</option>
                            <option value="Savoury" >Savoury</option>
                            <option value="Sweet" >Sweet</option>
                        </Form.Select>
                    </FloatingLabel>
                </Col>
                <Col md={12} lg={7}>
                    <FloatingLabel label="Search" className="mb-3 my-lg-4 p-0">
                        <Form.Control type="text" value={search} onChange={handleSearchChange} className="w-100 search-form"></Form.Control>
                    </FloatingLabel>
                </Col>
        </Row>
        
    )
}

export default RecipeSorter;