import React, { Fragment, Component } from 'react';
import { Link } from 'react-router-dom'

class MealPlan extends Component {
    state = {
        error: null,
        mealPlan: [],
        fields: {
            timeFrame: '',
            targetCalories: '',
            diet: '',
        },
        errors: {},
        isLoaded: false
    };

    handleValidation = () => {
        const fields = this.state.fields
        const errors = {};
        let formIsValid = true;

        if (!fields.timeFrame) {
            errors.timeFrame = "Fill out this field."
            formIsValid = false;
        }
        if (!fields.targetCalories) {
            formIsValid = false;
            errors.targetCalories = "Fill out this field."
        }

        this.setState({ errors: errors });
        console.log(formIsValid);
        console.log(fields)
        return formIsValid
    }

    handleChange = (event) => {
        const { value, type, name } = event.currentTarget
        console.log(type, value, name);
        this.setState(prevState => ({
            fields: {
                ...prevState.fields,
                [name]: type === 'number' ? parseInt(value, 10) : value
            }
        }));
    };

    handleSubmit = async (event) => {
        const fields = this.state.fields
        event.preventDefault();
        if (this.handleValidation()) {
            try {
                const data = await fetch(
                    `https://api.spoonacular.com/recipes/mealplans/generate?timeFrame=${fields.timeFrame}&targetCalories=${fields.targetCalories}&diet=${fields.diet}&apiKey=aa3d290f817b4356a170f6ffde9ecfea`
                )
                const result = await data.json();
                console.log(result)
                this.setState({
                    mealPlan: result,
                    isLoaded: true
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
            mealPlan,
            fields,
            isLoaded
        } = this.state;

        return (
            <Fragment>
                <form className="container mt-3" onSubmit={this.handleSubmit}>
                    <p className="lead">Generate a meal plan with three meals per day (breakfast, lunch, and dinner).</p>
                    <p>Would you like a meal plan for the day or week?</p>
                    <div className="my-3">
                        <div className="form-check form-check-inline">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="timeFrame"
                                value="day"
                                onChange={this.handleChange}
                            />
                            <label className="form-check-label">Day</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="timeFrame"
                                value="week"
                                onChange={this.handleChange}
                            />
                            <label className="form-check-label">Week</label>
                        </div>
                        <div className='text-danger'>{errors.timeFrame}</div>
                    </div>
                    <div className="form-group">
                        <label>
                            Target Calories:
                                <input
                                className="form-control"
                                type="number"
                                name="targetCalories"
                                value={fields.targetCalories}
                                onChange={this.handleChange}
                            />
                        </label>
                        <br />
                        <div className='text-danger'>{errors.targetCalories}</div>
                    </div>
                    <div className="form-group">
                    <label >
                            Diet:
                            <select className="form-control" value={fields.diet} name="diet" onChange={this.handleChange} >
                                <option value="">Any</option>
                                <option value="Gluten Free">Gluten Free</option>
                                <option value="Ketogenic">Ketogenic</option>
                                <option value="Vegetarian">Vegetarian</option>
                                <option value="Vegan">Vegan</option>
                                <option value="Paleo">Paleo</option>
                            </select>
                        </label>
                    </div>
                    <input
                        type="submit"
                        className="btn btn-primary"
                        onClick={this.handleClick}
                        value="Submit"
                    />
                </form>
                <div className="container">
                    <div className="row mt-3">
                        {isLoaded && mealPlan.items ? mealPlan.items.map(recipe => (
                            <div key={JSON.parse(recipe.value).id} className="col-6 col-sm-4 mb-3">
                                <div className="card card-stuff mt-3 footer-widget">
                                    <img src={`https://spoonacular.com/recipeImages/${JSON.parse(recipe.value).id}-556x370.jpg`} className="img-fluid img" />
                                    <div className="card-body">
                                        <h5 className="card-title">{JSON.parse(recipe.value).title}</h5>
                                        <p className="col-eq">Day: {recipe.day}</p>
                                        <Link to={`recipes/${JSON.parse(recipe.value).id}/information`} className="btn btn-primary info-button">View Details</Link>
                                    </div>
                                </div>
                            </div>
                        )) : null}
                        {isLoaded && mealPlan.meals ? mealPlan.meals.map(meal => (
                            <div key={meal.id} className="col-6 col-sm-4 mb-3">
                                <div className="card card-stuff mt-3 footer-widget">
                                    <img className="img-fluid img" src={`https://spoonacular.com/recipeImages/${meal.image}`} />
                                    <div className="card-body">
                                        <h5 className="card-title">{meal.title}</h5>
                                        <p>Ready In: {meal.readyInMinutes} Minutes</p>
                                        <p className="col-eq">Servings: {meal.servings}</p>
                                        <Link to={`recipes/${meal.id}/information`} className="btn btn-primary info-button">View Details</Link>
                                    </div>
                                </div>
                            </div>
                        )) : null}
                    </div>
                </div>
            </Fragment>
        );
    }
}


export default MealPlan;