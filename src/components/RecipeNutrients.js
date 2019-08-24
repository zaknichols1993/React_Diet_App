import React, { Fragment, Component } from 'react';
import { Link } from 'react-router-dom'

class RecipeNutrients extends Component {
    state = {
        error: null,
        recipes: [],
        fields: {
            minCalories: '',
            maxCalories: '',
            minCarbs: '',
            maxCarbs: '',
            minProtein: '',
            maxProtein: '',
            minFat: '',
            maxFat: '',
        },
        errors: {}
    };

    handleValidation = () => {
        const fields = this.state.fields
        const errors = {};
        let formIsValid = true;

        if (!fields.minCalories) {
            errors.minCalories = "Fill out this field."
            formIsValid = false;
        }
        if (!fields.maxCalories) {
            formIsValid = false;
            errors.maxCalories = "Fill out this field."
        } else if (fields.minCalories >= fields.maxCalories) {
            errors.minCalories = "Min calories can't be higher or equal to max calories."
            formIsValid = false;
        }

        this.setState({ errors: errors });
        console.log(formIsValid);
        console.log(fields)
        return formIsValid
    }

    // Your code @Spex :D
    handleChange = field => event => {
        const value = event.currentTarget.value;
        console.log(field, value);
        this.setState(prevState => ({
            fields: {
                ...prevState.fields,
                [field]: parseInt(value, 10)
            }
        }));
    };

    handleSubmit = async (event) => {
        const fields = this.state.fields
        event.preventDefault();
        if (this.handleValidation()) {
            try {
                const data = await fetch(
                    `https://api.spoonacular.com/recipes/findByNutrients?minCalories=${fields.minCalories}&maxCalories=${fields["maxCalories"]}&random=true&number=3&apiKey=aa3d290f817b4356a170f6ffde9ecfea`
                )
                const result = await data.json();
                this.setState({
                    recipes: result,
                });
            } catch (error) {
                this.setState({
                    isLoaded: true,
                    error
                });
            }
        } else {
            console.log("Form is invalid")
        }
    }

    render() {
        const {
            errors,
            recipes,
            fields
        } = this.state;

        return (
            <Fragment>
                <form className="container mt-3" onSubmit={this.handleSubmit}>
                    <p>Find a set of recipes that adhere to the given nutritional limits. You may set limits for macronutrients: calories, protein, fat, and carbohydrates.</p>
                    <div className="form-group">
                        <label>
                            Minimum Calories:
                                <input
                                className="m-1 form-control"
                                type="number"
                                name="minCalories"
                                value={fields.minCalories}
                                onChange={this.handleChange("minCalories")}
                            />
                        </label>
                        <br />
                        <div className='text-danger'>{errors.minCalories}</div>
                    </div>
                    <div className="form-group">
                        <label>
                            Maximum Calories:
                                <input
                                className="m-1 form-control"
                                type="number"
                                name="maxCalories"
                                value={fields.maxCalories}
                                onChange={this.handleChange("maxCalories")}
                            />
                        </label>
                        <br />
                        <div className='text-danger'>{errors.maxCalories}</div>
                    </div>
                    <input
                        type="submit"
                        className="btn btn-primary"
                        onClick={this.handleClick}
                        value="Submit"
                    />
                </form>
                <ul className="container col-xs-12">
                    {recipes.map(recipe => (
                        <li key={recipe.id} className="recipes-li">
                            <div className="media rounded">
                                <img className="height recipes-img" alt="recipe" src={recipe.image} />
                                <div className="media-body p-2">
                                    <h5>{recipe.title}</h5>
                                    <div>Time to cook: {recipe.readyInMinutes} Minutes</div>
                                    <div>Servings: {recipe.servings}</div>
                                    <Link to={`recipes/${recipe.id}/information`} className="btn btn-primary">View Details</Link>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </Fragment>
        );
    }
}


export default RecipeNutrients;