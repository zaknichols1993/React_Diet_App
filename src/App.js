import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom"

import './App.css';

import Recipes from './components/Recipes';
import Recipe from './components/Recipe'

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
          </ul>
        </nav>
        <Switch>
          <Route exact path="/recipes/" component={Recipes} />
          <Route exact path="/recipes/:id/information" component={Recipe} />
        </Switch>
      </Fragment>
    </Router>
  );
}

export default App;
