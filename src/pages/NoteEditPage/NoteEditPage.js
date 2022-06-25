import React, { useEffect, useState } from 'react';
import { Link, useParams, useLocation  } from "react-router-dom";
import PageDetailTemplate from '../../components/PageDetailTemplate/PageDetailTemplate'
import NoteEditTemplate from '../../components/NoteEditTemplate/NoteEditTemplate';
import axios from '../../components/axios/axios';
function NoteEditPage(){
    const params = useParams();
    const location = useLocation()
    const page = "NoteEditPage";
    const [note, setNote] = useState(null);
    const [action, setAction] = useState(null)

    useEffect(() => {
        async function getNoteById() {
            axios.get(`http://localhost:8080/note/${params.noteId}`)
            .then(res => {
                setNote(res.data.res)
                console.log(res.data.res)
            })
            .catch (err => {
                console.log(err)
            })
        }
        console.log(location)
        const path = location.pathname.slice(0, location.pathname.lastIndexOf('/'))
        if(path=='/NoteEditPage'){
            setAction('edit')
            getNoteById();
        }
        else{
            setAction('new')
        }
        
        }, []);

    return(
        <>
            <PageDetailTemplate page={page}>
                <NoteEditTemplate page={page} note={note} mode={action}/>
            </PageDetailTemplate>
        </>
        
    );
}
export default NoteEditPage;

/*
62aee9682b646a3f85671a8b
62aff9955922ca112066627b
62affa4a5922ca11206662d0
*/