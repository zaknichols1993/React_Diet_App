import React, { Component } from 'react'

class MenuItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            menuItem: {}
        };
    }
    async componentDidMount() {
        const { id } = this.props.match.params;
        try {
            const data = await fetch(`https://api.spoonacular.com/food/menuItems/${id}?apiKey=aa3d290f817b4356a170f6ffde9ecfea`)
            const result = await data.json();
            this.setState({
                isLoaded: true,
                menuItem: result,
            });
        } catch (error) {
            this.setState({
                isLoaded: true,
                error
            });
        }
    }
    render() {
        const { isLoaded } = this.state;
        if (!isLoaded) return (
            <div className="text-center mt-3">
                <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        )
        const { id } = this.props.match.params;
        const {
            title,
            restaurantChain,
            images: image,
            nutrition: nutrition
        } = this.state.menuItem

        return (
            <div className="container">
                <div>id: {id}</div>
                <h3>{title}</h3>
                <h5>{restaurantChain}</h5>
                <img className="col-md-6 offset-md-3 my-3" src={image[1]} alt={title} />
                <div className="row">
                    {Object.entries(nutrition).map(([key, value], i) => {
                        return (
                            <div key={i} className="col text-center">
                                <strong>{key.charAt(0).toUpperCase() + key.slice(1)}</strong>: {value}
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}

export default MenuItem;
