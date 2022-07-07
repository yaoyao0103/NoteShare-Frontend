import React, { useState, useEffect } from 'react';
import PageDetailTemplate from '../../components/PageDetailTemplate/PageDetailTemplate'
import PageDetailContentTemplate from '../../components/PageDetailContentTemplate/PageDetailContentTemplate';
import axios from '../../components/axios/axios';
function NoteDetailPage(props){
    const [ note, setNote ] = useState();
    //const noteId = "62aee9682b646a3f85671a8b"
    const page = "NoteDetailPage";
    
    useEffect(() => {
        //console.log('1234')
        async function getNoteById() {
            axios.get(`http://localhost:8080/note/${props.noteId}`)
            .then(res => {
                setNote(res.data.res)
                console.log("Note Response:", res.data.res)
            })
            .catch (err => {
                console.log(err)
            })
        }
        console.log("--------------------")
        getNoteById();
        }, [props]);
    return(
        <>
            {/* <PageDetailTemplate page={page}>
                <PageDetailContentTemplate page={page} data={note} noteId={props.noteId}/>
            </PageDetailTemplate> */}
            <PageDetailContentTemplate page={page} data={note} noteId={props.noteId} setPageProps={props.setPageProps} />
        </>
        
    );
}
export default NoteDetailPage;