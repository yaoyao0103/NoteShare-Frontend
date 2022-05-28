import React ,{useState,useEffect}from 'react';
import MainContent from '../../components/MainContent/MainContent';
import Navbar from '../../components/Navbar/Navbar';
import './MemberPage.css'
import { Layout,PageHeader,Typography} from "antd";
const { Header, Content, Footer } = Layout;
function MemberPage(){
    const [Page,setPage]=useState('PersonalPage');
    useEffect(() => {
        console.log(Page)
       }, [Page])
    return(
        <div id='memberPage' className='MemberPage'>
            <Layout>
                <Header id='header'>
                    <Navbar currPage={Page} changePage={(page)=>{setPage(page)}}/>
                </Header>
            </Layout>
            <MainContent/>
        </div>
    );
}
export default MemberPage;