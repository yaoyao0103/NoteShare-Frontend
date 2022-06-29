import React from "react";
import { Dropdown, Menu,Avatar} from 'antd';
import { BellOutlined} from '@ant-design/icons';
import { UserOutlined, SettingOutlined, LogoutOutlined } from '@ant-design/icons';

import './AvatarButton.css';
import Text from "../../Text/Text";
import Cookie from "../../Cookies/Cookies";

function AvatarButton(props) {
    const menu = (
        <Menu
            items={[
                {
                    key: '1',
                    label: (
                        <>
                        <UserOutlined style={{color:"#555"}}/>
                        <span className='AvatarButton__item__text'>
                            <a className='AvatarButton__item__text' onClick={() => props.setPageProps({page:'ProfilePage'})}>
                                <Text cls='Gerneral' fontSize='16'content={'Profile'}/>
                            </a> 
                        </span>
                        </> 
                        
                    ),
                },
                {
                    key: '2',
                    label: (
                        <>
                        <SettingOutlined style={{color:"#555"}}/>
                        <span className='AvatarButton__item__text'>
                            <Text cls='Gerneral' fontSize='16'content={'Setting'}/>
                        </span>
                        </> 
                    ),
                },
                {
                    key: '3',
                    label: (
                        <>
                            <LogoutOutlined style={{color:"#555"}}/>
                            <a className='AvatarButton__item__text' onClick={() => {
                                const cookieParser = new Cookie(document.cookie)
                                document.cookie = "email=";
                                props.setLoggedIn(false);
                                props.setPageProps({page:'LoginPage'});
                                }}>
                                <Text className='AvatarButton__item__text' cls='Gerneral' fontSize='16'content={'Logout'}/>
                            </a> 
                        </>
                    ),
                },
            ]}
        />
    );
    return (
        <div>
            <Dropdown
                overlayClassName='AvatarButton__Dropdown'
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