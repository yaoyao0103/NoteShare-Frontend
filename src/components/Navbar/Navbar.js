import React, { useState, useEffect } from "react";

import "./Navbar.css";
import Logo from "./Logo/Logo";
import NavButton from "./NavButton/NavButton";
import NavMenu from "./NavMenu/NavMenu";
import Button from "../Button/Button";
import Text from "../Text/Text";
import SearchBar from "./SearchBar/SearchBar";
import Ring from "./Ring/Ring";
import Coin from "./Coin/Coin";
import AvatarButton from "./AvatarButton/AvatarButton";
import {
  UserOutlined,
  DollarOutlined
} from '@ant-design/icons';
import { Row, Col } from 'antd';
function Navbar(props) {
  const [width, setWindowWidth] = useState(0)
  useEffect(() => { 

      updateDimensions();
      window.addEventListener("resize", updateDimensions);
      return () => 
          window.removeEventListener("resize",updateDimensions);
  }, [])

  const updateDimensions = () => {
      const width = window.innerWidth
      setWindowWidth(width)
  }
  const responsive = {
    showMenu: width >= 768,
    showSearchBar: width >= 650
  }

  return (
    <div id="navbar" className="nav">
      <div className="navbar__Inner">
        <Logo setPageProps={props.setPageProps} />
        <NavButton pageProps={props.pageProps} setPageProps={props.setPageProps} />
        {responsive.showMenu?
          <NavMenu setPageProps={props.setPageProps} /> 
          :
          <></>
        }
        {responsive.showSearchBar?
          <SearchBar setPageProps={props.setPageProps} />
          :
          <></>
        }

        {props.loggedIn ?
          <div className="navbar__Button__LoggedIn">
            <div className="navbar__Button__LoggedIn__Item navbar__Button__Ring">
              <Ring setLoggedIn={props.setLoggedIn} setPageProps={props.setPageProps} ringList={props.ringList} setRingList={props.setRingList} ringNumber={props.ringNumber} setRingNumber={props.setRingNumber} className="navbar__Ring" />
            </div>
            <div className="navbar__Button__LoggedIn__Item navbar__Button__Coin">
              <Coin setLoggedIn={props.setLoggedIn} setPageProps={props.setPageProps} setCoinNum={props.setCoinNum} coinNum={props.coinNum} />
            </div>
            <div className="navbar__Button__LoggedIn__Item navbar__Button__Avatar">
              <AvatarButton className="navbar__AvatarButton" changeAvatarNum={props.changeAvatarNum} setLoggedIn={props.setLoggedIn} setPageProps={props.setPageProps} changeAvatar={props.changeAvatar}  />
            </div>

          </div>
          :
          <div className="navbar__Button">
            <div className="navbar__Buttons" onClick={() => { props.setPageProps({ page: 'SignUpPage' }) }}>
              <Button color={"white"}><Text color='Black' cls='Default' content={"Sign Up"} fontSize='15' display="inline-block" /></Button>
            </div>
            <div className="navbar__Buttons" onClick={() => { props.setPageProps({ page: 'LoginPage' }) }}>
              <Button color={"black"} icon={<UserOutlined />}><Text color='white' cls='Large' content={"Login"} fontSize='15' display="inline-block" /></Button>
            </div>
          </div>
        }
      </div>


    </div>
  );
}

export default Navbar;