import React, {useState, useEffect} from 'react';
import PageDetailTemplate from '../../components/PageDetailTemplate/PageDetailTemplate'
import PostEditTemplate from '../../components/PostEditTemplate/PostEditTemplate';
function RewardEditPage(){
    const page = "RewardEditPage";
    const [post, setPost] = useState(null);
    const [mode, setMode] = useState('Edit') // "Edit" or "New" 

    useEffect(() => {
        async function getRewardById() {
            try {
                const post = require('../../MockData/Reward.json');
                setPost(post);
                console.log(post)
            } catch (error) {
                console.log(error);
            }
        }
        if(mode=="Edit"){
            getRewardById();
        }
        
        }, []);

    return(
        <>
            <PageDetailTemplate page={page}>
                <PostEditTemplate page={page} type={"Reward"} post={post} mode={mode}/>
            </PageDetailTemplate>
        </>
        
    );
}
export default RewardEditPage;