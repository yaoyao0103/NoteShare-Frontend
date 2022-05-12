import React from 'react'
import { Typography } from 'antd';
const { Title } = Typography;

const Logo = () => {
    return (
        <div id='logo' className='logo'>
            <Text className='logo__left' color='black' size='2'>Note</Text>
            <Text className='logo__right' color='purple' size='2'>Share</Text>
        </div>
    )
}

export default Logo

// rafc