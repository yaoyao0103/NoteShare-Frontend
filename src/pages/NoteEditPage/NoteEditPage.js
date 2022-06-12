import React, { useEffect, useState } from 'react';
import PageDetailTemplate from '../../components/PageDetailTemplate/PageDetailTemplate'
import NoteEditTemplate from '../../components/NoteEditTemplate/NoteEditTemplate';
function NoteEditPage(){
    const page = "NoteEditPage";
    const [mode, setMode] = useState("New");
    const [note, setNote] = useState(null);
    useEffect(() => {
        async function getNoteById() {
            try {
                const note = require('../../MockData/Note.json');
                setNote(note);
                console.log(note)
            } catch (error) {
                console.log(error);
            }
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