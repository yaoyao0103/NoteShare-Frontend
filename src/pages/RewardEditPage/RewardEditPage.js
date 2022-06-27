import React, {useState, useEffect} from 'react';
import PageDetailTemplate from '../../components/PageDetailTemplate/PageDetailTemplate'
import PostEditTemplate from '../../components/PostEditTemplate/PostEditTemplate';
import axios from '../../components/axios/axios';
function RewardEditPage(props){
    const [post, setPost] = useState(null);

    useEffect(() => {
        async function getRewardById() {
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
            getRewardById();
        }
        
        }, []);

    return(
        <>
            {/* <PageDetailTemplate page={page}>
                <PostEditTemplate page={page} type={"reward"} post={post} mode={mode}/>
            </PageDetailTemplate> */}
            <PostEditTemplate page={props.page} type={props.type} post={post} postId={props.postId} mode={props.action} setPageProps={props.setPageProps} setCurrPage={props.setCurrPage}/>
        </>
        
    );
}
export default RewardEditPage;