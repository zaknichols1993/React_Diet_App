import React, { Fragment, Component } from 'react';
import { Link } from 'react-router-dom'

class RecipeNutrients extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            recipes: [],
            minCalories: '',
            maxCalories: '',
            minCarbs: '',
            maxCarbs: '',
            minProtein: '',
            maxProtein: '',
            minFat: '',
            maxFat: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.setState({ isLoaded: true })
    }


    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit(event) {
        const { minCalories, maxCalories, minCarbs, maxCarbs, minProtein, maxProtein, minFat, maxFat } = this.state;
        event.preventDefault();
        fetch(`https://api.spoonacular.com/recipes/findByNutrients?minCalories=${minCalories}&maxCalories=${maxCalories}&random=true&number=3&apiKey=aa3d290f817b4356a170f6ffde9ecfea`)
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result)
                    this.setState({
                        isLoaded: true,
                        recipes: result
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
        const { error, isLoaded, recipes, minCalories, maxCalories, minCarbs, maxCarbs, minProtein, maxProtein, minFat, maxFat } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <Fragment>
                    <form className="container mt-3" onSubmit={this.handleSubmit}>
                        <p>Find a set of recipes that adhere to the given nutritional limits. You may set limits for macronutrients: calories, protein, fat, and carbohydrates.</p>
                        <div className="form-group">
                            <label>
                                Minimum Calories: <input className="m-1 form-control" type="text" name="minCalories" value={minCalories} onChange={this.handleChange} />
                            </label>
                        </div>
                        <div className="form-group">
                            <label>
                                Maximum Calories: <input className="m-1 form-control" type="text" name="maxCalories" value={maxCalories} onChange={this.handleChange} />
                            </label>
                        </div>
                        <input type="submit" className="btn btn-primary" value="Submit" />
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
}

export default RecipeNutrients;