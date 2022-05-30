import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Layout, Row, Col } from "antd";
import { EllipsisOutlined } from '@ant-design/icons';
import Text from "../../../components/Text/Text";
import Title from "../../../components/Title/Title";
import Information from "../../../components/Information/Information";
import Comment from "../../../components/Comment/Comment";
import NoteDetailContentEditor from "../NoteDetailContentEditor/NoteDetailContentEditor";
import { Avatar, Divider } from 'antd';
import OPInfo from "../../../components/OPInfo/OPInfo";
import './NoteDetailContent.css'
const { Header, Content, Sider } = Layout;

function NoteDetailContent() {
    const [ note, setNote ] = useState(null);
    const noteId = "6262b61b3beec065d67999d0";

    useEffect(() => {
        async function getNoteById() {
          try {
            const temp = require('./noteTestJson.json');
            setNote(temp);
            console.log(temp);
            console.log(note);
          } catch (error) {
              console.log(error);
          }
        }
    
        getNoteById();
      }, []);

    return (
        <div id="noteDetailContent" className="noteDetailContent" >
            <Layout id='noteDetailContent__Layout' className="noteDetailContent__Layout">
                <Header id="noteDetailContent__Header" className="noteDetailContent__Header" >
                    <Row id="noteDetailContent__Header__Row" className="noteDetailContent__Header__Row" >
                        <Col id="noteDetailContent__Header__left" className="noteDetailContent__Header__left" span={4}>
                            <OPInfo
                            id="noteDetailContent__Title__OPInfo" 
                            className="noteDetailContent__Title__OPInfo" 
                            size={56}
                            author={note?.authorName[0]}
                            date={note?.version[0].date} 
                        >T</OPInfo></Col>
                        <Col id="noteDetailContent__Header__middle" className="noteDetailContent__Header__middle"span={18}>
                            <Title title={note?.title} /></Col>
                        <Col id="noteDetailContent__Header__right" className="noteDetailContent__Header__right" span={2}><EllipsisOutlined style={{ fontSize: '30px' }} /></Col>
                    </Row>     
                </Header>
                <Content id="noteDetailContent__Content" className="noteDetailContent__Content" >
                    <Row id='noteDetailContent__Content__Information__Row' className='noteDetailContent__Content__Information__Row'>
                        <Col id='noteDetailContent__Content__Information' className='noteDetailContent__Content__Information' >
                            <Information school={note?.school} department={note?.department} subject={note?.subject} instructor={note?.professor} />
                        </Col>
                    </Row>
                    
                    <Row id='noteDetailContent__Content__Title__Row' className='noteDetailContent__Content__Title__Row'>
                        <Col id='noteDetailContent__Content__Title' className='noteDetailContent__Content__Title' >
                            <Text color='black' cls='Default' content={"Content:"} fontSize='22' display="inline-block" />
                        </Col>
                    </Row>
                    <Row id='noteDetailContent__Content__Main__Row' className='noteDetailContent__Content__Main__Row'>
                        <Col id='noteDetailContent__Content__Main' className='noteDetailContent__Content__Main' >
                            {/* <Text color='black' cls='Small' content={content} fontSize='22' display="inline-block" /> */}
                            <NoteDetailContentEditor noteId = {noteId}/>
                        </Col>
                    </Row>
                </Content>

            </Layout>
        </div>
    );
}
export default NoteDetailContent;