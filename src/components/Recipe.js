import React, { Component } from 'react'

class Recipe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            recipe: [],
            ingredients: [],
            instructions: [],
            nutrition: []
        };
    }
    componentDidMount() {
        const { id } = this.props.match.params;
        fetch(`https://api.spoonacular.com/recipes/${id}/information?includeNutrition=true&apiKey=aa3d290f817b4356a170f6ffde9ecfea`)
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result)
                    this.setState({
                        isLoaded: true,
                        recipe: result,
                        ingredients: result.extendedIngredients,
                        instructions: result.analyzedInstructions[0].steps,
                        nutrition: result.nutrition.nutrients
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
        const { title, image, readyInMinutes, servings, spoonacularScore } = this.state.recipe;
        const ingredients = this.state.ingredients;
        const instructions = this.state.instructions;
        const nutrition = this.state.nutrition.filter(nutrient =>
            nutrient.title === 'Calories' ||
            nutrient.title === 'Protein' ||
            nutrient.title === 'Carbohydrates' ||
            nutrient.title === 'Fat' ||
            nutrient.title === 'Sugar' ||
            nutrient.title === 'Fiber'
        )
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
                    <div className="col text-center">
                        Score: {spoonacularScore}%
                    </div>
                </div>
                <ul className="col-md-6">
                    <h5>Nutrition</h5>
                    {nutrition.map(nutrient => (
                        <li key={nutrient.title} className="recipe-li">{nutrient.title}: {nutrient.amount.toFixed()}{nutrient.unit}</li>
                    ))}
                </ul>
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

export default Recipe;