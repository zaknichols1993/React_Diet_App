import React, { Fragment } from 'react'
import { Link } from 'react-router-dom';

function EachRecipe(props) {
    const recipes = props.recipes
    const eachRecipe = recipes.map(recipe => {
        return (
            <li key={recipe.id} className="recipes-li">
                <div className="media rounded">
                    <img className="height recipes-img" alt="recipe" src={`https://spoonacular.com/recipeImages/${recipe.image}`} />
                    <div className="media-body p-2">
                        <h5>{recipe.title}</h5>
                        <div>Time to cook: {recipe.readyInMinutes} Minutes</div>
                        <div>Servings: {recipe.servings}</div>
                        <Link to={`recipes/${recipe.id}/information`} className="btn btn-primary">View Details</Link>
                    </div>
                </div>
            </li>
        )
    });

    return (
        <Fragment>{eachRecipe}</Fragment>
    )
}

export default EachRecipe