import React, { Component } from 'react'

class MenuItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            menuItem: {},
            image: [],
            nutrition: {}
        };
    }
    componentDidMount() {
        const { id } = this.props.match.params;
        fetch(`https://api.spoonacular.com/food/menuItems/${id}?apiKey=aa3d290f817b4356a170f6ffde9ecfea`)
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result)
                    this.setState({
                        isLoaded: true,
                        menuItem: result,
                        image: result.images[0],
                        nutrition: result.nutrition
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
        const { id } = this.props.match.params;
        const { title } = this.state.menuItem
        const image = this.state.image
        const nutrition = this.state.nutrition
        return (
            <div className="container">
                <div>{id}</div>
                <h3>{title}</h3>
                <img src={image} />
                
                {Object.entries(nutrition).map(([key, value], i) => {
                    return (
                        <div key={i}>
                            <strong>{key.charAt(0).toUpperCase() + key.slice(1)}</strong>: {value}
                        </div>
                    )
                })}
                {/* <div>{nutrition.protein}</div> */}
            </div>
        )
    }
}

export default MenuItem;
