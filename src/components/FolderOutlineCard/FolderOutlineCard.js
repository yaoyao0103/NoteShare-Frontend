import React, { useState, useEffect } from "react";
import { Layout, Row, Col, Typography } from "antd";
import { message } from "antd";
import { EllipsisFolderOutlined } from '@ant-design/icons';
import OPInfo from '../OPInfo/OPInfo';
import Title from "../Title/Title";
import Text from "../Text/Text";
import { Avatar } from 'antd';
import './FolderOutlineCard.css'
const { Paragraph } = Typography;
const { Header, Content, Sider, Footer } = Layout;
function FolderOutlineCard(props) {
    const [ellipsis, setEllipsis] = useState(true);
    const [sider, setSider] = useState(
        <Sider className={"FolderOutlineCard__Sider__Outer" + '__' + props.mode} width='35%' ></Sider>
    );


    
    if (props.cardContent.tag) {
        var tags = '';
        for (let i = 0; i < props.cardContent.tag.length; i++) {
            tags += props.cardContent.tag[i];
            if (i != props.cardContent.tag.length - 1)
                tags += ' , ';
        }
    }
  
    const FolderSider = (
        <>{props.mode === 'Folder' &&
            < Sider className={"FolderOutlineCard__Sider__Outer" + '__' + props.mode} width='30%' >
              
                
            </Sider >
        }</>
    );
    var opSize = 32;
    var authorFontSize = '16';
    var dateFontSize = '12';
    var author = props.cardContent.authorName?props.cardContent.authorName:props.cardContent.creatorName;
   

 
    return (
        <Layout className={"FolderOutlineCard__Layout__Outer" }>
            <Content className={"FolderOutlineCard__Content__Outer" }>
                <Layout className={"FolderOutlineCard__Layout__Inner"}>
                    <Header className={"FolderOutlineCard__Header"} >
                        <Row className={"FolderOutlineCard__Header__Row"}>
                            <Col className={"FolderOutlineCard__Header__Left"} span={10}>
                                <OPInfo
                                    className="FolderOutlineCard__OPInfo"
                                    mode="FolderOutline"
                                    size={opSize}
                                    author={author}
                                    authorFontSize={authorFontSize}
                                    dateFontSize={dateFontSize}
                                />
                            </Col>
                            <Col className={"FolderOutlineCard__Header__Right" } span={14}>
                                <Title mode='FolderOutline' title={props.cardContent.folderName} size={26} />
                            </Col>
                        </Row>
                    </Header>
                    {/* <Content className={"FolderOutlineCard__Content__Inner" + '__' + props.mode} >
                        <Paragraph
                            className={"FolderOutlineCard__Paragraph" + '__' + props.mode}
                            ellipsis={
                                ellipsis
                                    ? {
                                        rows: 7,
                                        expandable: false,
                                    }
                                    : false
                            }
                        >
                            {props.cardContent.content}
                        </Paragraph>
                    </Content> */}
                </Layout>
            </Content>
            {sider}
        </Layout>
    );
}
export default FolderOutlineCard;