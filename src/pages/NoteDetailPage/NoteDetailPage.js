import React, { useState, useEffect } from 'react';
import PageDetailTemplate from '../../components/PageDetailTemplate/PageDetailTemplate'
import PageDetailContentTemplate from '../../components/PageDetailContentTemplate/PageDetailContentTemplate';
function NoteDetailPage(){
    const [ note, setNote ] = useState();
    const noteId = "6262b61b3beec065d67999d0";
    const page = "NoteDetailPage";
    
    useEffect(() => {
        async function getNoteById() {
          try {
            const temp = require('./NoteJson.json');
            temp.author = temp.headerName;
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
            <PageDetailTemplate page={page}>
                <PageDetailContentTemplate page={page} data={note} hasEditor={true} hasComment={false} hasTag={true}/>
            </PageDetailTemplate>
        </>
        
    );
}
export default NoteDetailPage;