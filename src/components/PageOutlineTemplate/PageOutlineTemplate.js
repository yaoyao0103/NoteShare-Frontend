import React, { useState, useEffect }from 'react';
import Navbar from '../Navbar/Navbar';
import './PageOutlineTemplate.css';
import { Layout } from "antd";
function PageOutlineTemplate(props){
    const [ Page, setPage ] = useState('');
    useEffect(() => {
        setPage(props.page);
    }, [Page])
    return(
        <div className='outlineTemplate'>
            <Navbar changePage={ (page) => { setPage(page) }}/>
            <Layout className='outlineTemplate__Layout'>
                {props.children}
            </Layout>
        </div>
    );
}
export default PageOutlineTemplate;