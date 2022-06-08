import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import PageOutlineTemplate from '../../components/PageOutlineTemplate/PageOutlineTemplate';
import PageOutlineContentTemplate from '../../components/PageOutlineContentTemplate/PageOutlineContentTemplate';
import './QnAOutlinePage.css';
import { Layout } from "antd";
const { Header, Content, Footer } = Layout;
function QnAOutlinePage() {
    const [Page, setPage] = useState('QnAOutlinePage');
    const [pageNumber, setPageNumber] = useState('1');
    const [QnA, setQnA] =useState([]);
    useEffect(() => {
        setPage('QnAOutlinePage');
        console.log(Page)
    }, [Page]);
    useEffect(() => {
        async function getQnAById() {
            try {
                const temp = require('./QnAOutlinePage'+pageNumber+'.json');
                console.log(pageNumber);
                setQnA(temp.additionalProp1);
            } catch (error) {
                console.log(error.message);
                setQnA(error.message);


            }
        }
        getQnAById();
    }, []);
    const changePage=(pagenumber)=>{
        const temp = require('./QnAOutlinePage'+pagenumber+'.json');
        console.log(pagenumber);
        setQnA(temp.additionalProp1);
        setPageNumber(pageNumber);
        window.scrollTo(0, 0);
    }
    // useEffect(() => {
    //     async function getQnAById() {
    //         try {
    //             const temp = require('./QnAOutlinePage'+pageNumber+'.json');
    //             console.log(pageNumber);
    //             setQnA(temp.additionalProp1);
    //         } catch (error) {
    //             console.log(error.message);
    //             setQnA(error.message);


    //         }
    //     }
    //     getQnAById();
    // }, pageNumber);
    return (
        <>
            <PageOutlineTemplate page={Page}>
                <PageOutlineContentTemplate page={Page} hasSwitch={false} QnA={QnA} changePageNumber={(pagenumber)=>{changePage(pagenumber)}}/>
            </PageOutlineTemplate>

        </>
    );


}

export default QnAOutlinePage;