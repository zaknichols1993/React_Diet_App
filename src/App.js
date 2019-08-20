import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom"

import './App.css';

import Recipes from './components/Recipes';
import Recipe from './components/Recipe';
import Menu from './components/Menu';
import MenuItem from './components/MenuItem';
import RecipeNutrients from './components/RecipeNutrients';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Fragment>
        {/* <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/recipes">Recipes</Link>
            </li>
            <li>
              <Link to="/menu">Menu</Link>
            </li>
            <li>
              <Link to="/recipe-nutrients">Search By Macros</Link>
            </li>
          </ul>
        </nav> */}
        <Navbar />
        <Switch>
          <Route exact path="/recipes" component={Recipes} />
          <Route exact path="/recipes/:id/information" component={Recipe} />
          <Route exact path="/menu" component={Menu} />
          <Route exact path="/food/menuItems/:id" component={MenuItem} />
          <Route exact path="/recipe-nutrients" component={RecipeNutrients} />
        </Switch>
      </Fragment>
    </Router>
  );
}

export default App;
