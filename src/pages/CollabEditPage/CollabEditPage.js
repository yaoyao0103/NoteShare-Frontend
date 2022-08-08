import React, { useEffect, useState } from 'react';
import PageDetailTemplate from '../../components/PageDetailTemplate/PageDetailTemplate'
import PostEditTemplate from '../../components/PostEditTemplate/PostEditTemplate';
import axios from '../../components/axios/axios';
import { message } from "antd";
import Cookie from '../../components/Cookies/Cookies';
const cookieParser=new Cookie(document.cookie)
function QnAEditPage(props){
    //const postId = '62b07f9c0997e642d14020c6';
    const [post, setPost] = useState(null);

    useEffect(() => {
        async function getCollabNoteById() {
            axios.get(`192.168.0.7:8080/post/${props.postId}`)
            .then(res => {
                console.log(res.data.res)
                setPost(res.data.res)
            })
            .catch(err =>{
                if (err.response.status === 500 || err.response.status === 404||err.response.status === 403){
                    if(err.response.data.message.slice(0,13)==='Malformed JWT')
                    document.cookie = 'error=Jwt'
                    else
                    document.cookie = 'error=true'
                    message.error('Server Error! Please refresh again! (Get Collaboration Post Error)')
                }
                else{
                    message.error("Server Error! Please try again later. (Get Collaboration Post Error)")
                }
            })
        }
        if(props.action==="edit"){
            getCollabNoteById();
        }
        
        }, []);

    return(
        <>
            {/* <PageDetailTemplate page={page}>
                <PostEditTemplate page={page} type={"collaboration"} post={post} mode={props.action} postId={postId}/>
            </PageDetailTemplate> */}
            <PostEditTemplate sendBellMessage={props.sendBellMessage} page={props.page} type={props.type} post={post} mode={props.action} postId={props.postId} setPageProps={props.setPageProps}/>

        </>
        
    );
}
export default QnAEditPage;