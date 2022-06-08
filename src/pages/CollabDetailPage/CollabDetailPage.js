import React, { useState, useEffect } from 'react';
import PageDetailTemplate from '../../components/PageDetailTemplate/PageDetailTemplate'
import PageDetailContentTemplate from '../../components/PageDetailContentTemplate/PageDetailContentTemplate';
function NoteDetailPage(){
    const [ note, setNote ] = useState();
    const noteId = "6262b61b3beec065d67999d0";
    const page = "CollabDetailPage";
    const [ isAuthor, setIsAuthor ] = useState(true);
    const [ isManager, setIsManager ] = useState(false);
    
    useEffect(() => {
        async function getCollabById() {
            try {
            const temp = require('./CollabNoteJson.json');
            setNote(temp);
            } catch (error) {
                console.log(error);
            }
        }
        getCollabById();
        }, []);
    return(
        <>
            <PageDetailTemplate page={page}>
                <PageDetailContentTemplate page={page} data={note} isAuthor={isAuthor} isManager={isManager}/>
            </PageDetailTemplate>
        </>
        
    );
}
export default NoteDetailPage;