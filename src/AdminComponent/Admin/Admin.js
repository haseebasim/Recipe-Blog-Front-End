import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import AddPost from "../AddPost/AddPost";
import AdminHome from "../AdminHome/AdminHome";
import AdminEdit from "../AdminEdit/AdminEdit";

function Admin({ setShow }) {
  useEffect(() => {
    setShow(false);
    return () => {
      setShow(true);
    };
  }, [setShow]);

  return (
    <div>
      
        <Switch>
          <Route path="/admin/home" component={AdminHome} />
          <Route path="/admin/edit/:id" component={AdminEdit} />
          <Route path="/admin/addpost" component={AddPost} />
        </Switch>
    </div>
  );
}

export default Admin;
