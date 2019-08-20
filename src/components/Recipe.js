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
        fetch(`https://api.spoonacular.com/recipes/${id}/information?includeNutrition=true&apiKey=bb6a675616934bed81e967cc50497f10`)
            .then(res => res.json())
            .then(
                (result) => {
                    // console.log(result)
                    // // if (array.length > 0 && arrayTwo.length > 0 && arrayThree.length > 0) {
                    // //     // do something
                    // // }
                    // if (!instructions) {
                    //     console.log(instructions)
                    //     this.setState({
                    //         recipe: result,
                    //         ingredients: result.extendedIngredients,
                    //         nutrition: result.nutrition.nutrients,
                    //         instructions: [],
                    //         isLoaded: true,
                    //     });
                    // } else {
                    this.setState({
                        recipe: result,
                        ingredients: result.extendedIngredients,
                        nutrition: result.nutrition.nutrients,
                        instructions: result.analyzedInstructions,
                        isLoaded: true,
                    });
                    // else {
                    // this.setState({
                    //     recipe: result,
                    //     ingredients: result.extendedIngredients,
                    //     instructions: result.analyzedInstructions[0].steps,
                    //     nutrition: result.nutrition.nutrients,
                    //     isLoaded: true,
                    // });
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
                <div className="row mt-2">
                    <ul className="col-xs-12 col-md-4">
                        <h5>Nutrition Info</h5>
                        {nutrition.map(nutrient => (
                            <li key={nutrient.title} className="recipe-li">{nutrient.title}: {nutrient.amount.toFixed()}{nutrient.unit}</li>
                        ))}
                    </ul>
                    <ul className="col-xs-12 col-md-4">
                        <h5>Ingredients</h5>
                        {ingredients.map(ingredient => (
                            <li key={ingredient.id} className="recipe-li">{ingredient.original}</li>
                        ))}
                    </ul>
                    {!instructions.length ? (
                        <div className="col-xs-12 col-md-4">
                            <h5>Instructions</h5>
                            <div>Sorry! There are no instructions for this recipe.</div>
                        </div>
                    ) : (
                            <ul className="col">
                                <h5>Instructions</h5>
                                {instructions[0].steps.map(instruction => (
                                    <li key={instruction.number} className="recipe-li">{instruction.number}: {instruction.step}</li>
                                ))}
                            </ul>
                        )}
                </div>
            </div>
        )
    }
}

export default Recipe;