import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar navbar-light bg-light navbar-expand-lg">
            <Link className="navbar-brand" to="/">Diet and Recipe API</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="navbar-collapse collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav mr-auto">
                    <Link className="nav-item nav-link" to="/recipes">Recipes <span className="sr-only">(current)</span></Link>
                    <Link className="nav-item nav-link" to="/menu">Menu</Link>
                    <Link className="nav-item nav-link" to="/recipe-nutrients">Search Macronutrients</Link>
                    <Link className="nav-item nav-link" to="/meal-plan">Meal Plan</Link>
                </div>
            </div>
        </nav>
    )
}


export default Navbar