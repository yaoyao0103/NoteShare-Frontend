import React ,{useState,useEffect}from 'react';
import QnADetailContent from './QnADetailContent/QnADetailContent';
import Navbar from '../../components/Navbar/Navbar';
import './QnADetailPage.css'
import { Layout,PageHeader} from "antd";
const { Header, Content, Footer } = Layout;
function QnADetailPage(){
    const [Page,setPage]=useState('PersonalPage');
    useEffect(() => {
        console.log(Page)
       }, [Page])
    return(
        <div id='qnaDetailPage' className='qnaDetailPage'>
            <Navbar id='qnaDetailPage__Navbar' className='qnaDetailPage__Navbar' currPage={Page} changePage={(page)=>{setPage(page)}}/>
            <Layout id='qnaDetailPage__Layout' className='qnaDetailPage__Layout'>
                
                <Content id='qnaDetailPage__Content' className='qnaDetailPage__Content'><QnADetailContent/></Content>
                
            </Layout>
           
        </div>
    );
}
export default QnADetailPage;