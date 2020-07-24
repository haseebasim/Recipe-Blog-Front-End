import React, { useEffect, useState } from "react";
import axios from "../../utils/Axios";
import "./RecipeList.css";
import { Link } from "react-router-dom";
import Food from "../../assets/food.jpg";
import {
  fetchRECIPELIST,
  fetchSavedRecipeList,
} from "../../Redux/actions/recipeListAction";
import { connect } from "react-redux";
import Preloader from "../Preloader/Preloader";

function RecipeList({
  calledFrom,
  skip,
  limit,
  fetchRECIPELIST,
  fetchSavedRecipeList,
  recipeList,
  saved_recipeList,
  loading,
}) {
  useEffect(() => {
    if (calledFrom === "Recipes") {
      fetchRECIPELIST(limit, skip);
    } else if (calledFrom === "SavedRecipes") {
      fetchSavedRecipeList(limit, skip);
    }
    return () => {};
  }, [calledFrom, fetchRECIPELIST, fetchSavedRecipeList, limit, skip]);

  const handleSave = (id) => {
    if (window.sessionStorage.getItem("isLogedIn")) {
      axios
        .post(
          "/save",
          {
            post_id: id,
          },
          {
            headers: {
              Authorization: `Bearer ${window.sessionStorage.getItem("token")}`,
            },
          }
        )
        .then((res) => {
          const snackbar = document.getElementsByClassName("snackbar")[0];
          console.log(snackbar);
          snackbar.classList.add("snackbar_show");
          setTimeout(function () {
            snackbar.classList.remove("snackbar_show");
          }, 3000);
        })
        .catch((res) => {
          console.log(res.data);
        });
    } else {
      const snackbar = document.getElementsByClassName("snackbar")[0];
      snackbar.classList.add("snackbar_show");
      setTimeout(function () {
        snackbar.classList.remove("snackbar_show");
      }, 3000);
    }
  };

  const Data = () => (calledFrom === "Recipes" ? recipeList : saved_recipeList);

  const Recipe = () => {
    const reicpe_array = Data().map((recipe) => {
      return (
        <div key={recipe._id} className="recipe_card">
          <img
            className="recipe_card_img"
            src={
              recipe.recipeImg
                ? `data:image/jpg;base64,${recipe.recipeImg}`
                : Food
            }
            alt="Food"
          />
          <div className="recipe_card_content_sec">
            <Link to={`/recipes/${recipe._id}`} className="recipe_card_content">
              <h3 className="recipe_card_header">{recipe.title}</h3>
            </Link>
            <div>
              {calledFrom === "SavedRecipes" ? null : (
                <button
                  onClick={() => {
                    handleSave(recipe._id);
                  }}
                  type="button"
                  className="save_btn"
                >
                  <span className="fa fa-heart"></span>
                </button>
              )}
            </div>
          </div>
        </div>
      );
    });
    return reicpe_array;
  };

  return (
    <>
      {loading ? <Preloader /> : <Recipe />}
      <div className="snackbar">
        {window.sessionStorage.getItem("isLogedIn")
          ? "Saved"
          : "Please login to save the recipe"}
      </div>
    </>
  );
}
const mapStateToProps = (state) => ({
  recipeList: state.recipeList.items,
  loading: state.recipeList.loading,
  saved_recipeList: state.recipeList.savedItems,
});
export default connect(mapStateToProps, {
  fetchRECIPELIST,
  fetchSavedRecipeList,
})(RecipeList);
