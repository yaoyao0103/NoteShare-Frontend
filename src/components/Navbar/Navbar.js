import React from "react";
import "./Navbar.css";
import Logo from "./Logo/Logo";
import NavButton from "./NavButton/NavButton";
import NavMenu from "./NavMenu/NavMenu";
import Button from "../Button/Button";
import Text from "../Text/Text";
import {
  UserOutlined,
} from '@ant-design/icons';
function Navbar(props) {
  return (
    <div id="navbar" className="nav">
      <Logo />
      <NavButton currPage={props.currPage} changePage={(page) => props.changePage(page)} />
      <NavMenu />
      <div className="navbar__Button">
        <Button color={"black"} icon={<UserOutlined />}><Text color='white' cls='Large' content={"Login"} fontSize='20' display="inline-block" /></Button>
      </div>
      </div>
  );
}

export default Navbar;