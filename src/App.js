import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"

import './App.css';

import Recipes from './components/Recipes';
import RecipeDetails from './components/RecipeDetails';
import Menu from './components/Menu';
import MenuItemDetails from './components/MenuItemDetails';
import RecipeNutrients from './components/RecipeNutrients';
import Navbar from './components/Navbar';
import Home from './components/Home';

function App() {
  return (
    <Router>
      <Fragment>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/recipes" component={Recipes} />
          <Route exact path="/recipes/:id/information" component={RecipeDetails} />
          <Route exact path="/menu" component={Menu} />
          <Route exact path="/food/menuItems/:id" component={MenuItemDetails} />
          <Route exact path="/recipe-nutrients" component={RecipeNutrients} />
        </Switch>
      </Fragment>
    </Router>
  );
}

export default App;
