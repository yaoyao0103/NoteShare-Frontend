import React, { useState, useEffect } from 'react';
import QnADetailContent from './QnADetailContent/QnADetailContent';
import Navbar from '../../components/Navbar/Navbar';
import './QnADetailPage.css';
import OPInfo from '../../components/OPInfo/OPInfo';
import Comment from '../../components/Comment/Comment';
import Text from '../../components/Text/Text';
import axios from "axios";
import { Layout, PageHeader ,Row, Col,Divider} from "antd";
const { Sider } = Layout;
function QnADetailPage() {
    const [QnA, setQnA] = useState([]);

    useEffect(() => {
        async function getAllQnA() {
            try {
                const response = await axios.get(`http://localhost:8080/post/62627205a942b76c5114dbf8`);
                console.log(typeof (response.data.comments));
                setQnA(response.data);
            } catch (error) {
                console.log(error.message);
                setQnA(error.message);


            }
        }
        getAllQnA();
    }, []);
    const [Page, setPage] = useState('PersonalPage');
    useEffect(() => {
        console.log(Page)
    }, [Page])
   

    return (
        <div id='qnaDetailPage' className='qnaDetailPage'>
            <Navbar id='qnaDetailPage__Navbar' className='qnaDetailPage__Navbar' currPage={Page} changePage={(page) => { setPage(page) }} />
            <Layout id='qnaDetailPage__Layout' className='qnaDetailPage__Layout'>
                <QnADetailContent QnA={QnA} />
                <Sider id="qnaDetailContent__Sider" className="qnaDetailContent__Sider" width='40%'>
                    {/* <Row id='Comment__Title__Row' className='Comment__Title__Row'>
                        <Col id='Comment__Title' className="Comment__Title" flex={3}><Text color='black' cls='Default' content={'Comment'} fontSize='38' display="inline-block" /></Col>
                    </Row>
                    <Row id='Comment__Author__Row' className='Comment__Author__Row' style={{ position: 'relative' }}>
                        <Col id="Comment__Author__Row__left" className="Comment__Author__Row__left" span={12}>
                            <OPInfo
                                id="Comment__Author__Row__OPInfo"
                                className="Comment__Author__Row__OPInfo"
                                size={34}
                                author={'Ting'}
                                date={'2022-03-02'}
                                style={{ position: 'relative' }}
                            >T</OPInfo></Col>
                    </Row>
                    <Row id='Comment__Main__Row' className='Comment__Main__Row'>
                        <Col id='Comment__Main' className='Comment__Main' >
                            <Text color='black' cls='Small' content={'okok'} fontSize='20' display="inline-block" />
                        </Col>
                    </Row>
                    <Divider /> */}
                    <Comment comments={QnA.comments} />
                </Sider>
            </Layout>

        </div>
    );
}
export default QnADetailPage;