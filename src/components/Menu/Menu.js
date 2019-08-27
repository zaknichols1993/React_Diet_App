import React, { Fragment, Component } from 'react';

import EachMenuItem from './EachMenuItem'

class Menu extends Component {
    state = {
        error: null,
        menuItems: [],
        search: '',
        errors: {}
    };

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleValidation = () => {
        const search = this.state.search
        const errors = {};
        let formIsValid = true;

        if (!search) {
            errors.search = "Fill out this field."
            formIsValid = false;
        }

        this.setState({ errors: errors });
        console.log(formIsValid);
        console.log(search)
        return formIsValid
    }

    handleSubmit = async (event) => {
        const search = this.state.search;
        event.preventDefault();
        if (this.handleValidation()) {
            try {
                const data = await fetch(`https://api.spoonacular.com/food/menuItems/search?query=${search}&number=30&apiKey=aa3d290f817b4356a170f6ffde9ecfea`)
                const result = await data.json()
                console.log(result)
                this.setState({
                    menuItems: result.menuItems,
                });
            } catch (error) {
                this.setState({
                    error
                });
            }
        } else {
            console.log('Form is invalid')
        }
    }

    render() {
        const { menuItems, search, errors } = this.state;

        return (
            <Fragment>
                <form className="container mt-3" onSubmit={this.handleSubmit}>
                    <p className="lead">Search over 115,000 menu items from over 800 fast food and chain restaurants. For example, McDonald's Big Mac or Starbucks Mocha.</p>
                    <div className="form-group">
                        <label>
                            Search: <input className="m-1 form-control" type="text" name="search" value={search} onChange={this.handleChange} />
                        </label>
                        <br />
                        <div className='text-danger'>{errors.search}</div>
                    </div>
                    <input
                        type="submit"
                        className="btn btn-primary"
                        onClick={this.handleClick}
                        value="Submit"
                    />
                </form>
                <ul className="container">
                    <div className="row">
                        <EachMenuItem menuItems={menuItems} />
                    </div>
                </ul>
            </Fragment>
        );
    }
}


export default Menu;