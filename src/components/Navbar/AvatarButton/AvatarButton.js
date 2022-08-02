import React, { useState, useEffect } from "react";
import { Dropdown, Menu, Avatar, message } from 'antd';
import { Base64 } from 'js-base64';
import { BellOutlined } from '@ant-design/icons';

import { UserOutlined, SettingOutlined, LogoutOutlined } from '@ant-design/icons';
import axios from "axios";

import './AvatarButton.css';
import Text from "../../Text/Text";
import Cookie from "../../Cookies/Cookies";
const cookieParser=new Cookie(document.cookie)
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
        if(tempEmail)
            tempEmail = Base64.decode(tempEmail);
        setEmail(tempEmail);
        axios.get("http://localhost:8080/user/name/" + tempEmail,{
            headers: {
                'Authorization': 'Bearer ' + cookieParser.getCookieByName("token"),
              }
        }).then(res => {
            document.cookie = "name=" + res.data.res;
        }).catch((error) => {
            //console.log(error.response.data.message);
            if (error.response.status === 500 || error.response.status === 404||error.response.status === 403){
                if(error.response.data.message.slice(0,13)==='Malformed JWT')
                document.cookie = 'error=Jwt'
                else
                document.cookie = 'error=true'
                message.error('Server Error! Please refresh again! (Get user name error)')
            }
            else{
                message.error('Server Error! Please try again later! (Get user name error)')
            }
           
        });
        //console.log(props.changeAvatar);
        //console.log(avatarNum);
        if (props.changeAvatar > avatarNum) {
            axios.get("http://localhost:8080/user/head/" + tempEmail,{
                headers: {
                    'Authorization': 'Bearer ' + cookieParser.getCookieByName("token"),
                  }
            }).then(res => {
                setAvatar(res.data.res);
                setAvatarNum(props.changeAvatar);
                document.cookie = "avatar=" + res.data.res;
                //message.info('Change avatar');
                
            }).catch((error) => {
                if (error.response.status === 500 || error.response.status === 404||error.response.status === 403){
                    if(error.response.data.message.slice(0,13)==='Malformed JWT')
                    document.cookie = 'error=Jwt'
                    else
                    document.cookie = 'error=true'
                    message.error('Server Error! Please refresh again! (Get user avatar error)')
                }
                else{
                    message.error('Server Error! Please try again later! (Get user avatar error)')
                }
            })
        }
    }, [props]);
    return (
        <div>
            <Dropdown
                overlayClassName='AvatarButton__Dropdown'
                overlay={menu}

                trigger='click'
                placement="bottom"
            >
                <Avatar className="AvatarButton__Avatar" size={45} src={avatar}></Avatar>
            </Dropdown>

        </div>
    );
}
export default AvatarButton;