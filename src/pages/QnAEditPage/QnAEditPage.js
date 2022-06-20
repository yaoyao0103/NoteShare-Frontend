import React, {useState, useEffect} from 'react';
import PageDetailTemplate from '../../components/PageDetailTemplate/PageDetailTemplate'
import PostEditTemplate from '../../components/PostEditTemplate/PostEditTemplate';
import axios from 'axios';
function QnAEditPage(){
    const page = "QnAEditPage";

    const postId = '62b076e50997e642d140206c'
    const [post, setPost] = useState(null);
    const [mode, setMode] = useState('Edit') // "Edit" or "New" 

    useEffect(() => {
        async function getQnAById() {
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
            getQnAById();
        }
        
        }, []);

    return(
        <>
            <PageDetailTemplate page={page}>
                <PostEditTemplate page={page} type={"QA"} post={post} mode={mode} postId={postId}/>
            </PageDetailTemplate>
        </>
        
    );
}
export default QnAEditPage;