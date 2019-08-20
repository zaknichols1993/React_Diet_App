import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toggleNavbar: true
        }
        this.handleClick = this.handleClick.bind(this);
        this.setWrapperRef = this.setWrapperRef.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    /**
     * Set the wrapper ref
     */
    setWrapperRef(node) {
        this.wrapperRef = node;
    }

    /**
     * Set state if clicked on outside of element
     */
    handleClickOutside(event) {
        const toggleNavbar = this.state.toggleNavbar;
        if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            this.setState({ toggleNavbar: !toggleNavbar })
        }
    }

    handleClick(event) {
        const toggleNavbar = this.state.toggleNavbar
        event.preventDefault();
        this.setState({ toggleNavbar: !toggleNavbar });
    }

    render() {
        const toggleNavbar = this.state.toggleNavbar
        return (
            <nav ref={this.setWrapperRef} className="navbar navbar-expand-lg navbar-light bg-light">
                <Link className="navbar-brand" to="/">Diet and Recipe API</Link>
                <button onClick={this.handleClick} className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                {!toggleNavbar ? (
                    <div className="navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            <Link className="nav-item nav-link" to="/recipes">Recipes <span className="sr-only">(current)</span></Link>
                            <Link className="nav-item nav-link" to="/menu">Menu</Link>
                            <Link className="nav-item nav-link" to="/recipe-nutrients">Search Macronutrients</Link>
                        </div>
                    </div>
                ) : null}
            </nav>
        )
    }
}

export default Navbar