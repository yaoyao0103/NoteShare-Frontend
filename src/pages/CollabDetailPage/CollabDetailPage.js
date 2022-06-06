import React, { useState, useEffect } from 'react';
import PageDetailTemplate from '../../components/PageDetailTemplate/PageDetailTemplate'
import PageDetailContentTemplate from '../../components/PageDetailContentTemplate/PageDetailContentTemplate';
function NoteDetailPage(){
    const [ note, setNote ] = useState();
    const noteId = "6262b61b3beec065d67999d0";
    const page = "CollabDetailPage";
    const [ isAuthor, setIsAuthor ] = useState(false);
    
    useEffect(() => {
        async function getNoteById() {
          try {
            const temp = require('./CollabNoteJson.json');
            setNote(temp);
          } catch (error) {
              console.log(error);
          }
        }
        getNoteById();
      }, [note]);
    return(
        <>
            <PageDetailTemplate page={page}>
                {isAuthor?
                    <PageDetailContentTemplate page={page} data={note} isAuthor={true}/>
                    :
                    <PageDetailContentTemplate page={page} data={note} isAuthor={false}/>
                }
                
            </PageDetailTemplate>
        </>
        
    );
}
export default NoteDetailPage;