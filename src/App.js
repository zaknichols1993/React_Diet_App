import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom"

import './App.css';

import Recipes from './components/Recipes';
import Recipe from './components/Recipe';
import Menu from './components/Menu';
import MenuItem from './components/MenuItem'

function App() {
  return (
    <Router>
      <Fragment>
        <nav>
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
          </ul>
        </nav>
        <Switch>
          <Route exact path="/recipes" component={Recipes} />
          <Route exact path="/recipes/:id/information" component={Recipe} />
          <Route exact path="/menu" component={Menu} />
          <Route exact path="/food/menuItems/:id" component={MenuItem} />
        </Switch>
      </Fragment>
    </Router>
  );
}

export default App;
