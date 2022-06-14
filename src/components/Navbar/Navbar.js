import React, { useState }from "react";
import "./Navbar.css";
import Logo from "./Logo/Logo";
import NavButton from "./NavButton/NavButton";
import NavMenu from "./NavMenu/NavMenu";
import Button from "../Button/Button";
import Text from "../Text/Text";
import SearchBar from "./SearchBar/SearchBar";
import Ring from "./Ring/Ring";
import AvatarButton from "./AvatarButton/AvatarButton";
import {
  UserOutlined,
} from '@ant-design/icons';
import {Row,Col} from 'antd';
function Navbar(props) {
  const [loggedIn, setLoggedIn] = useState(true);
  return (
    <div id="navbar" className="nav">
      <Logo />
      <NavButton currPage={props.currPage} changePage={(page) => props.changePage(page)} />
      <NavMenu />
      <SearchBar />

      {loggedIn? 
        <Row className="navbar__Button__Login">
          <Col span={12}>  
            <Ring className="navbar__Ring"/>
          </Col>
          <Col span={12}> 
            <AvatarButton className="navbar__AvatarButton" setLoggedIn={setLoggedIn}/>
          </Col>
        </Row>
        :
        <div className="navbar__Button">
          <div className="navbar__Buttons" onClick={null}>
              <Button color={"white"}><Text color='Black' cls='Default' content={"Sign Up"} fontSize='15' display="inline-block" /></Button>
          </div>
          <div className="navbar__Buttons" onClick={() => setLoggedIn(true)}>
              <Button color={"black"} icon={<UserOutlined />}><Text color='white' cls='Large' content={"Login"} fontSize='15' display="inline-block" /></Button> 
          </div>
        </div>
        }
      

    </div>
  );
}

export default Navbar;