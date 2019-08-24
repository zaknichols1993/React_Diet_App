import React, { Fragment } from 'react'

function RecipeData(props) {
    console.log(props)
    const { id } = props.data;
    const {
        title,
        image,
        readyInMinutes,
        servings,
        spoonacularScore,
    } = props.data

    return (
        <Fragment>
            <div>id: {id}</div>
            <h3>{title}</h3>
            <div className="col-md-6 offset-md-3 my-3">
                <img src={image} className="img-fluid" />
            </div>
            <div className="row">
                <div className="col text-center">
                    Ready In: {readyInMinutes} Minutes
                    </div>
                <div className="col text-center">
                    Servings: {servings}
                </div>
                <div className="col text-center">
                    Score: {spoonacularScore}%
                    </div>
            </div>
        </Fragment>
    )
}

export default RecipeData