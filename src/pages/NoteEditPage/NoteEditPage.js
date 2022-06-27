import React, { useEffect, useState } from 'react';
import PageDetailTemplate from '../../components/PageDetailTemplate/PageDetailTemplate'
import NoteEditTemplate from '../../components/NoteEditTemplate/NoteEditTemplate';
import axios from '../../components/axios/axios';
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
                console.log(err)
            })
        }
        if(props.action=='edit'){
            getNoteById();
        }
        
        }, []);

    return(
        <>
            {/* <PageDetailTemplate page={page}>
                <NoteEditTemplate page={page} note={note} mode={props.action}/>
            </PageDetailTemplate> */}
            <NoteEditTemplate page={props.page} note={note} mode={props.action}  setPageProps={props.setPageProps} setCurrPage={props.setCurrPage}/>
        </>
        
    );
}
export default NoteEditPage;

/*
62aee9682b646a3f85671a8b
62aff9955922ca112066627b
62affa4a5922ca11206662d0
*/