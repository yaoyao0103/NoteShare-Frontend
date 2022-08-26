import React from 'react'
import { Link } from "react-router-dom";
import "./Logo.css";
import Text from '../../Text/Text'
const Logo = (props) => {

    return (
        <div className='logo' onClick={()=>{props.setPageProps({page:'MemberPage',pageNumber:1,sortMode:'likeCount'})}}>
            <div className='logo__Inner'>
                <Text color='black' cls='Large' content='Note' fontSize='1.4em'/>
                <Text color='purple' cls='Large' content='Share'fontSize='1.4em'/>  
            </div>

        </div>
    )
}

export default Logo
