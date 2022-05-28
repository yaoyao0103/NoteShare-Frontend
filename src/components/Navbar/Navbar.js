import React from "react";
import "./Navbar.css";
import Logo from "./Logo/Logo";
import NavButton from "./NavButton/NavButton";
import NavMenu from "./NavMenu/NavMenu";
function Navbar(props) {
  return (
    <div id="navbar" className="nav">
      <Logo />
      <NavButton currPage={props.currPage} changePage={(page) => props.changePage(page)} />
      <NavMenu />
    </div>
  );
}

export default Navbar;