import React, { useState, useEffect } from 'react';
import axios from "axios";
import PageDetailTemplate from "../../components/PageDetailTemplate/PageDetailTemplate"
import PageDetailContentTemplate from '../../components/PageDetailContentTemplate/PageDetailContentTemplate';

function RewardDetailPage() {
    const [post, setPost] = useState([]);
    const postId = '62b0891f0997e642d1402113'
    const page = "RewardDetailPage";

    useEffect(() => {
        async function getRewardById() {
            axios.get(`http://localhost:8080/post/${postId}`)
            .then(res => {
                console.log(res.data.res)
                setPost(res.data.res)
            })
            .catch(err =>{
               console.log(err)
            })
        }
        getRewardById();
    }, []);

    return (
        <>
            <PageDetailTemplate page={page}>
                <PageDetailContentTemplate page={page} data={post} footerBtn={"Answer"} postId={postId}/>  
            </PageDetailTemplate>   
        </>
    );
}
export default RewardDetailPage;