import React, { useState, useEffect } from 'react';
import axios from "axios";
import PageDetailTemplate from "../../components/PageDetailTemplate/PageDetailTemplate"
import PageDetailContentTemplate from '../../components/PageDetailContentTemplate/PageDetailContentTemplate';

function QnADetailPage(props) {
    const [post, setPost] = useState([]);
    const page = "QnADetailPage";
    const postId = '62b076e50997e642d140206c'

    useEffect(() => {
        async function getQnAById() {
            axios.get(`http://localhost:8080/post/${props.postId}`)
            .then(res => {
                setPost(res.data.res)
                console.log("QnA:",res.data.res)
                props.setLoading(false);
            })
            .catch(err =>{
                console.log(err)
            })
        }
        getQnAById();
    }, [props]);

    return (
        <>
            {/* <PageDetailTemplate page={page}>
                <PageDetailContentTemplate page={page} data={QnA} postId={postId}/>  
            </PageDetailTemplate> */}
            <PageDetailContentTemplate page={props.page} data={post} postId={props.postId} setPageProps={props.setPageProps} />  
        </>
    );
}
export default QnADetailPage;