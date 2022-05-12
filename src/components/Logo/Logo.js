import React from 'react'
import { Typography } from 'antd';
const { Title } = Typography;

const Logo = () => {
    return (
        <div id='logo' className='logo'>
            <Title className='logo__left' color='black' size='2'>Note</Title>
            <Title className='logo__right' color='purple' size='2'>Share</Title>
        </div>
    )
}

export default Logo

// rafc