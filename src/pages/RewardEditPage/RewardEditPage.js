import React, {useState, useEffect} from 'react';
import PageDetailTemplate from '../../components/PageDetailTemplate/PageDetailTemplate'
import PostEditTemplate from '../../components/PostEditTemplate/PostEditTemplate';
import axios from '../../components/axios/axios';
function RewardEditPage(){
    const page = "RewardEditPage";
    const postId = '62b0891f0997e642d1402113'
    const [post, setPost] = useState(null);
    const [mode, setMode] = useState('Edit') // "Edit" or "New" 

    useEffect(() => {
        async function getRewardById() {
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
            getRewardById();
        }
        
        }, []);

    return(
        <>
            <PageDetailTemplate page={page}>
                <PostEditTemplate page={page} type={"reward"} post={post} mode={mode}/>
            </PageDetailTemplate>
        </>
        
    );
}
export default RewardEditPage;