import React, { Fragment } from 'react'
import { Link } from 'react-router-dom';

function EachRecipe(props) {
    const recipes = props.recipes
    const eachRecipe = recipes.map(recipe => {
        return (
            <div key={recipe.id} className="col-12 col-sm-6 col-md-4 mt-2">
                <div className="card card-stuff mt-3 footer-widget">
                    <div>
                        <img className="img-fluid img" alt="recipe" src={`https://spoonacular.com/recipeImages/${recipe.image}`} />
                        <div className="card-body col-eq">
                            <h5 className="card-title">{recipe.title}</h5>
                            <div>Time to cook: {recipe.readyInMinutes} Minutes</div>
                            <div>Servings: {recipe.servings}</div>
                            <Link to={`recipes/${recipe.id}/information`} className="btn btn-success info-button">View Details</Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    });
    return (
        <Fragment>{eachRecipe}</Fragment>
    )
}

export default EachRecipe