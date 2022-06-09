import React from 'react';
import PageDetailTemplate from '../../components/PageDetailTemplate/PageDetailTemplate'
import NewContentTemplate from '../../components/NewContentTemplate/NewContentTemplate';
function NewRewardPage(){
    const page = "NewQnAPage";

    return(
        <>
            <PageDetailTemplate page={page}>
                <NewContentTemplate page={page} type={"Reward"}/>
            </PageDetailTemplate>
        </>
        
    );
}
export default NewRewardPage;