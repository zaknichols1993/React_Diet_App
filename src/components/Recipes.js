import React, { Fragment, Component } from 'react';
import { Link } from 'react-router-dom'

class Recipes extends Component {
    state = {
        errors: {},
        fields: {
            query: '',
            cuisine: '',
            intolerance: '',
            diet: ''
        },
        recipes: [],
        error: null,
        isLoaded: false,
        loadingButton: false
    };

    componentDidMount() {
        const isLoaded = this.state.isLoaded
        this.setState({ isLoaded: !isLoaded })
    }

    handleValidation() {
        let fields = this.state.fields
        let errors = {};
        let formIsValid = true;

        //Query
        if (!fields["query"]) {
            formIsValid = false;
            errors["query"] = "Search cannot be empty";
        }
        this.setState({ errors: errors });
        return formIsValid;
    }

    handleClick = () => {
        const loadingButton = this.state.loadingButton
        setTimeout(() => {
            this.setState({ loadingButton: loadingButton });
        }, 1500);
    };

    handleChange = (field, event) => {
        console.log(field, event)
        let fields = this.state.fields;
        fields[field] = event.target.value;
        this.setState({ fields });
    }

    handleSubmit = async (event) => {
        let fields = this.state.fields
        event.preventDefault();
        if (this.handleValidation()) {
            try {
                const data = await fetch(`https://api.spoonacular.com/recipes/search?query=${fields["query"]}&cuisine=${fields["cuisine"]}&diet=${fields["diet"]}&intolerances=${fields["intolerance"]}&number=3&apiKey=aa3d290f817b4356a170f6ffde9ecfea`)
                const result = await data.json()
                console.log(result)
                this.setState({
                    isLoaded: true,
                    recipes: result.results,
                    loadingButton: true,
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
            isLoaded,
            loadingButton,
            recipes,
            fields,
            errors
        } = this.state;

        if (!isLoaded) return (
            <div className="text-center mt-3">
                <div className="spinner-border-big" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        )

        return (
            <Fragment>
                <form className="container mt-3" onSubmit={this.handleSubmit}>
                    <p>Search for over 360,000 different recipes and filter your results by dietary requirements.</p>
                    <div className="form-group">
                        <label>
                            Search: <input className="m-1 form-control" type="text" name="query" value={fields['query']} onChange={(event) => this.handleChange("query", event)} />
                        </label>
                        <br />
                        <div className='text-danger'>{errors["query"]}</div>
                    </div>
                    <div className="form-group">
                        <label>
                            Cuisine:
                            <select className="m-1 form-control" value={fields["cuisine"]} name="cuisine" onChange={(event) => this.handleChange("cuisine", event)} >
                                <option value="">Any</option>
                                <option value="American">American</option>
                                <option value="Chinese">Chinese</option>
                                <option value="Japanese">Japanese</option>
                                <option value="Italian">Italian</option>
                                <option value="Mexican">Mexican</option>
                                <option value="Thai">Thai</option>
                                <option value="French">French</option>
                                <option value="Southern">Southern</option>

                            </select>
                        </label>
                        <br />
                        <div className='text-danger'>{errors["cuisine"]}</div>
                    </div>
                    <div className="form-group">
                        <label >
                            Diet:
                            <select className="m-1 form-control" value={fields["diet"]} name="diet" onChange={(event) => this.handleChange("diet", event)} >
                                <option value="">Any</option>
                                <option value="Gluten Free">Gluten Free</option>
                                <option value="Ketogenic">Ketogenic</option>
                                <option value="Vegetarian">Vegetarian</option>
                                <option value="Vegan">Vegan</option>
                                <option value="Paleo">Paleo</option>
                            </select>
                        </label>
                    </div>
                    <div className="form-group">
                        <label >
                            Intolerances:
                            <select className="m-1 form-control" value={fields["intolerance"]} name="intolerance" onChange={(event) => this.handleChange("intolerance", event)} >
                                <option value="">None</option>
                                <option value="Soy Free">Soy Free</option>
                                <option value="Peanut Free">Peanut Free</option>
                                <option value="Grain Free">Grain Free</option>
                                <option value="Dairy Free">Dairy Free</option>
                            </select>
                        </label>
                    </div>
                    {loadingButton ? (
                        <button className="btn btn-primary" type="button" disabled>
                            <span className="spinner-border spinner-border-sm mr-1" role="status" aria-hidden="true"></span>
                            Loading...
                        </button>
                    ) : (
                            <input type="submit" className="btn btn-primary" onClick={this.handleClick} value="Submit" />
                        )
                    }
                </form>
                <ul className="container col-xs-12">
                    {recipes.map(recipe => (
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
                    ))}
                </ul>
            </Fragment>
        );
    }
}

export default Recipes;