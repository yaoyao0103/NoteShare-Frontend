import React from 'react'
import { Link } from "react-router-dom";
import "./Logo.css";
import Text from '../../Text/Text'
const Logo = () => {
    return (
        <div id='logo' className='logo'>
            <Link to={'/'}>
                <Text color='black' cls='Large' content='Note' fontSize='28'/>
                <Text color='purple' cls='Large' content='Share'fontSize='28'/>
            </Link>        
        </div>
    )
}

export default Logo
