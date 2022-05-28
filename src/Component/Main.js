import React from 'react'
import Home from './Home/Home'
import Login from './Login/Login'
import { Switch, Route, Redirect } from 'react-router-dom'
import Recipes from './Recipes/Recipes'
import ContactUs from './ContactUs/ContactUs'
import Suggestion from './Suggestion/Suggestion'
import SavedRecipes from './SavedRecipes/SavedRecipes'
import RecipePost from './RecipePost/RecipePost'
import About from './About/About'
import AdminLogin from './AdminLogin/AdminLogin'
import Admin from '../AdminComponent/Admin/Admin'

function Main({setShow}) {
    return (
      <div style={{ height: "100%" }}>
        <Switch>
          <Route
            path="/admin"
            component={(props) => <Admin {...props} setShow={setShow} />}
          />
          <Route
            path="/admin-szfood"
            component={() => <AdminLogin setShow={setShow} />}
          />
          <Route path="/home" component={Home} />
          <Route path="/about" component={About} />
          <Route exact path="/recipes" component={Recipes} />
          <Route path="/saved_recipes" component={SavedRecipes} />
          <Route path="/recipes/:id" component={RecipePost} />
          <Route path="/login" component={Login} />
          <Route path="/contact" component={ContactUs} />
          <Route path="/suggestion" component={Suggestion} />
          <Redirect to="/home" />
        </Switch>
      </div>
    );
}

export default Main
