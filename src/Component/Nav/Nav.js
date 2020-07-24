import React from "react";
import "./Nav.css";
import TogglerBtn from "../TogglerBtn/TogglerBtn";
import logo from "../../assets/logo.svg";
import { Link } from "react-router-dom";
import axios from "../../utils/Axios";

function Nav({ handleToggler }) {

  const handleLogout = () => {
    console.log("works");
    axios
      .post(
        "/user/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${window.sessionStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data)
        if (res.data === 1) {
          window.sessionStorage.clear();
          window.location.reload()
        }
      })
      .catch((res) => {
        console.log(res);
      });
  };

  return (
    <nav>
      <div className="nav_brand">
        <div className="logout_container">
          {window.sessionStorage.getItem("isLogedIn") ? (
            <div className="logout">
              <p>
                <span className="far fa-user"></span>
                {window.sessionStorage.getItem("userName").split(" ", 1)}
              </p>
              <span onClick={handleLogout}>Logout</span>
            </div>
          ) : null}
        </div>
        <img src={logo} alt="LOGO" />
        <TogglerBtn handleToggler={handleToggler} />
      </div>
      <div className="nav_container">
        <div className="nav_item">
          <Link to="/home" className="nav_link">
            Home
          </Link>
        </div>
        <div className="nav_item">
          <Link to="/about" className="nav_link">
            About
          </Link>
        </div>
        <div className="nav_item">
          <Link to="/recipes" className="nav_link">
            Recipes
          </Link>
        </div>
        <div className="nav_item">
          <Link to="/contact" className="nav_link">
            Contact us
          </Link>
        </div>
        <div className="nav_item">
          <Link to="/suggestion" className="nav_link">
            Suggestions
          </Link>
        </div>
        <div className="nav_item">
          <Link to="/saved_recipes" className="nav_link">
            Saved Recipes
          </Link>
        </div>
        <div className="nav_item">
          <Link to="/login" className="nav_link">
            Login / Signup{" "}
          </Link>
        </div>
      </div>
    </nav>
  );
}




export default Nav;
