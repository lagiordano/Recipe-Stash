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

function App() {

  const [recipes, setRecipes] = useState([]);
  const [deleteRender, setDeleteRender] = useState(true);

  useEffect( () => {
    fetch("http://localhost:6001/recipes")
    .then(r => r.json())
    .then( data => {
      console.log(data);
      setRecipes(data)
    })
    .catch(() => alert("There's been an error loading your recipe information"));
  }, [deleteRender])

  


  return (
    <div className="App">
        <Router>
          <NavBar />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/recipes" element={<Recipes recipes={recipes} setRecipes={setRecipes} />} />
            <Route path="/recipes/:id" element={<RecipeDetails deleteRender={deleteRender} setDeleteRender={setDeleteRender} />} />
            <Route exact path="/new_recipe" element={<AddNewRecipe />} />
            <Route exact path="/meal_inspiration" element={ <Inspiration />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Router>
    </div>
  );
}

export default App;
