import React, { useState, useEffect } from 'react';
import axios from "axios";
import PageDetailTemplate from "../../components/PageDetailTemplate/PageDetailTemplate"
import PageDetailContentTemplate from '../../components/PageDetailContentTemplate/PageDetailContentTemplate';
import { message } from "antd";
import Cookie from '../../components/Cookies/Cookies';
const cookieParser=new Cookie(document.cookie)
function RewardDetailPage(props) {
    const [post, setPost] = useState([]);
    //const postId = '62b0891f0997e642d1402113'
    useEffect(() => {
        async function getRewardById() {
            axios.get(`http://localhost:8080/post/${props.postId}`,{
                headers: {
                    'Authorization': 'Bearer ' + cookieParser.getCookieByName("token"),
                  }
            })
            .then(res => {
                console.log(res.data.res)
                setPost(res.data.res)
                props.setLoading(false)
            })
            .catch(err =>{
                message.error("Server Error! Please try again later. (Get Reward Post Error)")
                console.log(err)
            })
        }
        getRewardById();
    }, [props]);

    return (
        <>
            {/* <PageDetailTemplate page={page}>
                <PageDetailContentTemplate page={page} data={post} footerBtn={"Answer"} postId={postId}/>  
            </PageDetailTemplate>    */}
            <PageDetailContentTemplate page={props.page} data={post} footerBtn={"Answer"} postId={props.postId} setPageProps={props.setPageProps}/>  
        </>
    );
}
export default RewardDetailPage;