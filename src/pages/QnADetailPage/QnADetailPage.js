import React, { useState, useEffect } from 'react';
import axios from "axios";
import PageDetailTemplate from "../../components/PageDetailTemplate/PageDetailTemplate"
import PageDetailContentTemplate from '../../components/PageDetailContentTemplate/PageDetailContentTemplate';

function QnADetailPage() {
    const [QnA, setQnA] = useState([]);
    const page = "QnADetailPage";
    const postId = '62b076e50997e642d140206c'

    useEffect(() => {
        async function getQnAById() {
            axios.get(`http://localhost:8080/post/${postId}`)
            .then(res => {
                console.log(res.data.res)
                setQnA(res.data.res)
            })
            .catch(err =>{
                console.log(err)
            })
        }
        getQnAById();
    }, []);

    return (
        <>
            <PageDetailTemplate page={page}>
                <PageDetailContentTemplate page={page} data={QnA} postId={postId}/>  
            </PageDetailTemplate>
        </>
    );
}
export default QnADetailPage;