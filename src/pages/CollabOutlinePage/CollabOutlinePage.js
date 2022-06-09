import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import PageOutlineTemplate from '../../components/PageOutlineTemplate/PageOutlineTemplate';
import PageOutlineContentTemplate from '../../components/PageOutlineContentTemplate/PageOutlineContentTemplate';
import { Layout } from "antd";
const { Header, Content, Footer } = Layout;
function CollabOutlinePage() {
    const [Page, setPage] = useState('CollabOutlinePage');
    const [pageNumber, setPageNumber] = useState('1');
    const [ Collab, setCollab] =useState([]);
    useEffect(() => {
        setPage('CollabOutlinePage');
        console.log(Page)
    }, [Page]);
    useEffect(() => {
        async function getCollabById() {
            try {
                const temp = require('./CollabOutlinePage'+pageNumber+'.json');
                console.log(pageNumber);
                setCollab(temp.additionalProp1);
            } catch (error) {
                console.log(error.message);
                setCollab(error.message);


            }
        }
        getCollabById();
    }, []);
    const changePage=(pagenumber)=>{
        const temp = require('./CollabOutlinePage'+pagenumber+'.json');
        console.log(pagenumber);
        setCollab(temp.additionalProp1);
        setPageNumber(pageNumber);
        window.scrollTo(0, 0);
    }

    return (
        <>
            <PageOutlineTemplate page={Page}>
                <PageOutlineContentTemplate page={Page} hasSwitch={false} Post={Collab} changePageNumber={(pagenumber)=>{changePage(pagenumber)}}/>
            </PageOutlineTemplate>

        </>
    );


}

export default  CollabOutlinePage;