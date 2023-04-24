import React, {useState} from "react";
import Form from "react-bootstrap/Form";

function RecipeSorter ({setSearch, search, setSelect, select, onCategoryChange}) {

    

    

    function handleSearchChange (e) {
        setSearch(e.target.value);
    }


    return (
        <Form>
            <Form.Group>
                <Form.Label>Filter:</Form.Label>
                <Form.Select onChange={onCategoryChange} value={select}>
                    <option value="all" >All</option>
                    <option value="Savory" >Savory</option>
                    <option value="Sweet" >Sweet</option>
                </Form.Select>
            </Form.Group>
            <Form.Group>
                <Form.Label>Search:</Form.Label>
                <Form.Control type="text" value={search} onChange={handleSearchChange}></Form.Control>
            </Form.Group>
        </Form>
    )
}

export default RecipeSorter;