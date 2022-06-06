import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import PageOutlineTemplate from '../../components/PageOutlineTemplate/PageOutlineTemplate';
import PageOutlineContentTemplate from '../../components/PageOutlineContentTemplate/PageOutlineContentTemplate';
import './QnAOutlinePage.css';
import { Layout } from "antd";
const { Header, Content, Footer } = Layout;
function QnAOutlinePage() {
    const [Page, setPage] = useState('QnAOutlinePage');
    useEffect(() => {
        setPage('QnAOutlinePage');
        console.log(Page)
    }, [Page])
    return (
        <>
            <PageOutlineTemplate page={Page}>
                <PageOutlineContentTemplate page={Page} hasSwitch={true}/>
            </PageOutlineTemplate>

        </>
    );


}

export default QnAOutlinePage;