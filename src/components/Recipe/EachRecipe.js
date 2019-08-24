import React, { Fragment } from 'react'
import { Link } from 'react-router-dom';

function EachRecipe(props) {
    const recipes = props.recipes
    const eachRecipe = recipes.map(recipe => {
        return (
            <div key={recipe.id} className="col-xs-12 col-md-4">
                <div className="card card-stuff">
                    <img className="img-fluid" alt="recipe" src={`https://spoonacular.com/recipeImages/${recipe.image}`} />
                    <div className="card-body">
                        <h5 className="card-title">{recipe.title}</h5>
                        <div>Time to cook: {recipe.readyInMinutes} Minutes</div>
                        <div>Servings: {recipe.servings}</div>
                        <Link to={`recipes/${recipe.id}/information`} className="btn btn-primary">View Details</Link>
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