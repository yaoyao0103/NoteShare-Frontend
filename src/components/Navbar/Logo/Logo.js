import React from 'react'
 import "./Logo.css";
import Text from '../../Text/Text'
const Logo = () => {
    return (
        <div id='logo' className='logo'>
            <Text color='black' cls='large' content='Note' fontSize='30'/>
            <Text color='#8015e8' cls='large' content='Share'fontSize='30'/>
        </div>
    )
}

export default Logo
