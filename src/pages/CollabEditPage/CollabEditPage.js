import React, { useEffect, useState } from 'react';
import PageDetailTemplate from '../../components/PageDetailTemplate/PageDetailTemplate'
import PostEditTemplate from '../../components/PostEditTemplate/PostEditTemplate';
import axios from '../../components/axios/axios';
function QnAEditPage(){
    const page = "CollabEditPage";
    const postId = '62b07f9c0997e642d14020c6';
    const [post, setPost] = useState(null);
    const [mode, setMode] = useState('Edit') // "Edit" or "New" 

    useEffect(() => {
        async function getCollabNoteById() {
            axios.get(`http://localhost:8080/post/${postId}`)
            .then(res => {
                console.log(res.data.res)
                setPost(res.data.res)
            })
            .catch(err =>{
                console.log(err)
            })
        }
        if(mode=="Edit"){
            getCollabNoteById();
        }
        
        }, []);

    return(
        <>
            <PageDetailTemplate page={page}>
                <PostEditTemplate page={page} type={"collaboration"} post={post} mode={mode} postId={postId}/>
            </PageDetailTemplate>
        </>
        
    );
}
export default QnAEditPage;