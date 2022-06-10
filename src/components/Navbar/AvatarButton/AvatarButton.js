import React from "react";
import { Dropdown, Menu,Avatar} from 'antd';
import { BellOutlined} from '@ant-design/icons';
import './AvatarButton.css';
import Text from "../../Text/Text";

function AvatarButton(props) {
    const menu = (
        <Menu
            items={[
                {
                    key: '1',
                    label: (
                        <>
                        <Text className='AvatarButton__item__text' cls='Gerneral' fontSize='16'content={'Profile'}/>
                        </> 
                           
                       
                        
                    ),
                },
                {
                    key: '2',
                    label: (
                        <>
                        <Text className='AvatarButton__item__text' cls='Gerneral' fontSize='16'content={'Setting'}/>
                        </> 
                    ),
                },
                {
                    key: '3',
                    label: (
                        <a onClick={() => props.setLoggedIn(false)}>
                            <Text className='AvatarButton__item__text' cls='Gerneral' fontSize='16'content={'Logout'}/>
                        </a> 
                    ),
                },
            ]}
        />
    );
    return (
        <div>
            <Dropdown
                className='AvatarButton__Dropdown'
                overlay={menu}
                overlayStyle={{width: '400px'}}
                trigger='click'
                placement="bottom"
            >
                <Avatar className="AvatarButton__Avatar" size={45} src="https://joeschmoe.io/api/v1/random"></Avatar>
            </Dropdown>

        </div>
    );
}
export default AvatarButton;