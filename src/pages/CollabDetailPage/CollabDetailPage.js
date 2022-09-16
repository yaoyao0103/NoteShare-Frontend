import React, { useState, useEffect } from 'react';
import PageDetailTemplate from '../../components/PageDetailTemplate/PageDetailTemplate'
import PageDetailContentTemplate from '../../components/PageDetailContentTemplate/PageDetailContentTemplate';
import axios from '../../components/axios/axios';
import { message } from "antd";
import Cookie from '../../components/Cookies/Cookies';
const cookieParser = new Cookie(document.cookie)
function NoteDetailPage(props) {
    const [post, setPost] = useState();

    useEffect(() => {
        async function getCollabById() {
            axios.get(`/post/${props.postId}`)
                .then(res => {
                    console.log(res.data.res)
                    setPost(res.data.res)
                    props.setLoading(false)
                })
                .catch(err => {
                    if (err.response.status === 500 || err.response.status === 404 || err.response.status === 403) {
                        if (err.response.data.message.slice(0, 13) === 'Malformed JWT') {
                            document.cookie = 'error=Jwt'
                            message.destroy()
                            message.warning('The connection timed out, please login again !')
                            document.cookie = 'email=;'
                            props.setLoggedIn(false)
                            props.setPageProps({ page: 'LoginPage' })
                        }
                        else
                            document.cookie = 'error=true'
                        message.error('Server Error! Please refresh again! (Get Collaboration Post Error)')
                    }
                    else {
                        message.error("Server Error! Please try again later. (Get Collaboration Post Error)")

                    }
                })
        }
        getCollabById();
    }, [props]);
    return (
        <>
            {/* <PageDetailTemplate page={page}>
                <PageDetailContentTemplate page={page} data={post} isAuthor={isAuthor} isManager={isManager} voting={true} postId={postId}/>
            </PageDetailTemplate> */}
            <PageDetailContentTemplate setLoggedIn={props.setLoggedIn} sendPrivateMessage={props.sendPrivateMessage} page={props.page} data={post} postId={props.postId} setPageProps={props.setPageProps} setLoading={props.setLoading}/>
        </>

    );
}
export default NoteDetailPage;