import React from 'react';
import PageDetailTemplate from '../../components/PageDetailTemplate/PageDetailTemplate'
import NewContentTemplate from '../../components/NewContentTemplate/NewContentTemplate';
function NewCollabPage(){
    const page = "NewQnAPage";

    return(
        <>
            <PageDetailTemplate page={page}>
                <NewContentTemplate page={page} type={"CollabNote"}/>
            </PageDetailTemplate>
        </>
        
    );
}
export default NewCollabPage;