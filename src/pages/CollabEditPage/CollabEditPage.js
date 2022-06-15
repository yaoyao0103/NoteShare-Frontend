import React, { useEffect, useState } from 'react';
import PageDetailTemplate from '../../components/PageDetailTemplate/PageDetailTemplate'
import PostEditTemplate from '../../components/PostEditTemplate/PostEditTemplate';
function QnAEditPage(){
    const page = "CollabEditPage";
    const [post, setPost] = useState(null);
    const [mode, setMode] = useState('Edit') // "Edit" or "New" 

    useEffect(() => {
        async function getCollabNoteById() {
            try {
                const post = require('../../MockData/CollabNote.json');
                setPost(post);
                console.log(post)
            } catch (error) {
                console.log(error);
            }
        }
        if(mode=="Edit"){
            getCollabNoteById();
        }
        
        }, []);

    return(
        <>
            <PageDetailTemplate page={page}>
                <PostEditTemplate page={page} type={"CollabNote"} post={post} mode={mode}/>
            </PageDetailTemplate>
        </>
        
    );
}
export default QnAEditPage;