import React, { useState, useEffect } from 'react';
import PageDetailTemplate from '../../components/PageDetailTemplate/PageDetailTemplate'
import PageDetailContentTemplate from '../../components/PageDetailContentTemplate/PageDetailContentTemplate';
import axios from '../../components/axios/axios';
function NoteDetailPage(props){
    const [ post, setPost ] = useState();
    
    useEffect(() => {
        async function getCollabById() {
            axios.get(`http://localhost:8080/post/${props.postId}`)
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
            {/* <PageDetailTemplate page={page}>
                <PageDetailContentTemplate page={page} data={post} isAuthor={isAuthor} isManager={isManager} voting={true} postId={postId}/>
            </PageDetailTemplate> */}
            <PageDetailContentTemplate page={props.page} data={post} postId={props.postId} setPageProps={props.setPageProps} />
        </>
        
    );
}
export default NoteDetailPage;