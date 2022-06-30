import React, { useState, useEffect } from "react";
import { Dropdown, Menu, Avatar } from 'antd';
import { Base64 } from 'js-base64';
import { BellOutlined } from '@ant-design/icons';
import { UserOutlined, SettingOutlined, LogoutOutlined } from '@ant-design/icons';
import axios from "axios";

import './AvatarButton.css';
import Text from "../../Text/Text";
import Cookie from "../../Cookies/Cookies";

function AvatarButton(props) {
    const [email, setEmail] = useState('');
    const [avatar, setAvatar] = useState('');
    const [avatarNum, setAvatarNum] = useState(-1);
    const menu = (
        <Menu
            items={[
                {
                    key: '1',
                    label: (
                        <>
                            <UserOutlined style={{ color: "#555" }} />
                            <span className='AvatarButton__item__text'>
                                <a className='AvatarButton__item__text' onClick={() => props.setPageProps({ page: 'ProfilePage', email: email })}>
                                    <Text cls='Gerneral' fontSize='16' content={'Profile'} />
                                </a>
                            </span>
                        </>

                    ),
                },
                {
                    key: '2',
                    label: (
                        <>
                            <SettingOutlined style={{ color: "#555" }} />
                            <span className='AvatarButton__item__text'>
                                <Text cls='Gerneral' fontSize='16' content={'Setting'} />
                            </span>
                        </>
                    ),
                },
                {
                    key: '3',
                    label: (
                        <>
                            <LogoutOutlined style={{ color: "#555" }} />
                            <a className='AvatarButton__item__text' onClick={() => {
                                const cookieParser = new Cookie(document.cookie)
                                document.cookie = "email=";
                                props.setLoggedIn(false);
                                props.setPageProps({ page: 'LoginPage' });
                            }}>
                                <Text className='AvatarButton__item__text' cls='Gerneral' fontSize='16' content={'Logout'} />
                            </a>
                        </>
                    ),
                },
            ]}
        />
    );
    useEffect(() => {
        let cookieParser = new Cookie(document.cookie);
        let tempEmail = cookieParser.getCookieByName('email');
        tempEmail = Base64.decode(tempEmail);
        setEmail(tempEmail);
        //console.log(props.changeAvatar);
        //console.log(avatarNum);
        if (props.changeAvatar > avatarNum) {
            axios.get("http://localhost:8080/user/head/" + tempEmail,).then(res => {
                setAvatar(res.data.res);
                setAvatarNum(props.changeAvatar);
                //message.info('Change avatar');
            }).catch((error) => {
                //message.info(error.response.error);

            })
        }
    }, [props]);
    return (
        <div>
            <Dropdown
                overlayClassName='AvatarButton__Dropdown'
                overlay={menu}
                overlayStyle={{ width: '400px' }}
                trigger='click'
                placement="bottom"
            >
                <Avatar className="AvatarButton__Avatar" size={45} src={avatar}></Avatar>
            </Dropdown>

        </div>
    );
}
export default AvatarButton;