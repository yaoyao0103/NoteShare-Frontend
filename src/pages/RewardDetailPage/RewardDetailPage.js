import React, { useState, useEffect } from 'react';
import axios from "axios";
import PageDetailTemplate from "../../components/PageDetailTemplate/PageDetailTemplate"
import PageDetailContentTemplate from '../../components/PageDetailContentTemplate/PageDetailContentTemplate';

function RewardDetailPage() {
    const [reward, setReward] = useState([]);
    const page = "RewardDetailPage";

    useEffect(() => {
        async function getRewardById() {
            try {
                const temp = require('./RewardJson.json');
                setReward(temp);
            } catch (error) {
                console.log(error.message);
            }
        }
        getRewardById();
    }, []);

    return (
        <>
            <PageDetailTemplate page={page}>
                <PageDetailContentTemplate page={page} data={reward} footerBtn={"Answer"}/>  
            </PageDetailTemplate>   
        </>
    );
}
export default RewardDetailPage;