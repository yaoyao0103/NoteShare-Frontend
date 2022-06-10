import React from 'react';
import PageDetailTemplate from '../../components/PageDetailTemplate/PageDetailTemplate'
import PostNewTemplate from '../../components/PostNewTemplate/PostNewTemplate';
function NewQnAPage(){
    const page = "CollabEditPage";

    return(
        <>
            <PageDetailTemplate page={page}>
                <PostNewTemplate page={page} type={"QnA"}/>
            </PageDetailTemplate>
        </>
        
    );
}
export default NewQnAPage;