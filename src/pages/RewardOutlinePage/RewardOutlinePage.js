import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import PageOutlineTemplate from '../../components/PageOutlineTemplate/PageOutlineTemplate';
import PageOutlineContentTemplate from '../../components/PageOutlineContentTemplate/PageOutlineContentTemplate';
import { Layout } from "antd";
const { Header, Content, Footer } = Layout;
function RewardOutlinePage() {
    const [Page, setPage] = useState('RewardOutlinePage');
    const [pageNumber, setPageNumber] = useState('1');
    const [ Reward, setReward] =useState([]);
    useEffect(() => {
        setPage('RewardOutlinePage');
        //console.log(Page)
    }, [Page]);
    useEffect(() => {
        async function getRewardById() {
            try {
                const temp = require('./RewardOutlinePage'+pageNumber+'.json');
                //console.log(pageNumber);
                setReward(temp.additionalProp1);
            } catch (error) {
                //console.log(error.message);
                setReward(error.message);


            }
        }
        getRewardById();
    }, []);
    const changePage=(pagenumber)=>{
        const temp = require('./RewardOutlinePage'+pagenumber+'.json');
        //console.log(pagenumber);
        setReward(temp.additionalProp1);
        setPageNumber(pageNumber);
        window.scrollTo(0, 0);
    }

    return (
        <>
            <PageOutlineTemplate page={Page}>
                <PageOutlineContentTemplate page={Page} hasSwitch={false} Post={Reward} changePageNumber={(pagenumber)=>{changePage(pagenumber)}}/>
            </PageOutlineTemplate>

        </>
    );


}

export default  RewardOutlinePage;