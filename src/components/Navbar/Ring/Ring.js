import React, { useState, useEffect } from "react";
import { message, Dropdown, Menu, Avatar, Badge, Row, Col, Typography } from 'antd';
import { BellOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import './Ring.css';
import Cookie from "../../Cookies/Cookies";
import { Base64 } from 'js-base64';
import axios from "../../axios/axios";
const { Paragraph } = Typography;
const cookieParser = new Cookie(document.cookie);
function Ring(props) {
    const [email, setEmail] = useState('');

    const [ringList, setRingList] = useState([]);
    const [render, setRender] = useState(false);
    useEffect(() => {
        setRingList(oldArray => [...oldArray.slice(0, 0)]);

        let tempEmail = cookieParser.getCookieByName('email');
        if (tempEmail)
            tempEmail = Base64.decode(tempEmail);
        setEmail(tempEmail);
        //console.log(tempEmail)
        axios.get("/notification/" + tempEmail, {
            headers: {
                'Authorization': 'Bearer ' + cookieParser.getCookieByName("token"),
            }
        }).then(res => {
            //console.log(res.data.notification);
            props.setRingNumber(res.data.notification.unreadMessageCount);
            props.setRingList(oldArray => [...res.data.notification.messageReturn, ...oldArray.slice(0, 0)])
        }).catch((error) => {
            if (error.response.status === 500 || error.response.status === 404 || error.response.status === 403) {
                if (error.response.data.message.slice(0, 13) === 'Malformed JWT') {
                    document.cookie = 'error=Jwt'
                    message.destroy()
                    message.warning('The connection timed out, please login again !')
                    document.cookie = 'email=;'
                    props.setLoggedIn(false)
                    props.setPageProps({ page: 'LoginPage' })
                }
                else
                    document.cookie = 'error=true'
                message.error('Server Error! Please refresh again!  (Get Notification Error)')
            }
            else {
                message.error("Server Error! Please try again later. (Get Notification Error)")
            }

        })


    }, []);
    useEffect(() => {
        //console.log(props.ringList)
        setRingList(oldArray => [...oldArray.slice(0, 0)])
        for (let i = 0; i < props.ringList.length; i++) {
            let type = props.ringList[i].type
            if (props.ringList[i].type === 'note' || props.ringList[i].type === 'normal') {
                type = 'NoteDetailPage';
            }
            else if (props.ringList[i].type === 'qa') {
                type = 'QnADetailPage';
            }
            else if (props.ringList[i].type === 'reward') {
                type = 'RewardDetailPage';
            }
            else if (props.ringList[i].type === 'collaboration') {
                type = 'CollabDetailPage';
            }

            let tempItem = {
                label: (
                    <>  
                    <div onClick={() => { if (props.ringList[i].userObj.userObjEmail !== 'noteshare@gmail.com') props.setPageProps({ page: type, noteId: props.ringList[i].id, postId: props.ringList[i].id, email: props.ringList[i].userObj.userObjEmail }) }}>
                        <div className={"Ring__Icon"}>
                            {/* <ExclamationCircleOutlined /> */}
                            <Avatar className={"Ring__Avatar"} size={36} src={"https://gravatar.com/avatar/7fdc37318319569a920fd7d087c14d1f?s=400&d=robohash&r=x"} ></Avatar>
                        </div>
                        <div>
                            <Paragraph
                                className={"Ring__Paragraph"}
                                ellipsis={
                                    ellipsis
                                        ? {
                                            rows: 3,
                                            expandable: false,
                                        }
                                        : false
                                }
                            >
                                {props.ringList[i].message}
                            </Paragraph>

                        </div>
                    </div>
                    </>
                ),
            }
            setRingList(oldArray => [tempItem, ...oldArray]);

        }
        setRender(true)
    }, [props.ringList]);
    const [ellipsis, setEllipsis] = useState(true);
    const setUnReadNumZero = () => {
       
        axios.put("/notification/unreadMessage/" + email, {}, {
            headers: {
                'Authorization': 'Bearer ' + cookieParser.getCookieByName("token")
            }
        }).then(res => {
          
            props.setRingNumber(0);
        }).catch((error) => {
            console.log(error);
            if (error.response.status === 500 || error.response.status === 404 || error.response.status === 403) {
                if (error.response.data.message.slice(0, 13) === 'Malformed JWT') {
                    document.cookie = 'error=Jwt'
                    message.destroy()
                    message.warning('The connection timed out, please login again !')
                    document.cookie = 'email=;'
                    props.setLoggedIn(false)
                    props.setPageProps({ page: 'LoginPage' })
                }
                else
                    document.cookie = 'error=true'
                message.error('Server Error! Please refresh again!')
            }
            else {
                message.error("Server Error! Please try again later.")
            }

        })
    }
    return (
        <>
            {render &&
                <div className="Ring__Container">
                    <Badge count={props.ringNumber} size="small" overflowCount={10} offset={[8, 8]}>
                        <Dropdown
                            className='Ring__Dropdown'
                            overlay={(
                                <Menu
                                    items={ringList} />
                            )}
                            overlayStyle={{ width: '300px', maxHeight: '230px', overflowY: 'scroll', overflowX: 'hidden', boxShadow: "rgba(0, 0, 0, 0.1) 0px 1px 10px 0px" }}
                            trigger='click'
                            placement="bottom"
                            onClick={setUnReadNumZero}

                        >
                            <BellOutlined className='Ring__Bell__Button' style={{ fontSize: '28px' }} />
                        </Dropdown>
                    </Badge>
                </div>
            }
        </>
    );
}
export default Ring;