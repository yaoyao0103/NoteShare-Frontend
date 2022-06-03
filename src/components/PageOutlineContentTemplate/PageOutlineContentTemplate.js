import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Layout, Row, Col, Tag } from "antd";
import Button from "../Button/Button";
import Text from "../Text/Text";
import Title from "../Title/Title";
import Information from "../Information/Information";
import CommentArea from "../CommentArea/CommentArea";
import ContentEditor from "../../pages/NoteDetailPage/ContentEditor/ContentEditor";
import OPInfo from "../OPInfo/OPInfo";
import OptionMenu from "../OptionMenu/OptionMenu";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import './PageOutlineContentTemplate.css'
const { Header, Content, Sider, Footer } = Layout;

function PageOutlineContentTemplate(props) {
    return (
        <div className="outlineContentTemplate">
            <Layout className="outlineContentTemplate__Layout__Outer">
                <Header className="outlineContentTemplate__Header">
                    <Row className="outlineContentTemplate__Header__Row">
                        <Col className="outlineContentTemplate__Header__RecommendSwitch"span={6}><ToggleSwitch /></Col>
                        <Col className="outlineContentTemplate__Header__FolderSwitch" span={6}><ToggleSwitch SwitchLeft='Note'SwitchRight="Folder" checkedColor="#8015e8"/></Col>
                    </Row>
                </Header>
            </Layout>

        </div>



    );

}
export default PageOutlineContentTemplate;