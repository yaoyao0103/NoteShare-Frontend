import React, {useState, useEffect} from 'react';
import PageDetailTemplate from '../../components/PageDetailTemplate/PageDetailTemplate'
import PostEditTemplate from '../../components/PostEditTemplate/PostEditTemplate';
function QnAEditPage(){
    const page = "QnAEditPage";

    const [post, setPost] = useState(null);
    const [mode, setMode] = useState('Edit') // "Edit" or "New" 

    useEffect(() => {
        async function getQnAById() {
            try {
                const post = require('../../MockData/QnA.json');
                setPost(post);
                console.log(post)
            } catch (error) {
                console.log(error);
            }
        }
        if(mode=="Edit"){
            getQnAById();
        }
        
        }, []);

    return(
        <>
            <PageDetailTemplate page={page}>
                <PostEditTemplate page={page} type={"QnA"} post={post} mode={mode}/>
            </PageDetailTemplate>
        </>
        
    );
}
export default QnAEditPage;