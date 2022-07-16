import React, { useState, useEffect } from 'react';
import PageDetailTemplate from '../../components/PageDetailTemplate/PageDetailTemplate'
import PageDetailContentTemplate from '../../components/PageDetailContentTemplate/PageDetailContentTemplate';
import axios from '../../components/axios/axios';
import { message } from "antd";

function NoteDetailPage(props){
    const [ post, setPost ] = useState();
    
    useEffect(() => {
        async function getCollabById() {
            axios.get(`http://localhost:8080/post/${props.postId}`)
            .then(res => {
                console.log(res.data.res)
                setPost(res.data.res)
                props.setLoading(false)
            })
            .catch(err =>{
                message.error("Server Error! Please try again later. (Get Collaboration Post Error)")
                console.log(err)
            })
        }
        getCollabById();
        }, [props]);
    return(
        <>
            {/* <PageDetailTemplate page={page}>
                <PageDetailContentTemplate page={page} data={post} isAuthor={isAuthor} isManager={isManager} voting={true} postId={postId}/>
            </PageDetailTemplate> */}
            <PageDetailContentTemplate sendPrivateMessage={props.sendPrivateMessage} page={props.page} data={post} postId={props.postId} setPageProps={props.setPageProps} />
        </>
        
    );
}
export default NoteDetailPage;