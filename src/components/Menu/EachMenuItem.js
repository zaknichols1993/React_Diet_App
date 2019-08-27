import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

function EachMenuItem(props) {
    const menuItems = props.menuItems
    const eachMenuItem = menuItems.map(menuItem => {
        return (
            <div key={menuItem.id} className="col-12 col-sm-6 col-md-4 mb-2">
                <div className="card card-stuff mt-3 footer-widget">
                    <img className="img-fluid img" alt="menuItem" src={menuItem.image} />
                    <div className="card-body">
                        <h5 className="card-title">{menuItem.title}</h5>
                        <div>Serving Size: {menuItem.servingSize}</div>
                        <div className="col-eq">Restaurant Chain: {menuItem.restaurantChain}</div>
                        <Link to={`food/menuItems/${menuItem.id}`} className="btn btn-success info-button">View Details</Link>
                    </div>
                </div>
            </div>
        )
    });
    return (
        <Fragment>{eachMenuItem}</Fragment>
    )
}

export default EachMenuItem