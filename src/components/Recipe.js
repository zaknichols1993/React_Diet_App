import React, { Component } from 'react'

class Recipe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            recipe: [],
            // ingredients: [],
            // instructions: [],
            // nutrition: []
        };

    }

    async componentDidMount() {
        const { id } = this.props.match.params;
        try {
            const data = await fetch(
                `https://api.spoonacular.com/recipes/${id}/information?includeNutrition=true&apiKey=bb6a675616934bed81e967cc50497f10`
            );
            const result = await data.json();
            console.log(result);
            this.setState({
                isLoaded: true,
                recipe: result,
            });
        } catch (error) {
            this.setState({
                isLoaded: true,
                error,
            });
        }
    }

    render() {
        const { isLoaded } = this.state;
        if (!isLoaded) return <div>Loading...</div>
        const { id } = this.props.match.params;
        const {
            title,
            image,
            readyInMinutes,
            servings,
            spoonacularScore,
            extendedIngredients: ingredients,
            analyzedInstructions: instructions,
            nutrition: { nutrients }
        } = this.state.recipe;
        const filtered = nutrients.filter(nutrient =>
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
                        {filtered.map(nutrient => (
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