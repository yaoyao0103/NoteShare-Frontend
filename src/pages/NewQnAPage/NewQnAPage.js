import React from 'react';
import PageDetailTemplate from '../../components/PageDetailTemplate/PageDetailTemplate'
import NewContentTemplate from '../../components/NewContentTemplate/NewContentTemplate';
function NewQnAPage(){
    const page = "NewQnAPage";

    return(
        <>
            <PageDetailTemplate page={page}>
                <NewContentTemplate page={page} type={"QnA"}/>
            </PageDetailTemplate>
        </>
        
    );
}
export default NewQnAPage;