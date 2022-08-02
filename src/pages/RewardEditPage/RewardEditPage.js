import React, {useState, useEffect} from 'react';
import PageDetailTemplate from '../../components/PageDetailTemplate/PageDetailTemplate'
import PostEditTemplate from '../../components/PostEditTemplate/PostEditTemplate';
import axios from '../../components/axios/axios';
import { message } from "antd";
import Cookie from '../../components/Cookies/Cookies';
const cookieParser=new Cookie(document.cookie)
function RewardEditPage(props){
    const [post, setPost] = useState(null);

    useEffect(() => {
        async function getRewardById() {
            axios.get(`http://localhost:8080/post/${props.postId}`)
            .then(res => {
                //console.log(res.data.res)
                setPost(res.data.res)
            })
            .catch(err =>{
                if (err.response.status === 500 || err.response.status === 404||err.response.status === 403){
                    if(err.response.data.message.slice(0,13)==='Malformed JWT')
                    document.cookie = 'error=Jwt'
                    else
                    document.cookie = 'error=true'
                    message.error('Server Error! Please refresh again! (Get Reward Post Error)')
                }
                else{
                    message.error("Server Error! Please try again later. (Get Reward Post Error)")  
                }
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
            <PostEditTemplate sendBellMessage={props.sendBellMessage} page={props.page} type={props.type} post={post} postId={props.postId} mode={props.action} setPageProps={props.setPageProps} />
        </>
        
    );
}
export default RewardEditPage;