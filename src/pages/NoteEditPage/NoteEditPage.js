import React, { useEffect, useState } from 'react';
import PageDetailTemplate from '../../components/PageDetailTemplate/PageDetailTemplate'
import NoteEditTemplate from '../../components/NoteEditTemplate/NoteEditTemplate';
function NoteEditPage(){
    const page = "NoteEditPage";

    /*useEffect(() => {
        async function getCollabNoteById() {
            try {
                const post = require('../../MockData/CollabNote.json');
                setPost(post);
                console.log(post)
            } catch (error) {
                console.log(error);
            }
        }
        if(mode=="Edit"){
            getCollabNoteById();
        }
        
        }, []);*/

    return(
        <>
            <PageDetailTemplate page={page}>
                <NoteEditTemplate page={page} />
            </PageDetailTemplate>
        </>
        
    );
}
export default NoteEditPage;