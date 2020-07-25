import React from "react";
import "./Nav.css";
import TogglerBtn from "../TogglerBtn/TogglerBtn";
import logo from "../../assets/logo.svg";
import { NavLink ,Link} from "react-router-dom";
import axios from "../../utils/Axios";

function Nav({ handleToggler }) {
  const handleLogout = () => {
    console.log("works");
    if (window.sessionStorage.getItem("isLogedIn")) {
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
          console.log(res.data);
          if (res.data === 1) {
            window.sessionStorage.clear();
            window.location.reload();
          }
        })
        .catch((res) => {
          console.log(res);
        });
    }
  };
  console.log(window.location.pathname);
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
              {/* <span onClick={handleLogout}>Logout</span> */}
            </div>
          ) : null}
        </div>
        <Link to='/home'>
          <img src={logo} alt="LOGO" />
        </Link>
        <TogglerBtn handleToggler={handleToggler} />
      </div>
      <div className="nav_container">
        <div className="nav_item">
          <NavLink activeClassName="active_nav" to="/home" className="nav_link">
            Home
          </NavLink>
        </div>
        <div className="nav_item">
          <NavLink
            activeClassName="active_nav"
            to="/about"
            className="nav_link"
          >
            About
          </NavLink>
        </div>
        <div className="nav_item">
          <NavLink
            activeClassName="active_nav"
            to="/recipes"
            className="nav_link"
          >
            Recipes
          </NavLink>
        </div>
        <div className="nav_item">
          <NavLink
            activeClassName="active_nav"
            to="/contact"
            className="nav_link"
          >
            Contact us
          </NavLink>
        </div>
        <div className="nav_item">
          <NavLink
            activeClassName="active_nav"
            to="/suggestion"
            className="nav_link"
          >
            Suggestions
          </NavLink>
        </div>
        <div className="nav_item">
          <NavLink
            activeClassName="active_nav"
            to="/saved_recipes"
            className="nav_link"
          >
            Saved Recipes
          </NavLink>
        </div>
        <div className="nav_item">
          <NavLink
            activeClassName="active_nav"
            to="/login"
            onClick={handleLogout}
            className="nav_link"
          >
            {window.sessionStorage.getItem("isLogedIn")
              ? "Logout"
              : "Login / Signup"}
          </NavLink>
        </div>
      </div>
    </nav>
  );
}
export default Nav;
