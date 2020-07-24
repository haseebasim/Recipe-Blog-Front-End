import React from 'react'
import ReactQuill from "react-quill";
function IngredientList({ingredients,handleIngredients}) {
    return (
      <div>
        <label>Ingredient List</label>
        <ReactQuill
          className="ingredient_quill"
          value={ingredients}
          onChange={handleIngredients}
        />
      </div>
    );
}

export default IngredientList
