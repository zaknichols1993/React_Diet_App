import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'

export default class Recipe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            recipe: [],
            ingredients: [],
            instructions: []
        };
    }
    componentDidMount() {
        const { id } = this.props.match.params;
        fetch(`https://api.spoonacular.com/recipes/${id}/information?includeNutrition=false&apiKey=aa3d290f817b4356a170f6ffde9ecfea`)
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result)
                    this.setState({
                        isLoaded: true,
                        recipe: result,
                        ingredients: result.extendedIngredients,
                        instructions: result.analyzedInstructions[0].steps
                    });
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }
    render() {
        const { id } = this.props.match.params;
        const { title, image, readyInMinutes, servings } = this.state.recipe;
        const ingredients = this.state.ingredients;
        const instructions = this.state.instructions;
        return (
            <div className="container">
                <div>ID: {id}</div>
                <h3>{title}</h3>
                <div className="col-md-6 offset-md-3">
                    <img src={image} className="img-fluid" />
                </div>
                <div className="row m-2">
                    <div className="col text-center">
                        Ready In: {readyInMinutes} Minutes
                    </div>
                    <div className="col text-center">
                        Servings: {servings}
                    </div>
                </div>
                <div className="row mt-2">
                    <ul className="col-md-6">
                        <h5>Ingredients</h5>
                        {ingredients.map(ingredient => (
                            <li key={ingredient.id} className="recipe-li">{ingredient.original}</li>
                        ))}
                    </ul>
                    <ul className="col-md-6">
                        <h5>Instructions</h5>
                        {instructions.map(instruction => (
                            <li key={instruction.number} className="recipe-li">{instruction.number}: {instruction.step}</li>
                        ))}
                    </ul>
                </div>
            </div>
        )
    }
}
