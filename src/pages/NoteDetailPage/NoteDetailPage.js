import React, { useState, useEffect } from 'react';
import PageDetailTemplate from '../../components/PageDetailTemplate/PageDetailTemplate'
import PageDetailContentTemplate from '../../components/PageDetailContentTemplate/PageDetailContentTemplate';
import axios from '../../components/axios/axios';
import { message } from "antd";
import Cookie from '../../components/Cookies/Cookies';
const cookieParser = new Cookie(document.cookie)
function NoteDetailPage(props) {
    const [note, setNote] = useState();
    //const noteId = "62aee9682b646a3f85671a8b"
    const page = "NoteDetailPage";

    useEffect(() => {
        //console.log('1234')
        async function getNoteById() {
            axios.get(`http://localhost:8080/note/${props.noteId}`)
                .then(res => {
                    setNote(res.data.res)
                    console.log("Note Response:", res.data.res)
                    props.setLoading(false)
                })
                .catch(err => {
                    message.error("Server Error! Please try again later. (Get Note Error)")
                    //console.log(err)
                    if (err.response.status === 500 || err.response.status === 404||err.response.status === 403){
                        if(err.response.data.message.slice(0,13)==='Malformed JWT')
                        document.cookie = 'error=Jwt'
                        else
                        document.cookie = 'error=true'
                        message.warning('Please refresh again!')
                    }
                       
                })
        }
        //console.log("--------------------")
        getNoteById();
    }, [props]);
    return (
        <>
            {/* <PageDetailTemplate page={page}>
                <PageDetailContentTemplate page={page} data={note} noteId={props.noteId}/>
            </PageDetailTemplate> */}
            <PageDetailContentTemplate setLoading={props.setLoading} coinNum={props.coinNum} setCoinNum={props.setCoinNum} sendPrivateMessage={props.sendPrivateMessage} page={page} data={note} noteId={props.noteId} setPageProps={props.setPageProps} />
        </>

    );
}
export default NoteDetailPage;