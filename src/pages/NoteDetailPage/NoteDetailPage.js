import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PageDetailTemplate from '../../components/PageDetailTemplate/PageDetailTemplate'
import PageDetailContentTemplate from '../../components/PageDetailContentTemplate/PageDetailContentTemplate';
import axios from '../../components/axios/axios';
function NoteDetailPage(){
    const { noteId } = useParams()
    const [ note, setNote ] = useState();
    //const noteId = "62aee9682b646a3f85671a8b"
    const page = "NoteDetailPage";
    
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

        getNoteById();
        }, []);
    return(
        <>
            <PageDetailTemplate page={page}>
                <PageDetailContentTemplate page={page} data={note} noteId={noteId}/>
            </PageDetailTemplate>
        </>
        
    );
}
export default NoteDetailPage;