import React, { useState, useEffect } from 'react';
import axios from "axios";
import PageDetailTemplate from "../../components/PageDetailTemplate/PageDetailTemplate"
import PageDetailContentTemplate from '../../components/PageDetailContentTemplate/PageDetailContentTemplate';

function QnADetailPage() {
    const [QnA, setQnA] = useState([]);
    const page = "QnADetailPage";

    useEffect(() => {
        async function getQnAById() {
            try {
                const temp = require('./QnAJson.json');
                setQnA(temp);
            } catch (error) {
                console.log(error.message);
                setQnA(error.message);


            }
        }
        getQnAById();
    }, []);

    return (
        <>
            <PageDetailTemplate page={page}>
                <PageDetailContentTemplate page={page} data={QnA} />  
            </PageDetailTemplate>
        </>
    );
}
export default QnADetailPage;