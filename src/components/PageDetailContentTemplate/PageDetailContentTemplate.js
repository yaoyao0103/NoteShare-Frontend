import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Layout, Row, Col, Tag } from "antd";
import Button from "../Button/Button";
import { EllipsisOutlined } from '@ant-design/icons';
import Text from "../Text/Text";
import Title from "../Title/Title";
import Information from "../Information/Information";
import Comment from "../Comment/Comment";
import ContentEditor from "../../pages/NoteDetailPage/ContentEditor/ContentEditor";
import { Avatar, Divider } from 'antd';
import OPInfo from "../OPInfo/OPInfo";
import DropdownFunction from "../DropdownFunction/DropdownFunction";
import './PageDetailContentTemplate.css'
const { Header, Content, Sider, Footer } = Layout;

const PageDetailContentTemplate = (props) => {
    return (
        
        <div id="contentTemplate" className="contentTemplate" >
            <Layout id='contentTemplate__Layout__outer' className="contentTemplate__Layout__outer">
                <Layout id='contentTemplate__Layout' className="contentTemplate__Layout">
                    <Header id="contentTemplate__Header" className="contentTemplate__Header" >
                        <Row className="contentTemplate__Row">
                            <Col id="contentTemplate__Header__left" className="contentTemplate__Header__left" span={props.hasComment?7:4}>
                                <OPInfo
                                    id="contentTemplate__Title__OPInfo" 
                                    className="contentTemplate__Title__OPInfo" 
                                    size={56}
                                    author={props.data?.author}
                                    date={props.data?.date} 
                                    dateFontSize="18"
                                >T</OPInfo>
                            </Col>
                            <Col id="contentTemplate__Header__middle" className="contentTemplate__Header__middle"span={props.hasComment?16:18}>
                                <Title title={props.data?.title} size={props.hasComment?30:35}/></Col>
                            <Col id="contentTemplate__Header__right" className="contentTemplate__Header__right contentTemplate__Dropdown" span={props.hasComment?1:2}>
                                <div className="contentTemplate__Dropdown"><DropdownFunction comments={props.data? props.data.comments:[]} hasComment={props.hasComment}/></div>
                                
                            </Col>
                        </Row>     
                    </Header>
                    <Content id="contentTemplate__Content" className="contentTemplate__Content" >
                        <Row className='contentTemplate__Row'>
                            <Col id='contentTemplate__Content__Information' className='contentTemplate__Content__Information' >
                                <Information school={props.data?.school} department={props.data?.department} subject={props.data?.subject} instructor={props.data?.professor} likes={props.data?.likes} save={props.data?.save} download={props.data?.download} />
                            </Col>
                        </Row>
                        
                        <Row className='contentTemplate__Row'>
                            <Col id='contentTemplate__Content__Title' className='contentTemplate__Content__Title' >
                                <Text color='black' cls='Default' content={"Content:"} fontSize='22' display="inline-block" />
                            </Col>
                        </Row>
                        <Row className='contentTemplate__Row'>
                            <Col id='contentTemplate__Content__Main' className='contentTemplate__Content__Main' >
                                { props.hasEditor? 
                                    <ContentEditor noteId = {props.noteId}/>
                                    :
                                    <Text color='black' cls='Small' content={props.data?.content} fontSize='22' display="inline-block" />
                                }
                            </Col>
                        </Row>
                    </Content>
                    <Footer id="contentTemplate__Footer" className="contentTemplate__Footer">
                        {props.hasTag &&
                            <>
                                <Text color='black' cls='Default' content={"Tags:"} fontSize='22' display="inline-block" />
                                <span className="left-margin"></span>
                                {props.data?.tag && props.data.tag.map( (tag) =>
                                    <>
                                        {/* 
                                        <Text color='black' cls='Default' content={tag} fontSize='18' display="inline-block" /> */}
                                        <Tag style={{ fontSize:"15px" }}>{tag}</Tag>
                                    </>
                                )}
                            </>
                        }
                        <div className="contentTemplate__Footer__Button">
                            <Button color={"green"}><Text color='white' cls='Large' content={"Submit"} fontSize='17' display="inline-block" /></Button>
                        </div>
                    </Footer>
                </Layout>
                
                {props.hasComment && 
                    <>
                        <Sider id="contentTemplate__Comment" className="contentTemplate__Comment" width='40%'>
                            <Comment comments={props.data?.comments} />
                        </Sider>
                    </>
                }
            </Layout>
        </div>
    );
}


PageDetailContentTemplate.defaultProps = {
    data: null,
    hasComment: false,
    hasEditor: false,
    hasTag: false,
    noteId: '',
};

export default PageDetailContentTemplate;