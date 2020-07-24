import React from 'react'
import ReactQuill from 'react-quill'

function RecipeSteps({steps, handleSteps}) {
    return (
      <div>
        <label>Recipe List</label>
        <ReactQuill
          className="recipe_quill"
          value={steps}
          onChange={handleSteps}
        />
      </div>
    );
}

export default RecipeSteps
