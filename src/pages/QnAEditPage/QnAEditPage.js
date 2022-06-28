import React, {useState, useEffect} from 'react';
import PageDetailTemplate from '../../components/PageDetailTemplate/PageDetailTemplate'
import PostEditTemplate from '../../components/PostEditTemplate/PostEditTemplate';
import axios from 'axios';
function QnAEditPage(props){
    const [post, setPost] = useState(null);

    useEffect(() => {
        async function getQnAById() {
            axios.get(`http://localhost:8080/post/${props.postId}`)
            .then(res => {
                console.log(res.data.res)
                setPost(res.data.res)
            })
            .catch(err =>{
                console.log(err)
            })
        }
        if(props.action=="edit"){
            getQnAById();
        }
        
        }, []);

    return(
        <>
            {/* <PageDetailTemplate page={page}>
                <PostEditTemplate page={page} type={"QA"} post={post} mode={mode} postId={postId}/>
            </PageDetailTemplate> */}
            <PostEditTemplate page={props.page} type={props.type} post={post} mode={props.action} postId={props.postId} setPageProps={props.setPageProps}/>
        </>
        
    );
}
export default QnAEditPage;