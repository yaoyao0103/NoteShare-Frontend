import React, { useState, useEffect } from 'react';
import PageDetailTemplate from '../../components/PageDetailTemplate/PageDetailTemplate'
import PageDetailContentTemplate from '../../components/PageDetailContentTemplate/PageDetailContentTemplate';
import axios from '../../components/axios/axios';
function NoteDetailPage(){
    const [ post, setPost ] = useState();
    const postId = "62b07f9c0997e642d14020c6";
    const page = "CollabDetailPage";
    const [ isAuthor, setIsAuthor ] = useState(false);
    const [ isManager, setIsManager ] = useState(false);
    
    useEffect(() => {
        async function getCollabById() {
            axios.get(`http://localhost:8080/post/${postId}`)
            .then(res => {
                console.log(res.data.res)
                setPost(res.data.res)
            })
            .catch(err =>{
                console.log(err)
            })
        }
        getCollabById();
        }, []);
    return(
        <>
            <PageDetailTemplate page={page}>
                <PageDetailContentTemplate page={page} data={post} isAuthor={isAuthor} isManager={isManager} voting={true} postId={postId}/>
            </PageDetailTemplate>
        </>
        
    );
}
export default NoteDetailPage;