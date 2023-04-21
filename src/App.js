import React, {useEffect, useState} from 'react';
import { Route, Switch } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import Recipes from './Components/Recipes';
import AddNewRecipe from './Components/AddNewRecipe';
import Inspiration from './Components/Inspiration';
import NavBar from './Components/NavBar';
import Home from './Components/Home';

function App() {

  const [recipes, setRecipes] = useState([]);

  useEffect( () => {
    fetch("http://localhost:6001/recipes")
    .then(r => r.json())
    .then( data => {
      console.log(data);
      setRecipes(data)
    })
    .catch(() => alert("There's been an error loading your recipe information"));
  }, [])



  return (
    <div className="App">
      <NavBar />
      <Switch>
        <Route path="/recipes">
          <Recipes recipes={recipes}/>
        </Route>
        <Route path="/new_recipe">
          <AddNewRecipe />
        </Route>
        {/* <Route path="/meal_inspiration">
          <Inspiration />
        </Route> */}
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
