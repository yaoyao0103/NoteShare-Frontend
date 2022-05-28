import React ,{useState,useEffect}from 'react';
import QnAContent from './QnAContent/QnAContent';
import Navbar from '../../components/Navbar/Navbar';
import './QnAPage.css'
import { Layout,PageHeader} from "antd";
const { Header, Content, Footer } = Layout;
function QnAPage(){
    const [Page,setPage]=useState('PersonalPage');
    useEffect(() => {
        console.log(Page)
       }, [Page])
    return(
        <div id='qnaPage' className='qnaPage'>
            <Navbar id='qnaPage__Navbar' className='qnaPage__Navbar' currPage={Page} changePage={(page)=>{setPage(page)}}/>
            <Layout id='qnaPage__Layout' className='qnaPage__Layout'>
                
                <Content id='qnaPage__Content' className='qnaPage__Content'><QnAContent/></Content>
                
            </Layout>
           
        </div>
    );
}
export default QnAPage;