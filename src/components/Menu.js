import React, { Fragment, Component } from 'react';
import { Link } from 'react-router-dom';

import EachMenuItem from './EachMenuItem'

class Menu extends Component {
    state = {
        error: null,
        isLoaded: false,
        menuItems: [],
        query: ''
    };


    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit = async (event) => {
        const { query } = this.state;
        event.preventDefault();
        try {
            const data = await fetch(`https://api.spoonacular.com/food/menuItems/search?query=${query}&number=3&apiKey=aa3d290f817b4356a170f6ffde9ecfea`)
            const result = await data.json()
            console.log(result)
            this.setState({
                isLoaded: true,
                menuItems: result.menuItems,
            });
        } catch (error) {
            this.setState({
                isLoaded: true,
                error
            });
        }
    }


    render() {
        const { error, isLoaded, menuItems, query } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
            // } else if (!isLoaded) {
            //     return <div>Loading...</div>;
        } else {
            return (
                <Fragment>
                    <form className="container mt-3" onSubmit={this.handleSubmit}>
                        <p>Search over 115,000 menu items from over 800 fast food and chain restaurants. For example, McDonald's Big Mac or Starbucks Mocha.</p>
                        <div className="form-group">
                            <label>
                                Search: <input className="m-1 form-control" type="text" name="query" value={query} onChange={this.handleChange} />
                            </label>
                        </div>
                        <input type="submit" className="btn btn-primary" value="Submit" />
                    </form>
                    <ul className="container col-xs-12">
                        <EachMenuItem menuItems={menuItems} />
                    </ul>
                </Fragment>
            );
        }
    }
}

export default Menu;