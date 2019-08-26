import React, { Fragment } from 'react'

function RecipeNutrition(props) {
    console.log(props)
    const nutrients = props.nutrition.nutrients
    const filteredNutrients = nutrients.filter(({ title }) => [
        'Calories',
        'Protein',
        'Carbohydrates',
        'Fat',
        'Sugar',
        'Fiber'
    ].includes(title));
    const eachNutrient = filteredNutrients.map(nutrient => {
        return (
            <li key={nutrient.title}>
                {nutrient.title}: {nutrient.amount.toFixed()}{nutrient.unit}
            </li>
        )
    })
    return (
        <Fragment>{eachNutrient}</Fragment>
    )
}
export default RecipeNutrition