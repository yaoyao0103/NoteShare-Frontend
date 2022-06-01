import React, { useState } from "react";
import { Layout, Row, Col } from "antd";
import { EllipsisOutlined } from '@ant-design/icons';
import Text from "../Text/Text";
import { Avatar } from 'antd';
import './MainContent.css'
const { Header, Content, Sider } = Layout;


function MainContent() {
    return (
        <div id="mainContent" className="mainContent" >
            <Layout id='mainContent__Layout'>
                <Content style={{
                    backgroundColor: 'white',
                    boxShadow: 'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px',
                    position: 'relative',
                    left: '5%',
                    width: '90%',
                    top:0,
                    paddingBottom: '30px',
                    padding: '0 40px',
                    marginTop: 150,
                }}>
                    <div
                        className="site-layout-background"
                        style={{
                            position: 'relative',
                            padding: 0,
                            paddingLeft: '1%',
                            paddingBottom:'3%',
                            width: '70%',
                            minHeight: 250,
                            backgroundColor: 'white',

                        }}>
                        <Avatar style={{
                            position: 'relative',
                            backgroundColor: '#624c40',
                            verticalAlign: 'middle',
                            whiteSpace: "nowrap",
                            top: '5px',
                        }}
                            size={48}
                            src="https://joeschmoe.io/api/v1/random"

                        ></Avatar>
                        <span style={{ position: 'relative', top: '10px', left: '5px' }}>
                            <Row style={{ display: "inline-block", position: 'relative', top: '10px', left: '10px' }}>
                                <Col flex={2} style={{ position: 'relative', height: 30 }}><Text color='black' cls='Small' content='Allice' fontSize='20'></Text></Col>
                                <Col span={3}><Text color='black' cls='Small' content='2021/12/25' fontSize='12' display="inline-block" /></Col>
                            </Row>
                            <Row style={{ display: "inline-block", position: 'relative', top: '-5px', left: '120px' }}>
                                <Col flex={3}><Text color='black' cls='Default' content='System Call' fontSize='25' display="inline-block" /></Col>
                            </Row>
                            <Text color='black' cls='Small'
                                content="A system call is a mechanism that provides the interface between a process and the operating system. It is a. programmatic method in which a computer program requests a service from the kernel of the OS.
                            System call offers the services of the operating system to the user programs via API (Application Programming Interface). System calls are the only entry points for the kernel system." fontSize='20' display="block" />
                        </span>
                    </div>
                </Content>
                <Sider style={{
                    backgroundColor: 'white',
                    position: 'relative',
                    //left: '79.5%',
                    width: '100%',
                    padding: '0 0px',
                    marginTop: 150,
                    //top:0,
                }}>
                    <div
                        className="site-layout-background"
                        style={{
                            position:'relative',
                            padding: 0,
                            paddingLeft: 0,
                            width: '100%',
                            minHeight: 0,
                            backgroundColor: 'white',
                           
                        }}>
                        <Row style={{ display: "inline-block", position: 'relative', top: '10px', left: '-110px' }}>
                            <Col flex={3}><Text color='black' cls='Small' content='​資訊工程學系' fontSize='17' display="inline-block" /></Col>
                        </Row>
                        <Row style={{ display: "inline-block", position: 'relative', top: '10px', left: '-90px' }}>
                            <Col flex={3}><Text color='black' cls='Small' content='​作業系統' fontSize='17' display="inline-block" /></Col>
                        </Row>
                        <Row style={{ display: "inline-block", position: 'relative', top: '5px', left: '-20px' }}>
                            <EllipsisOutlined />
                        </Row>
                        <Row style={{ display: "block", position: 'relative', top: '10px', left: '-110px' }}>
                            <Col flex={3}><Text color='black' cls='Small' content='林致宇教授' fontSize='17' display="inline-block" /></Col>
                        </Row>
                        <Row style={{ display: "block", position: 'relative', top: '10px', left: '-110px' }}>
                            <Col flex={3}><Text color='black' cls='Default' content='Tags:' fontSize='17' display="inline-block" /></Col>
                        </Row>
                        <Row style={{ display: "block", position: 'relative', top: '0px', left: '-110px' }}>
                            <Col flex={3} style={{wordWrap:'break-word'}}><Text color='black' cls='Small' content='system call, interrupt, kernel mode, user mode, CPU, OS' fontSize='17' display="inline-block" /></Col>
                        </Row>
                        <Row style={{ display: "block", position: 'relative', top: '0px', left: '-110px' }}>
                            <Col flex={3} style={{wordWrap:'break-word'}}><Text color='black' cls='Default' content='Downable' fontSize='17' display="inline-block" /></Col>
                        </Row>
                        <Row style={{ display: "inline-block", position: 'relative', top: '10px', left: '-110px' }}>
                            <Col flex={3}><Text color='black' cls='Default' content='​Like:100' fontSize='17' display="inline-block" /></Col>
                        </Row>
                        <Row style={{ display: "inline-block", position: 'relative', top: '10px', left: '-40px' }}>
                            <Col flex={3}><Text color='black' cls='Default' content='​Coin:500' fontSize='17' display="inline-block" /></Col>
                        </Row>
                    </div>
                </Sider>
            </Layout>
        </div>
    );
}

export default MainContent;
