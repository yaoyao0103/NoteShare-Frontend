import React, { useEffect, useState } from 'react';
import PageDetailTemplate from '../../components/PageDetailTemplate/PageDetailTemplate'
import NoteEditTemplate from '../../components/NoteEditTemplate/NoteEditTemplate';
import axios from '../../components/axios/axios';
import { message } from "antd";
import Cookie from '../../components/Cookies/Cookies';
const cookieParser=new Cookie(document.cookie)
function NoteEditPage(props){
    const [note, setNote] = useState(null);

    useEffect(() => {
        async function getNoteById() {
            axios.get(`http://localhost:8080/note/${props.noteId}`)
            .then(res => {
                setNote(res.data.res)
                console.log(res.data.res)
            })
            .catch (err => {
                message.error("Server Error! Please try again later. (Get Note Error)")
                console.log(err)
                if (err.response.status === 500 || err.response.status === 404){
                    document.cookie = 'error=true'
                }
                else if (err.response.status === 403){
                    document.cookie = 'error=Jwt'                       
                }
            })
        }
        if(props.action=='edit'){
            getNoteById();
            console.log("edit")
        }
        else if(props.action=='new'){
            console.log("new")
        }
        else{
            console.log("newReward")
        }
        
        }, []);

    return(
        <>
            {/* <PageDetailTemplate page={page}>
                <NoteEditTemplate page={page} note={note} mode={props.action}/>
            </PageDetailTemplate> */}
            <NoteEditTemplate sendBellMessage={props.sendBellMessage} page={props.page} sendPrivateMessage={props.sendPrivateMessage}rewardAuthorEmail={props.rewardAuthorEmail}note={note} mode={props.action} setPageProps={props.setPageProps} folderId={props.folderId} postId={props.postId} setLoading={props.setLoading}/>
        </>
        
    );
}
export default NoteEditPage;

/*
62aee9682b646a3f85671a8b
62aff9955922ca112066627b
62affa4a5922ca11206662d0
*/