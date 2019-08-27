import React, { Fragment, Component } from 'react';

import EachRecipe from './EachRecipe'

class SearchRecipes extends Component {
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
    };

    handleValidation = () => {
        const fields = this.state.fields
        const errors = {};
        let formIsValid = false;

        if (fields.query) {
            formIsValid = true;
        } else {
            errors.query = "Search cannot be empty";
        }
        this.setState({ errors: errors });
        return formIsValid;
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
                const data = await fetch(`https://api.spoonacular.com/recipes/search?query=${fields.query}&cuisine=${fields.cuisine}&diet=${fields.diet}&intolerances=${fields.intolerance}&number=6&apiKey=aa3d290f817b4356a170f6ffde9ecfea`)
                const result = await data.json()
                console.log(result)
                this.setState({
                    isLoaded: true,
                    recipes: result.results,
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
            recipes,
            fields,
            errors
        } = this.state;

        return (
            <Fragment>
                <form className="container mt-2" onSubmit={this.handleSubmit}>
                    <p className="lead">Search for over 360,000 different recipes and filter your results by dietary requirements.</p>
                    <div className="form-group">
                        <label>
                            Search: <input className="form-control" type="text" name="query" value={fields.query} onChange={this.handleChange} />
                        </label>
                        <br />
                        <div className='text-danger'>{errors.query}</div>
                    </div>
                    <div className="form-group">
                        <label>
                            Cuisine:
                            <select className="form-control" value={fields.cuisine} name="cuisine" onChange={this.handleChange} >
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
                        <div className='text-danger'>{errors.cuisine}</div>
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
                    <div className="form-group">
                        <label >
                            Intolerances:
                            <select className="form-control" value={fields.intolerance} name="intolerance" onChange={this.handleChange} >
                                <option value="">None</option>
                                <option value="Soy Free">Soy Free</option>
                                <option value="Peanut Free">Peanut Free</option>
                                <option value="Grain Free">Grain Free</option>
                                <option value="Dairy Free">Dairy Free</option>
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
                    <div className="row">
                        <EachRecipe recipes={recipes} />
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default SearchRecipes;