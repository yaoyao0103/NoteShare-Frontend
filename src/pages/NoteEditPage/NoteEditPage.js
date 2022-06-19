import React, { useEffect, useState } from 'react';
import PageDetailTemplate from '../../components/PageDetailTemplate/PageDetailTemplate'
import NoteEditTemplate from '../../components/NoteEditTemplate/NoteEditTemplate';
import axios from '../../components/axios/axios';
function NoteEditPage(){
    const page = "NoteEditPage";
    const [mode, setMode] = useState("Edit");
    const [note, setNote] = useState(null);
    const noteId = "62aee9682b646a3f85671a8b"
    useEffect(() => {
        async function getNoteById() {
            axios.get(`http://localhost:8080/note/${noteId}`)
            .then(res => {
                setNote(res.data.res)
                console.log(res.data.res)
            })
            .catch (err => {
                console.log(err)
            })
        }
        if(mode=="Edit"){
            getNoteById();
        }
        
        }, []);

    return(
        <>
            <PageDetailTemplate page={page}>
                <NoteEditTemplate page={page} note={note} mode={mode}/>
            </PageDetailTemplate>
        </>
        
    );
}
export default NoteEditPage;