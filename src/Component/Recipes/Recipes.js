import React, {useState} from 'react'
import './Recipes.css'
import RecipeList from '../RecipeList/RecipeList'
import Pagination from '../Pagination/Pagination'
import {fetchCatRecipeList , fetchRECIPELIST} from '../../Redux/actions/recipeListAction'
import { connect } from 'react-redux'
import Preloader from '../Preloader/Preloader'


function Recipes({fetchCatRecipeList,fetchRECIPELIST}) {
    const [Limit] = useState(10)
    const [Skip, setSkip] = useState(0);
    const [Loading, setLoading] = useState(true)

    setTimeout(() => {
      setLoading(false);
    }, 1000);

    let categories_open = false
    const handleCategoriesSec = () =>{
        if(!categories_open){
            document.querySelector('.categories_list').classList.add('categories_open')
            categories_open=true
        }
        else{
            document.querySelector('.categories_list').classList.remove('categories_open')
            categories_open=false
        }
    }

    const handleSkip = (sk)=>{
        setSkip(sk)
    }

    const handleCategories = (e)=>{
      e.preventDefault()
      if(e.target.name !== 'All'){
      setSkip(0)
      const selected_category = e.target.name
      
      fetchCatRecipeList(Limit,Skip,selected_category)
    }
    else{
      setSkip(0)
      fetchRECIPELIST(Limit,Skip)
    }
    }

    return (
      <>
        {
          Loading ? <Preloader/>:
          <div className="recipes">
            {/* <div className="search_bar">
          <input className="search_input" type="text" placeholder="Search" />
          <span className="search_icon fas fa-search"></span>
        </div> */}
            <div className="recipes_container">
              <div className="categories_col">
                <h3 onClick={handleCategoriesSec}>Categories</h3>
                <ul className="categories_list">
                  <li>
                    <button onClick={handleCategories} name="All">
                      All
                    </button>
                  </li>
                  <li>
                    <button onClick={handleCategories} name="Desi">
                      Desi
                    </button>
                  </li>
                  <li>
                    <button onClick={handleCategories} name="Traditional">
                      Traditional
                    </button>
                  </li>
                  <li>
                    <button onClick={handleCategories} name="Westren">
                      Westren
                    </button>
                  </li>
                  <li>
                    <button onClick={handleCategories} name="Desert">
                      Desert
                    </button>
                  </li>
                  <li>
                    <button onClick={handleCategories} name="Baked">
                      Baked
                    </button>
                  </li>
                  <li>
                    <button onClick={handleCategories} name="Drinks">
                      Drinks
                    </button>
                  </li>
                </ul>
              </div>
              <div className="recipes_col">
                <h1>Recipes</h1>
                <div className="recipes_list">
                  <RecipeList calledFrom="Recipes" skip={Skip} limit={Limit} />
                </div>
              </div>
            </div>
            <Pagination limit={Limit} handleSkip={handleSkip} />
          </div>
        }
      </>
    );
}



export default connect(null,{fetchCatRecipeList,fetchRECIPELIST})(Recipes)
