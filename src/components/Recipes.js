import React, { Fragment, Component } from 'react'

class Recipes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            recipes: [],
            query: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.setState({ isLoaded: true })
    }


    handleChange(event) {
        this.setState({ query: event.target.value });
    }

    handleSubmit(event) {
        const querySearch = this.state.query
        event.preventDefault();
        fetch(`https://api.spoonacular.com/recipes/search?query=${querySearch}&number=3&apiKey=aa3d290f817b4356a170f6ffde9ecfea`)
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
        const { error, isLoaded, recipes, query } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <Fragment>
                    <form className="container mt-3" onSubmit={this.handleSubmit}>
                        <label>
                            Search: <input type="text" value={query} onChange={this.handleChange} />
                        </label>
                        <input type="submit" value="Submit" />
                    </form>
                    {/* <ul className="container">
                        {recipes.map(recipe => (
                            <li key={recipe.id}>
                                <div>{recipe.title}</div>
                                <img alt="recipe" className="img-fluid" src={`https://spoonacular.com/recipeImages/${recipe.image}`} />
                            </li>
                        ))}
                    </ul> */}
                    <ul className="container">
                        {recipes.map(recipe => (
                            <li key={recipe.id}>
                                <div className="media mb-3">
                                    <img width="200" alt="recipe"  src={`https://spoonacular.com/recipeImages/${recipe.image}`} />
                                    <div className="media-body ml-3">
                                        <h5>{recipe.title}</h5>
                                        <div>Time to cook: {recipe.readyInMinutes} Minutes</div>
                                        <div>Servings: {recipe.servings}</div>
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

export default Recipes;