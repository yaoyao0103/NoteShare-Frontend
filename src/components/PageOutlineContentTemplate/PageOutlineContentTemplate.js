import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Layout, Row, Col, Tag, Menu, CalendarOutlined, DollarCircleOutlined, CheckOutlined, } from "antd";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import SortMeun from "../SortMenu/SortMenu";
import OutlineCard from "../OutlineCard/OutlineCard";
import './PageOutlineContentTemplate.css'
const { Header, Content, Sider, Footer } = Layout;

function PageOutlineContentTemplate(props) {

    return (
        <div className="outlineContentTemplate">
            <Layout className="outlineContentTemplate__Layout__Outer">
                <Header className="outlineContentTemplate__Header">
                    <Row className="outlineContentTemplate__Header__Row">
                        <Col className="outlineContentTemplate__Header__RecommendSwitch" span={props.hasSwitch ? 6 : 9}> {props.hasSwitch && <ToggleSwitch />}</Col>
                        <Col className="outlineContentTemplate__Header__FolderSwitch" span={props.hasSwitch ? 6 : 9}>{props.hasSwitch && <ToggleSwitch SwitchLeft='Note' SwitchRight="Folder" checkedColor="#8015e8" />}</Col>
                        <Col className="outlineContentTemplate__Header__Dropdown" span={props.hasSwitch ? 12 : 9}>
                            <div className="outlineContentTemplate__Dropdown">
                                <SortMeun
                                    page={props.page}
                                />
                            </div>
                        </Col>
                    </Row>
                </Header>
                <Content className="outlineContentTemplate__Content">
                    <OutlineCard mode='Post'/>
                    <OutlineCard mode='Post'/>
                    <OutlineCard mode='Post'/>
                    <OutlineCard mode='Post'/>
                    <OutlineCard mode='Post'/>
                    <OutlineCard mode='Post'/>
                </Content>
                {/* <Footer className="outlineContentTemplate__Footer"/> */}
            </Layout>

        </div>



    );

}
export default PageOutlineContentTemplate;