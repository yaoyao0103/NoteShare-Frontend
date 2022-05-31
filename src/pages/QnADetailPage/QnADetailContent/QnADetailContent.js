import React, { useState, useEffect } from "react";
import { Layout, Row, Col, Button } from "antd";
import Comment from '../../../components/Comment/Comment';
import { EllipsisOutlined } from '@ant-design/icons';
import Text from "../../../components/Text/Text";
import Title from "../../../components/Title/Title";
import Information from "../../../components/Information/Information";
import OPInfo from "../../../components/OPInfo/OPInfo";
import './QnADetailContent.css'
const { Header, Content, Sider } = Layout;

function QnADetailContent(props) {
    return (
        <>
            <Layout id='qnaDetailContent__Layout' className="qnaDetailContent__Layout">
                <Header id="qnaDetailContent__Header" className="qnaDetailContent__Header" >
                    <Row id="qnaDetailContent__Header__Row" className="qnaDetailContent__Header__Row" >
                        <Col id="qnaDetailContent__Header__left" className="qnaDetailContent__Header__left" span={7}>
                            <OPInfo
                                id="qnaDetailContent__Title__OPInfo"
                                className="qnaDetailContent__Title__OPInfo"
                                size={56}
                                author={props.QnA?.author}
                                date={props.QnA?.date}
                            >T</OPInfo></Col>
                        <Col id="qnaDetailContent__Header__middle" className="qnaDetailContent__Header__middle" span={15}>
                            <Title title={props.QnA?.title} /></Col>
                        <Col id="qnaDetailContent__Header__right" className="qnaDetailContent__Header__right" span={2}><EllipsisOutlined style={{ fontSize: '30px' }} /></Col>
                    </Row>
                </Header>
                <Content id="qnaDetailContent__Content" className="qnaDetailContent__Content" >
                    <Row id='qnaDetailContent__Content__Information__Row' className='qnaDetailContent__Content__Information__Row'>
                        <Col id='qnaDetailContent__Content__Information' className='qnaDetailContent__Content__Information' >
                            <Information school={props.QnA?.school} department={props.QnA?.department} subject={props.QnA?.subject} instructor={props.QnA?.professor} />
                        </Col>
                    </Row>

                    <Row id='qnaDetailContent__Content__Title__Row' className='qnaDetailContent__Content__Title__Row'>
                        <Col id='qnaDetailContent__Content__Title' className='qnaDetailContent__Content__Title' >
                            <Text color='black' cls='Default' content={"Content:"} fontSize='22' display="inline-block" />
                        </Col>
                    </Row>
                    <Row id='qnaDetailContent__Content__Main__Row' className='qnaDetailContent__Content__Main__Row'>
                        <Col id='qnaDetailContent__Content__Main' className='qnaDetailContent__Content__Main' >
                            <Text color='black' cls='Small' content={props.QnA.content} fontSize='22' display="inline-block" />
                        </Col>
                    </Row>
                </Content>
            </Layout>
                
        </>
    );
}
export default QnADetailContent;