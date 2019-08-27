import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar navbar-light bg-light navbar-expand-lg">
            <Link className="navbar-brand" to="/">EasyDiet</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="navbar-collapse collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav mr-auto">
                    <Link className="nav-item nav-link" to="/meal-plan">Get a Custom Meal Plan</Link>
                    <Link className="nav-item nav-link" to="/recipes">Search Any Recipe</Link>
                    <Link className="nav-item nav-link" to="/search-by-macros">Search Recipe by Macros</Link>
                    <Link className="nav-item nav-link" to="/menu">Search Restaurant Menu Items</Link>
                </div>
            </div>
        </nav>
    )
}


export default Navbar