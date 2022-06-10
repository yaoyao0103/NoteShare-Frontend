import React from "react";
import "./Navbar.css";
import Logo from "./Logo/Logo";
import NavButton from "./NavButton/NavButton";
import NavMenu from "./NavMenu/NavMenu";
import Button from "../Button/Button";
import Text from "../Text/Text";
import SearchBar from "./SearchBar/SearchBar";
import Ring from "./Ring/Ring";
import AvararButton from "./AvatarButton/AvatarButton";
import {
  UserOutlined,
} from '@ant-design/icons';
import {Row,Col} from 'antd';
function Navbar(props) {
  return (
    <div id="navbar" className="nav">
      <Logo />
      <NavButton currPage={props.currPage} changePage={(page) => props.changePage(page)} />
      <NavMenu />
      <SearchBar />

      {/* <div className="navbar__Button">
         <Button color={"white"}><Text color='Black' cls='Gerneral' content={"Sign Up"} fontSize='15' display="inline-block" /></Button>
        <Button color={"black"} icon={<UserOutlined />}><Text color='white' cls='Large' content={"Login"} fontSize='15' display="inline-block" /></Button> 
      </div> */}
      
        <Row className="navbar__Button__Login">
          <Col span={12}>  <Ring className="navbar__Ring"/>
          </Col>
          <Col span={12}><AvararButton className="navbar__AvararButton"/>
          </Col>
        </Row>
      
        
      

    </div>
  );
}

export default Navbar;