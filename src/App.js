import React, {useEffect, useState} from 'react';
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import Recipes from './Components/Recipes';
import AddNewRecipe from './Components/AddNewRecipe';
import Inspiration from './Components/Inspiration';
import NavBar from './Components/NavBar';
import Home from './Components/Home';
import PageNotFound from './Components/PageNotFound';
import RecipeDetails from './Components/RecipeDetails';
import Footer from './Components/Footer';

function App() {

  const [recipes, setRecipes] = useState([]);
  const [showDeleted, setShowDeleted] = useState(false);

  useEffect( () => {
    fetch("http://localhost:6001/recipes")
    .then(r => r.json())
    .then( data => {
      setRecipes(data)
    })
    .catch(() => alert("There's been an error loading your recipe information"));
  }, [])

  useEffect( () => {
      document.title = "Recipe Stash | Home";
  }, [])
  
  function handleDeleteClick (deletedRecipe) {
    const updatedRecipes = recipes.filter(recipe => recipe.id !== deletedRecipe.id);
    setRecipes(updatedRecipes);
  }

  function handleAddRecipe (addedRecipe) {
    const updatedRecipes = [...recipes, addedRecipe];
    setRecipes(updatedRecipes);
  }

  return (
    <div className="App">
        <Router>
            <NavBar />
            <Routes>
              <Route exact path="/" element={<Home setShowDeleted={setShowDeleted} />} />
              <Route exact path="/recipes" element={<Recipes recipes={recipes} setRecipes={setRecipes} showDeleted={showDeleted} setShowDeleted={setShowDeleted}/>} />
              <Route path="/recipes/:id" element={<RecipeDetails onDeleteClick={handleDeleteClick} setShowDeleted={setShowDeleted}/>} />
              <Route exact path="/new_recipe" element={<AddNewRecipe onAddRecipe={handleAddRecipe} setShowDeleted={setShowDeleted} />} />
              <Route exact path="/meal_inspiration" element={ <Inspiration onAddInspoMeal={handleAddRecipe} setShowDeleted={setShowDeleted} />} />
              <Route path="*" element={<PageNotFound setShowDeleted={setShowDeleted} />} />
            </Routes>
            <Footer />
        </Router>
    </div>
  );
}

export default App;
