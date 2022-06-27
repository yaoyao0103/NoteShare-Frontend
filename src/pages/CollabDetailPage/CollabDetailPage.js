import React, { useState, useEffect } from 'react';
import PageDetailTemplate from '../../components/PageDetailTemplate/PageDetailTemplate'
import PageDetailContentTemplate from '../../components/PageDetailContentTemplate/PageDetailContentTemplate';
import axios from '../../components/axios/axios';
function NoteDetailPage(props){
    const [ post, setPost ] = useState();
    const [ isAuthor, setIsAuthor ] = useState(true);
    const [ isManager, setIsManager ] = useState(true);
    
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
            <PageDetailContentTemplate page={props.page} data={post} isAuthor={isAuthor} isManager={isManager} voting={true} postId={props.postId} setPageProps={props.setPageProps} setCurrPage={props.setCurrPage}/>
        </>
        
    );
}
export default NoteDetailPage;