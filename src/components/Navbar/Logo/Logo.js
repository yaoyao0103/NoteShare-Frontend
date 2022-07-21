import React from 'react'
import { Link } from "react-router-dom";
import "./Logo.css";
import Text from '../../Text/Text'
const Logo = (props) => {

    return (
        <div className='logo' onClick={()=>{props.setPageProps({page:'MemberPage',pageNumber:1})}}>
                <Text color='black' cls='Large' content='Note' fontSize='28'/>
                <Text color='purple' cls='Large' content='Share'fontSize='28'/>                
        </div>
    )
}

export default Logo
