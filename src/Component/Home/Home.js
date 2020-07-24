import React, { useState,useEffect } from 'react'
import './Home.css'
import Food from '../../assets/food.jpg'
import {Link} from 'react-router-dom'
import {connect } from 'react-redux'
import {fetchHomePosts} from '../../Redux/actions/homeAction'
import Preloader from '../Preloader/Preloader'

function Home({fetchHomePosts , homePosts }) {
    const [Loading, setLoading] = useState(true)
    useEffect(() => {
        fetchHomePosts()
        if(homePosts){
            setTimeout(() => {
              setLoading(false);
            }, 1000);
        }
        
    }, [])
    
    const LatestRecipes = () =>{
        return homePosts.map((recipe) => {
          return (
            <Link
              to={`/recipes/${recipe._id}`}
              key={recipe._id}
              className="latest_recipe_card"
            >
              <img
                className="card_img"
                alt="Latest_Recipes"
                src={
                  recipe.recipeImg
                    ? `data:image/jpg;base64,${recipe.recipeImg}`
                    : Food
                }
              />
              <p className="card_text">{recipe.title}</p>
            </Link>
          );
        });
    }

    const scrollAppear= ()=>{
        try {
            const latest_recipes_container = document.querySelector('.latest_recipes_container')
            let position = latest_recipes_container.getBoundingClientRect().top + (latest_recipes_container.clientHeight / 2)
            let screenPosition = window.innerHeight;
            if(position < screenPosition){
                latest_recipes_container.classList.add('latest_recipes_container_appear')
            }
        } catch (error) {
        }
    } 

    window.addEventListener('scroll', scrollAppear)

    return (
        <>
        {   Loading ? <Preloader/> :
            <div className='homepage'>
            <header className='header'>
                <div className='header_bgt'>
                    <h1>SZ</h1>
                    <p>FOOD</p>
                </div>
                <div className='header_smt'>
                    <h4>DESI + <span>WILAYTI</span></h4>
                </div>
            </header>
            <section className='latest_recipes'>
                <h1 className='latest_recipes_h1'>
                    Latest Recipes
                </h1>
                <div className='latest_recipes_container ' >
                    <LatestRecipes/>
                </div>
                <div className='latest_recipes_btn'>
                    <Link to='/recipes' >More Recipes</Link>
                </div>
            </section>
        </div>}
        </>
    )
    
}

const mapStateToProps = (state) =>({
    homePosts : state.homePosts.items
})

export default connect(mapStateToProps, {fetchHomePosts})(Home)
