import React, { Fragment } from 'react'

function RecipeInstructions(props) {
    const instructions = props.instructions
    let eachInstruction
    if (instructions.length) {
        eachInstruction = instructions[0].steps.map(instruction => {
            return (
                <li key={instruction.number} className="recipe-li">{instruction.number}: {instruction.step}</li>
            )
        })
    } else {
        return <div>Sorry! There are no instructions for this recipe.</div>
    }
    return (
        <Fragment>{eachInstruction}</Fragment>
    )
}

export default RecipeInstructions