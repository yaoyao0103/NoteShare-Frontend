import React, { useState, useEffect } from 'react';
import PageDetailTemplate from '../../components/PageDetailTemplate/PageDetailTemplate'
import PageDetailContentTemplate from '../../components/PageDetailContentTemplate/PageDetailContentTemplate';
function NoteDetailPage(){
    const [ note, setNote ] = useState();
    const noteId = "6262b61b3beec065d67999d0";
    
    useEffect(() => {
        async function getNoteById() {
          try {
            const temp = require('./noteTestJson.json');
            temp.author = temp.authorName[0];
            temp.date = temp.version[0].date;
            setNote(temp);
          } catch (error) {
              console.log(error);
          }
        }
        getNoteById();
      }, [note]);
    return(
        <>
            <PageDetailTemplate page="NoteDetailPage">
                <PageDetailContentTemplate data={note} hasEditor={true} noteId={noteId} hasComment={false} hasTag={true}/>
            </PageDetailTemplate>
        </>
        
    );
}
export default NoteDetailPage;