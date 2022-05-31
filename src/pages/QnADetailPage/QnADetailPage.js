import React, { useState, useEffect } from 'react';
import QnADetailContent from './QnADetailContent/QnADetailContent';
import Navbar from '../../components/Navbar/Navbar';
import './QnADetailPage.css';
import Comment from '../../components/Comment/Comment';
import Text from '../../components/Text/Text';
import axios from "axios";
import { Layout,Button} from "antd";
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
                    <Comment comments={QnA.comments} />
                </Sider>
                <Button type='primary' className='qnaDetailPage__Comment__Submit__Button'><Text></Text>submit</Button>
            </Layout>

        </div>
    );
}
export default QnADetailPage;