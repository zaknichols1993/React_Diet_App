import React, { Fragment } from 'react'

function RecipeInstructions(props) {
    const instructions = props.instructions
    const eachInstruction = instructions[0].steps.map(instruction => {
        return (instructions.length ?
                (<li key={instruction.number} className="recipe-li">{instruction.number}: {instruction.step}</li>)
                :
                (<div>Sorry! There are no instructions for this recipe.</div>)
        )
    })
    return (
        <Fragment>{eachInstruction}</Fragment>
    )
}

export default RecipeInstructions