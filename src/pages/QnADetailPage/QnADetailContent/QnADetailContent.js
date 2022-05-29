import React, { useState, useEffect } from "react";
import { Layout, Row, Col, Avatar } from "antd";
import axios from "axios";
import { EllipsisOutlined } from '@ant-design/icons';
import Text from "../../../components/Text/Text";
import Title from "../../../components/Title/Title";
import Information from "../../../components/Information/Information";
import Comment from "../../../components/Comment/Comment";
import './QnADetailContent.css'
const { Header, Content, Sider } = Layout;

function QnADetailContent() {
    const [QnA, setQnA] = useState([]);

    useEffect(() => {
        async function getAllQnA() {
          try {
            const response = await axios.get(`http://localhost:8080/post/62627205a942b76c5114dbf8`);
            console.log(typeof(response.data.comments));
            setQnA(response.data);
          } catch (error) {
            console.log(error.message);
            setQnA(error.message);
            
            
          }
        }
        getAllQnA();
      },[]);

    return (
        <div id="qnaDetailContent" className="qnaDetailContent" >
            <Layout id='qnaDetailContent__Layout' className="qnaDetailContent__Layout">
                <Content id="qnaDetailContent__Content" className="qnaDetailContent__Content" >
                    <Avatar id="qnaDetailContent__Title__Avatar" className="qnaDetailContent__Title__Avatar" size={56}>T</Avatar>
                    <Title author={QnA.author} date={QnA.date} title={QnA.title} />
                    <Row id='qnaDetailContent__Title__Row__Third' className='qnaDetailContent__Titile__Row__Third'>
                        <EllipsisOutlined style={{ fontSize: '22px' }} />
                    </Row>
                    <Information school={QnA.school} department={QnA.department} subject={QnA.subject} />
                    <Row id='qnaDetailContent__Content__Title__Row' className='qnaDetailContent__Content__Title__Row'>
                        <Col id='qnaDetailContent__Content__Title' className='qnaDetailContent__Content__Title' >
                            <Text color='black' cls='Default' content={"Content:"} fontSize='22' display="inline-block" />
                        </Col>
                    </Row>
                    <Row id='qnaDetailContent__Content__Main__Row' className='qnaDetailContent__Content__Main__Row'>
                        <Col id='qnaDetailContent__Content__Main' className='qnaDetailContent__Content__Main' >
                            <Text color='black' cls='Small' content={QnA.content} fontSize='22' display="inline-block" />
                        </Col>
                    </Row>
                </Content>
                <Sider id="qnaDetailContent__Sider" className="qnaDetailContent__Sider" width='40%'>
                    <Comment comments={QnA.comments} />
                </Sider>
            </Layout>
        </div>
    );
}
export default QnADetailContent;