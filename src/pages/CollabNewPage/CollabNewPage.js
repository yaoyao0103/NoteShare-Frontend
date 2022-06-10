import React from 'react';
import PageDetailTemplate from '../../components/PageDetailTemplate/PageDetailTemplate'
import PostNewTemplate from '../../components/PostNewTemplate/PostNewTemplate';
function NewCollabPage(){
    const page = "NewQnAPage";

    return(
        <>
            <PageDetailTemplate page={page}>
                <PostNewTemplate page={page} type={"CollabNote"}/>
            </PageDetailTemplate>
        </>
        
    );
}
export default NewCollabPage;