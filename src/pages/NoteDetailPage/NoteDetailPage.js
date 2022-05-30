import React ,{useState,useEffect}from 'react';
import NoteDetailContent from './NoteDetailContent/NoteDetailContent';
import Navbar from '../../components/Navbar/Navbar';
import './NoteDetailPage.css'
import { Layout, PageHeader } from "antd";
const { Header, Content, Footer } = Layout;
function NoteDetailPage(){
    const [ Page, setPage ] = useState('NoteDetailPage');
    useEffect(() => {
        console.log(Page);
    }, [Page])
    return(
        <div id='noteDetailPage' className='noteDetailPage'>
            <Navbar id='noteDetailPage__Navbar' className='noteDetailPage__Navbar' currPage={Page} changePage={(page)=>{ setPage(page) }}/>
            <Layout id='noteDetailPage__Layout' className='noteDetailPage__Layout'>
                
                <Content id='noteDetailPage__Content' className='noteDetailPage__Content'><NoteDetailContent/></Content>
                
            </Layout>
        </div>
    );
}
export default NoteDetailPage;