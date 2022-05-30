import React from 'react'
 import "./Logo.css";
import Text from '../../Text/Text'
const Logo = () => {
    return (
        <div id='logo' className='logo' >
            <Text color='black' cls='Large' content='Note' fontSize='32'/>
            <Text color='#8015e8' cls='Large' content='Share'fontSize='32'/>
        </div>
    )
}

export default Logo
