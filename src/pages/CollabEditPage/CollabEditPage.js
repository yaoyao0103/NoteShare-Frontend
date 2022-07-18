import React, { useEffect, useState } from 'react';
import PageDetailTemplate from '../../components/PageDetailTemplate/PageDetailTemplate'
import PostEditTemplate from '../../components/PostEditTemplate/PostEditTemplate';
import axios from '../../components/axios/axios';
import { message } from "antd";

function QnAEditPage(props){
    //const postId = '62b07f9c0997e642d14020c6';
    const [post, setPost] = useState(null);

    useEffect(() => {
        async function getCollabNoteById() {
            axios.get(`http://localhost:8080/post/${props.postId}`)
            .then(res => {
                console.log(res.data.res)
                setPost(res.data.res)
            })
            .catch(err =>{
                message.error("Server Error! Please try again later. (Get Collaboration Post Error)")
                console.log(err)
            })
        }
        if(props.action=="edit"){
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