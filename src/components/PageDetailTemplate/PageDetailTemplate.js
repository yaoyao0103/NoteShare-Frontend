import React, { useState, useEffect }from 'react';
import Navbar from '../Navbar/Navbar';
import './PageDetailTemplate.css'
import { Layout } from "antd";
function PageDetailTemplate(props){
    const [ Page, setPage ] = useState('');
    useEffect(() => {
        setPage(props.page);
    }, [Page])
    return(
        <div className='detailTemplate'>
            <Navbar setLoggedIn={props.setLoggedIn} setPageProps={props.setPageProps} changePage={ (page) => { setPage(page) }}/>
            <Layout className='detailTemplate__Layout'>
                {props.children}
            </Layout>
        </div>
    );
}
export default PageDetailTemplate;