import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'

class Home extends Component {
    state = {
        randomRecipes: [],
        isLoaded: false
    }

    componentDidMount = async () => {
        try {
            const data = await fetch(`https://api.spoonacular.com/recipes/random?number=4&apiKey=bb6a675616934bed81e967cc50497f10`);
            const result = await data.json();
            console.log(result)
            this.setState({
                isLoaded: true,
                randomRecipes: result
            });
        } catch (error) {
            this.setState({
                isLoaded: true,
                error,
            });
        }
    }

    render() {
        const { randomRecipes, isLoaded } = this.state

        // DO NOT TRY TO RENDER THE DATA UNTIL DONE LOADING. IT WILL RETURN UNDEFINED.
        // randomRecipes.recipes.map() was returning undefined because I didn't have 
        // the following code below. Just a quick note for me.

        if (!isLoaded) return (
            <div className="text-center mt-3">
                <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        )

        console.log(randomRecipes)

        return (
            <Fragment>
                <div className="jumbotron jumbotron-fluid hero-image text-white">
                    <div className="container">
                        <h3>Welcome to EasyDiet!</h3>
                        <p className="lead">EasyDiet is like a nutritionist in your pocket. Tell EasyDiet your target calories and diet type (keto, paleo, vegan, etc.).
                        EasyDiet will give you a custom diet based on your preferances. You can also search for recipes and restaurant items based on several different dietary requirements.</p>
                        <Link to="/recipes" className="btn btn-success btn-lg mb-2">Search Recipes!</Link>
                        <br/>
                        <Link to="/recipes" className="btn btn-dark btn-lg">Get a Meal Plan!</Link>
                    </div>
                </div>
                <div className="container">
                    <p className="lead">Random Recipes!</p>
                    <p>Every time you visit the homepage you'll be shown new recipes!</p>
                    <br />
                    <div className="row">
                        {randomRecipes.recipes.map(randomRecipe => (
                            <div key={randomRecipe.id} className="col-6 col-md-3 mb-3">
                                <div className="card card-stuff footer-widget">
                                    <div>
                                        <img src={randomRecipe.image} className="img-fluid" />
                                        <div className="card-title text-center mt-1 col-eq"><strong>{randomRecipe.title}</strong></div>
                                        <Link to={`recipes/${randomRecipe.id}/information`} className="btn btn-success m-2 info-button">View Details</Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default Home;