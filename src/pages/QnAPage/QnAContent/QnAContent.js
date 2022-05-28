import React, { useState } from "react";
import { Layout, Row, Col } from "antd";
import { EllipsisOutlined } from '@ant-design/icons';
import Text from "../../../components/Text/Text";
import Title from "../../../components/Title/Title";
import Information from "../../../components/Information/Information";
import Comment from "../../../components/Comment/Comment";
import { Avatar, Divider } from 'antd';
import './QnAContent.css'
const { Header, Content, Sider } = Layout;

function QnAContent() {
    const author = 'Ting';
    const type = 'QA'
    
    const date = '2022-03-06T14:53:08.137+00:00'.split('T');

    const title = 'Interrupt vs trap';
    const school = '國立台灣海洋大學';
    const department = 'Computer Science';
    const subject = 'Operating System';
    const content = '可以解釋硬體中斷跟軟體中斷嗎？霸脫42419945492549519459154935456495649659469546956465946954'
    const price = 20;
    const comments = {
        "id": {
            "timestamp": 1650618885,
            "date": "2022-04-22T09:14:45.000+00:00"
        },
        "author": "Ting",
        "email": "00853129@email.ntou.edu.tw",
        "content": "豪棒豪棒豪棒豪棒豪棒豪棒豪棒豪豪棒豪棒豪棒豪棒豪棒豪棒豪棒豪豪棒",
        "likeCount": 0,
        "liker": [],
        "referenceNotesURL": [],
        "floor": 0,
        "date": "2022-03-06",
        "reference": false,
        "best": false

    };

    return (
        <div id="qnaContent" className="qnaContent" >
            <Layout id='qnaContent__Layout' className="qnaContent__Layout">
                <Content id="qnaContent__Content" className="qnaContent__Content" >
                    <Avatar id="qnaContent__Title__Avatar" className="qnaContent__Title__Avatar" size={56}>T</Avatar>
                    <Title author={author} date={date[0]} title={title}/>
                    <Row id='qnaContent__Title__Row__Third' className='qnaContent__Titile__Row__Third'>
                        <EllipsisOutlined style={{ fontSize: '22px' }} />
                    </Row>
                    <Information school={school} department={department} subject={subject}/>
                    <Row id='qnaContent__Content__Title__Row' className='qnaContent__Content__Title__Row'>
                        <Col id='qnaContent__Content__Title' className='qnaContent__Content__Title' >
                            <Text color='black' cls='Default' content={"Content:"} fontSize='22' display="inline-block" />
                        </Col>
                    </Row>
                    <Row id='qnaContent__Content__Main__Row' className='qnaContent__Content__Main__Row'>
                        <Col id='qnaContent__Content__Main' className='qnaContent__Content__Main' >
                            <Text color='black' cls='Small' content={content} fontSize='22' display="inline-block" />
                        </Col>
                    </Row>
                </Content>
                <Sider id="qnaContent__Sider" className="qnaContent__Sider" width='40%'>
                    <Comment comments={comments}/>
                </Sider>
            </Layout>
        </div>
    );
}
export default QnAContent;