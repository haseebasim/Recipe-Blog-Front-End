import React, { useState } from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Main from "./Component/Main";
import Nav from "./Component/Nav/Nav";
import Footer from "./Component/Footer/Footer";
import SideDrawer from "./Component/SideDrawer/SideDrawer";
import BackDrop from "./Component/BackDrop/BackDrop";
import { Provider } from "react-redux";
import store from './Redux/Store'

function App() {
  const [sideDrawerOpen, setSideDrawerOpen] = useState(false);
  const [show, setShow] = useState(true);
  const handleToggler = () => {
    setSideDrawerOpen(!sideDrawerOpen);
  };

  const handleBackDrop = () => {
    setSideDrawerOpen(!sideDrawerOpen);
  };

  let backDrop = null;
  if (sideDrawerOpen) {
    backDrop = <BackDrop handleBackDrop={handleBackDrop} />;
  }

  let nav = null;
  let sidebar = null;
  let footer = null;

  if (show === true) {
    nav = <Nav handleToggler={handleToggler} />;
    sidebar = <SideDrawer sideDrawer={sideDrawerOpen} />;
    footer = <Footer />;
  }

  return (
    <Provider store={store}>
      <div style={{ height: "100%" }}>
        <BrowserRouter>
          {nav}
          {sidebar}
          {backDrop}
          <Main setShow={setShow} />
          {footer}
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;
