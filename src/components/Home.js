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
            <div className="container">
                <Link to="/recipes" className="btn btn-primary btn-lg mt-3">Search Recipes!</Link>
                <div>
                    <div className="row mt-3">
                        {randomRecipes.recipes.map(randomRecipe => (
                            <div key={randomRecipe.id} className="col-6 col-md-3 mb-3">
                                <div className="card card-stuff footer-widget">
                                    <div>
                                        <img src={randomRecipe.image} className="img-fluid" />
                                        <div className="card-title text-center mt-1 col-eq"><strong>{randomRecipe.title}</strong></div>
                                        <Link to={`recipes/${randomRecipe.id}/information`} className="btn btn-primary m-2 info-button">View Details</Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )
    }
}

export default Home;