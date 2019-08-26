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
                    `https://api.spoonacular.com/recipes/findByNutrients?minCalories=${fields.minCalories}&maxCalories=${fields.maxCalories}&random=true&number=3&apiKey=aa3d290f817b4356a170f6ffde9ecfea`
                )
                const result = await data.json();
                console.log(result)
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
            fields,
            isLoaded
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
                <div className="container">
                    <div className="row m-2">
                        {recipes.map(recipe => (
                            <div key={recipe.id} className="col-xs-12 col-md-4 mb-3">
                                <div className="card card-stuff mt-3">
                                    <img className="img-fluid img" alt="recipe" src={recipe.image} />
                                    <div className="card-body">
                                        <h5 className="card-title">{recipe.title}</h5>
                                        <div>Calories: {recipe.calories}</div>
                                        <div>Protein: {recipe.protein}</div>
                                        <Link to={`recipes/${recipe.id}/information`} className="btn btn-primary m-2">View Details</Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </Fragment>
        );
    }
}


export default RecipeNutrients;