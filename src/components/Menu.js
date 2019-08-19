import React, { Fragment, Component } from 'react';
import { Link } from 'react-router-dom';

class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            menuItems: [],
            query: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit(event) {
        const { query} = this.state;
        event.preventDefault();
        fetch(`https://api.spoonacular.com/food/menuItems/search?query=${query}&number=3&apiKey=aa3d290f817b4356a170f6ffde9ecfea`)
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result)
                    this.setState({
                        isLoaded: true,
                        menuItems: result.menuItems
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
        const { error, isLoaded, menuItems, query} = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        // } else if (!isLoaded) {
        //     return <div>Loading...</div>;
        } else {
            return (
                <Fragment>
                    <form className="container mt-3" onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label>
                                Search: <input className="m-1 form-control" type="text" name="query" value={query} onChange={this.handleChange} />
                            </label>
                        </div>
                        <input type="submit" className="btn btn-primary" value="Submit" />
                    </form>
                    <ul className="container col-xs-12">
                        {menuItems.map(menuItem => (
                            <li key={menuItem.id} className="menuItems-li">
                                <div className="media rounded">
                                    <img className="height menuItems-img" alt="menuItem" src={menuItem.image} />
                                    <div className="media-body p-2">
                                        <h5>{menuItem.title}</h5>
                                        <div>Serving Size: {menuItem.servingSize}</div>
                                        <div>Restaurant Chain: {menuItem.restaurantChain}</div>
                                        <Link to={`food/menuItems/${menuItem.id}`} className="btn btn-primary">View Details</Link>
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

export default Menu;