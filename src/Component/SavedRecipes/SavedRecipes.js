import React,{useState} from 'react'
import './SavedRecipes.css'
import Pagination from '../Pagination/Pagination'
import RecipeList from '../RecipeList/RecipeList'
import {Link} from 'react-router-dom'
function SavedRecipes() {
    const [Limit, setLimit] = useState(15); 
    const [Skip] = useState(0);
    const [ShowPag, setShowPag] = useState(true);
    const handleSkip = (sk) => {
       setLimit(sk);
     };
    
    return (
      <div className="savedrecipes">
        <h1>Saved Recipes</h1>
        <div className="saved_recipe_list">
          {window.sessionStorage.getItem("isLogedIn") ? (
            <RecipeList
              setShowPag={setShowPag}
              calledFrom="SavedRecipes"
              skip={Skip}
              limit={Limit}
            />
          ) : (
            <div className="ask_login">
              Please <Link to="/login">Login</Link> to access this page
            </div>
          )}
        </div>
        {window.sessionStorage.getItem("isLogedIn") ? (
          <Pagination ShowPag={ShowPag} limit={Limit} handleSkip={handleSkip} />
        ) : null}
      </div>
    );
}

export default SavedRecipes
