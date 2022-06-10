import React from 'react';
import PageDetailTemplate from '../../components/PageDetailTemplate/PageDetailTemplate'
import PostNewTemplate from '../../components/PostNewTemplate/PostNewTemplate';
function NewRewardPage(){
    const page = "NewQnAPage";

    return(
        <>
            <PageDetailTemplate page={page}>
                <PostNewTemplate page={page} type={"Reward"}/>
            </PageDetailTemplate>
        </>
        
    );
}
export default NewRewardPage;