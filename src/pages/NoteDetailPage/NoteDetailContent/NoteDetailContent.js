import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Layout, Row, Col } from "antd";
import { EllipsisOutlined } from '@ant-design/icons';
import Text from "../../../components/Text/Text";
import Title from "../../../components/Title/Title";
import Information from "../../../components/Information/Information";
import Comment from "../../../components/Comment/Comment";
import NoteDetailContentEditor from "../NoteDetailContentEditor/NoteDetailContentEditor";
import { Avatar, Divider } from 'antd';
import './NoteDetailContent.css'
const { Header, Content, Sider } = Layout;

function NoteDetailContent() {
    const { noteId } = "6262b61b3beec065d67999d6";

    return (
        <div id="noteDetailContentContent" className="noteDetailContentContent" >
            <Layout id='noteDetailContentContent__Layout' className="noteDetailContentContent__Layout">
                <Content id="noteDetailContentContent__Content" className="noteDetailContentContent__Content" >
                    <Avatar id="noteDetailContentContent__Title__Avatar" className="noteDetailContentContent__Title__Avatar" size={56}>T</Avatar>
                    <Title />
                    <Row id='noteDetailContentContent__Title__Row__Third' className='noteDetailContentContent__Titile__Row__Third'>
                        <EllipsisOutlined style={{ fontSize: '22px' }} />
                    </Row>
                    <Information />
                    <Row id='noteDetailContentContent__Content__Title__Row' className='noteDetailContentContent__Content__Title__Row'>
                        <Col id='noteDetailContentContent__Content__Title' className='noteDetailContentContent__Content__Title' >
                            <Text color='black' cls='Default' content={"Content:"} fontSize='22' display="inline-block" />
                        </Col>
                    </Row>
                    <Row id='noteDetailContentContent__Content__Main__Row' className='noteDetailContentContent__Content__Main__Row'>
                        <Col id='noteDetailContentContent__Content__Main' className='noteDetailContentContent__Content__Main' >
                            {/* <Text color='black' cls='Small' content={content} fontSize='22' display="inline-block" /> */}
                            <NoteDetailContentEditor pageId = {noteId}/>
                        </Col>
                    </Row>
                </Content>
            </Layout>
        </div>
    );
}
export default NoteDetailContent;