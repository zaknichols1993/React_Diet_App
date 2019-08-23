import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

function EachMenuItem(props) {
    const menuItems = props.menuItems
    const eachMenuItem = menuItems.map(menuItem => {
        return <li key={menuItem.id} className="recipes-li">
            <div className="media rounded">
                <img className="height recipes-img" alt="menuItem" src={menuItem.image} />
                <div className="media-body p-2">
                    <h5>{menuItem.title}</h5>
                    <div>Serving Size: {menuItem.servingSize}</div>
                    <div>Restaurant Chain: {menuItem.restaurantChain}</div>
                    <Link to={`food/menuItems/${menuItem.id}`} className="btn btn-primary">View Details</Link>
                </div>
            </div>
        </li> 
    });

    return (
        <Fragment>{eachMenuItem}</Fragment>
    )
}

export default EachMenuItem