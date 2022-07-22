import React, {useState, useEffect} from 'react';
import PageDetailTemplate from '../../components/PageDetailTemplate/PageDetailTemplate'
import PostEditTemplate from '../../components/PostEditTemplate/PostEditTemplate';
import axios from 'axios';
import { message } from "antd";
import Cookie from '../../components/Cookies/Cookies';
const cookieParser=new Cookie(document.cookie)
function QnAEditPage(props){
    const [post, setPost] = useState(null);

    useEffect(() => {
        async function getQnAById() {
            axios.get(`http://localhost:8080/post/${props.postId}`,{
                headers: {
                    'Authorization': 'Bearer ' + cookieParser.getCookieByName("token"),
                  }
            })
            .then(res => {
                console.log(res.data.res)
                setPost(res.data.res)
            })
            .catch(err =>{
                message.error("Server Error! Please try again later. (Get Reward Post Error)")
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
            <PostEditTemplate  sendBellMessage={props.sendBellMessage} page={props.page} type={props.type} post={post} mode={props.action} postId={props.postId} setPageProps={props.setPageProps}/>
        </>
        
    );
}
export default QnAEditPage;