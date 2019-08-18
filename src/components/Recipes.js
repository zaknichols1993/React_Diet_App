import React, { Fragment, Component } from 'react';
import { Link } from 'react-router-dom'

class Recipes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            recipes: [],
            query: '',
            cuisine: '',
            diet: '',
            intolerances: []
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChecked = this.handleChecked.bind(this);
    }

    componentDidMount() {
        this.setState({ isLoaded: true })
    }


    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleChecked(event) {
        //this.setState({value: event.option});
        this.setState({ intolerances: Array.from(event.target.selectedOptions, (intolerance) => intolerance.value) });
    }

    handleSubmit(event) {
        const { query, cuisine, diet, intolerances } = this.state;
        event.preventDefault();
        fetch(`https://api.spoonacular.com/recipes/search?query=${query}&cuisine=${cuisine}&diet=${diet}&intolerances=${intolerances}&number=10&apiKey=aa3d290f817b4356a170f6ffde9ecfea`)
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result)
                    this.setState({
                        isLoaded: true,
                        recipes: result.results
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
        const { error, isLoaded, recipes, query, cuisine, diet, intolerances } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <Fragment>
                    <form className="container mt-3" onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label>
                                Search: <input className="m-1 form-control" type="text" name="query" value={query} onChange={this.handleChange} />
                            </label>
                        </div>
                        <div className="form-group">
                            <label>
                                Cuisine:
                            <select className="m-1 form-control" value={cuisine} name="cuisine" onChange={this.handleChange} >
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
                        </div>
                        <div className="form-group">
                            <label >
                                Diet:
                            <select className="m-1 form-control" value={diet} name="diet" onChange={this.handleChange} >
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
                            <select multiple={true} className="m-1 form-control" value={intolerances} name="intolerances" onChange={this.handleChecked} >
                                    <option value="">None</option>
                                    <option value="Soy Free">Soy Free</option>
                                    <option value="Peanut Free">Peanut Free</option>
                                    <option value="Grain Free">Grain Free</option>
                                    <option value="Dairy Free">Dairy Free</option>
                                </select>
                            </label>
                        </div>
                        <input type="submit" className="btn btn-primary" value="Submit" />
                    </form>
                    <ul className="container col-xs-12">
                        {recipes.map(recipe => (
                            <Link to={`recipes/${recipe.id}/information`}>
                                <li key={recipe.id} className="recipes-li">
                                    <div className="media rounded">
                                        <img className="height recipes-img" alt="recipe" src={`https://spoonacular.com/recipeImages/${recipe.image}`} />
                                        <div className="media-body p-2">
                                            <h5>{recipe.title}</h5>
                                            <div>Time to cook: {recipe.readyInMinutes} Minutes</div>
                                            <div>Servings: {recipe.servings}</div>
                                        </div>
                                    </div>
                                </li>
                            </Link>
                        ))}
                    </ul>
                </Fragment>
            );
        }
    }
}

export default Recipes;