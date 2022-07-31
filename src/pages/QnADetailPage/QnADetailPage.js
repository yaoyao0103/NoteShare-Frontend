import React, { useState, useEffect } from 'react';
import axios from "axios";
import PageDetailTemplate from "../../components/PageDetailTemplate/PageDetailTemplate"
import PageDetailContentTemplate from '../../components/PageDetailContentTemplate/PageDetailContentTemplate';
import { message } from "antd";
import Cookie from '../../components/Cookies/Cookies';
const cookieParser=new Cookie(document.cookie)
function QnADetailPage(props) {
    const [post, setPost] = useState([]);
    const page = "QnADetailPage";
    const postId = '62b076e50997e642d140206c'

    useEffect(() => {
        async function getQnAById() {
            axios.get(`http://localhost:8080/post/${props.postId}`)
            .then(res => {
                setPost(res.data.res)
                
                props.setLoading(false);
            })
            .catch(err =>{
                message.error("Server Error! Please try again later. (Get Reward Post Error)")
                console.log(err)
                if (err.response.status === 500 || err.response.status === 404||err.response.status === 403){
                    if(err.response.data.message.slice(0,13)==='Malformed JWT')
                    document.cookie = 'error=Jwt'
                    else
                    document.cookie = 'error=true'
                    message.warning('Please refresh again!')
                }
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