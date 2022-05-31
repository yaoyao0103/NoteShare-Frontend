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
        <div id='detailTemplate' className='detailTemplate'>
            <Navbar currPage={Page} changePage={ (page) => { setPage(page) }}/>
            <Layout id='detailTemplate__Layout' className='detailTemplate__Layout'>
                {props.children}
            </Layout>
        </div>
    );
}
export default PageDetailTemplate;