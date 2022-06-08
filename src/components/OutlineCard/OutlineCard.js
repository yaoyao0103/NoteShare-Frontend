import React, { useState,useEffect } from "react";
import { Layout, Row, Col, Typography } from "antd";
import { message } from "antd";
import { EllipsisOutlined } from '@ant-design/icons';
import OPInfo from '../OPInfo/OPInfo';
import Title from "../Title/Title";
import Text from "../Text/Text";
import { Avatar } from 'antd';
import './OutlineCard.css'
const { Paragraph } = Typography;
const { Header, Content, Sider, Footer } = Layout;
function OutlineCard(props) {
    const [ellipsis, setEllipsis] = useState(true);
    const [silder,setSider] = useState(
        <Sider className={"OutlineCard__Sider__Outer" + '__' + props.mode} width='35%' ></Sider>
    );
    const QnASider = (
        < Sider className={"OutlineCard__Sider__Outer" + '__' + props.mode} width='35%' >
            <Row className={"OutlineCard__Sider__First__Row" + '__' + props.mode}>
                <Col className={"OutlineCard__Sider__Department" + '__' + props.mode} span={20}>
                    <Text cls='Default' fontSize="16" content={props.cardContent.department} />
                </Col>
            </Row>
            <Row className={"OutlineCard__Sider__Sec__Row" + '__' + props.mode}>
                <Col className={"OutlineCard__Sider__Subject" + '__' + props.mode} span={20}>
                    <Text cls='Default' fontSize="16" content={props.cardContent.subject} />
                </Col>
            </Row>
            <Row className={"OutlineCard__Sider__Third__Row" + '__' + props.mode}>
                <Col className={"OutlineCard__Sider__CommentCount" + '__' + props.mode} span={20}>
                    <Text cls='Default' fontSize="16" content={'留言數 : '+props.cardContent.comments.length} />
                </Col>
            </Row>
            {props.cardContent.answer.length !== 0 &&
                <Row className={"OutlineCard__Sider__Fourth__Row" + '__' + props.mode}>
                    <Col className={"OutlineCard__Sider__HasBestAns" + '__' + props.mode} span={20}>
                        <Text cls='Default' fontSize="16" content='已解答' />
                    </Col>
                </Row>
            }
            {props.cardContent.answer.length === 0 &&
                <Row className={"OutlineCard__Sider__Fourth__Row" + '__' + props.mode}>
                    <Col className={"OutlineCard__Sider__Price" + '__' + props.mode} span={20}>
                        <Text cls='Default' fontSize="16" content={'最高賞金 : '+props.cardContent.bestPrice} />
                    </Col>
                </Row>
            }
        </Sider >
    );
    useEffect(()=>{
        // set menu
        switch(props.page){
          case 'QnAOutlinePage': setSider( QnASider ); break;
        }
        console.log(props.cardContent.answer);
      },[props])
    return (
        <Layout className={"OutlineCard__Layout__Outer" + '__' + props.mode}>
            <Content className={"OutlineCard__Content__Outer" + '__' + props.mode}>
                <Layout className={"OutlineCard__Layout__Inner" + '__' + props.mode}>
                    <Header className={"OutlineCard__Header" + '__' + props.mode} >
                        <Row className={"OutlineCard__Header__Row" + '__' + props.mode}>
                            <Col className={"OutlineCard__Header__Left" + '__' + props.mode} span={10}>
                                <OPInfo
                                    className="OutlineCard__OPInfo"
                                    mode="Outline"
                                    size={32}
                                    author={props.cardContent.author}
                                    date={props.cardContent.date}
                                    authorFontSize='16'
                                    dateFontSize="12"
                                />
                            </Col>
                            <Col className={"OutlineCard__Header__Right" + '__' + props.mode} span={14}>
                                <Title mode='Outline' title={props.cardContent.title} size={26} />
                            </Col>
                        </Row>
                    </Header>
                    <Content className={"OutlineCard__Content__Inner" + '__' + props.mode} >
                        <Paragraph
                            className={"OutlineCard__Paragraph" + '__' + props.mode}
                            ellipsis={
                                ellipsis
                                    ? {
                                        rows: 7,
                                        expandable: false,

                                        onExpand: () => {
                                            message.info('watch more');
                                            window.location.href = 'http://localhost:3000/QnADetailPage'
                                        }
                                    }
                                    : false
                            }
                        >
                            {props.cardContent.content}
                        </Paragraph>
                    </Content>
                </Layout>
            </Content>
            {silder}
        </Layout>
    );
}
export default OutlineCard;