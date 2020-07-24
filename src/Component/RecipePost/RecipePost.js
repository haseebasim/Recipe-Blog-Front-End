import React, { useEffect, useState } from "react";
import "./RecipePost.css";
import { Link } from "react-router-dom";
import ReactHtmlParser from "react-html-parser";
import Comments from "../Comments/Comments";
import axios from "../../utils/Axios";
import { connect } from "react-redux";
import { fetchRecipePost } from "../../Redux/actions/recipePostAction";
import Preloader from "../Preloader/Preloader";

function RecipePost({ match, fetchRecipePost, recipePost, loading }) {
  const id = match.params.id;
  const [comment, setcomment] = useState("");

  useEffect(() => {
    fetchRecipePost(id);
    console.log("recipePost useeffect");
  }, [fetchRecipePost, id]);

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
          console.log(res.data);
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
      console.log(snackbar);
      snackbar.classList.add("snackbar_show");
      setTimeout(function () {
        snackbar.classList.remove("snackbar_show");
      }, 3000);
    }
  };

  const handleComment = (id) => {
    axios
      .post(
        "add_comment",
        {
          comment_text: comment,
          post_id: id,
        },
        {
          headers: {
            Authorization: `Bearer ${window.sessionStorage.getItem("token")}`,
          },
        }
      )
      .catch((res) => {
        console.log(res.data);
      });
    setcomment("");
  };

  return loading ? (
    <Preloader/>
  ) : (
    <div className="recipe_post">
      <h1 className="post_header">
        {recipePost.title}{" "}
        <span
          onClick={() => {
            handleSave(id);
          }}
          className="fa fa-heart"
        ></span>
      </h1>
      <div className="post_desc_vid">
        <p>{recipePost.shortDesc}</p>
        <div className="post_vid">{ReactHtmlParser(recipePost.link)}</div>
      </div>
      <div className="post_prep">
        <div className="post_ingrediants">
          <h3>INGREDIENTS</h3>
          {ReactHtmlParser(recipePost.ingredients)}
        </div>
        <div className="post_preparation">
          <h3>Preparation</h3>
          <div className="prep_steps">{ReactHtmlParser(recipePost.recipe)}</div>
        </div>
      </div>
      <div className="post_comments_sec">
        <div className="post_login_link">
          {window.sessionStorage.getItem("isLogedIn") ? null : (
            <div>
              <p>For more awesome recipes login.</p>
              <Link className="post_login" to="/login">
                Login
              </Link>
              <p>OR</p>
            </div>
          )}
          <p>Follow</p>
          <div className="post_social_links">
            <a href="/">
              <span className="fab fa-facebook-square"></span>
            </a>

            <a href="/">
              <span className="fab fa-instagram"></span>
            </a>

            <a href="/">
              <span className="fab fa-youtube"></span>
            </a>
          </div>
        </div>
        <div className="post_comments">
          <h2>Comments</h2>
          <div>
            {window.sessionStorage.getItem("isLogedIn") ? (
              <div className="comment_input">
                <input
                  type="text"
                  placeholder="Enter your comment"
                  name="comment"
                  value={comment}
                  onChange={(e) => {
                    setcomment(e.target.value);
                  }}
                />
                <span
                  onClick={(e) => {
                    handleComment(id);
                  }}
                  className="fa fa-share"
                ></span>
              </div>
            ) : (
              <div className="post_ask_login">
                Please <Link to="/login">Login</Link> to post Comments
              </div>
            )}
          </div>
          <Comments recipe_id={id} />
        </div>
      </div>
      <div className="snackbar">
        {window.sessionStorage.getItem("isLogedIn")
          ? "Saved"
          : "Please login to save the recipe"}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  recipePost: state.recipePost.item,
  loading : state.recipePost.loading
});

export default connect(mapStateToProps, { fetchRecipePost })(RecipePost);
