import React, { useState, useEffect } from "react";
import { message, Dropdown, Menu, Avatar, Badge, Row, Col, Typography } from 'antd';
import { BellOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import './Ring.css';
import Cookie from "../../Cookies/Cookies";
import { Base64 } from 'js-base64';
import axios from "axios";
const { Paragraph } = Typography;
const cookieParser = new Cookie(document.cookie);
function Ring(props) {
    const [email, setEmail] = useState('');
    
    const [ringList, setRingList] = useState([]);
    const [render, setRender] = useState(false);
    useEffect(() => {
        setRingList(oldArray => [...oldArray.slice(0,0) ]);
        
        let tempEmail = cookieParser.getCookieByName('email');
        tempEmail = Base64.decode(tempEmail);
        setEmail(tempEmail);
        //console.log(tempEmail)
        axios.get("http://localhost:8080/notification/" + tempEmail,{
            headers: {
                'Authorization': 'Bearer ' + cookieParser.getCookieByName("token"),
              }
        }).then(res => {
            //console.log(res.data.notification);
            props.setRingNumber(res.data.notification.unreadMessageCount);
            props.setRingList(oldArray => [...res.data.notification.messageReturn,...oldArray.slice(0,0) ])
        }).catch((error) => {
            message.error("Server Error! Please try again later. (Get Notification Error)")
            //message.info(error.response.error);

        })
        

    }, []);
    useEffect(() => {
            //console.log(props.ringList)
            setRingList(oldArray=> [...oldArray.slice(0,0) ])
            for (let i = 0; i < props.ringList.length; i++) {
                let type=props.ringList[i].type
                
                if(props.ringList[i].type==='note'||props.ringList[i].type==='normal'){
                    type='NoteDetailPage';
                }
                else if(props.ringList[i].type==='qa'){
                    type='QnADetailPage';
                }
                else if(props.ringList[i].type==='reward'){
                    type='RewardDetailPage';
                }
                else if(props.ringList[i].type==='collaboration'){
                    type='CollabDetailPage';
                }

                let tempItem = {
                    label: (
                        <>  <Row onClick={() => props.setPageProps({ page: type, noteId: props.ringList[i].id, postId: props.ringList[i].id, email: props.ringList[i].userObj.userObjEmail })}>
                            <Col span={5} className={"Ring__Icon"}>
                                {/* <ExclamationCircleOutlined /> */}
                                <Avatar className={"Ring__Avatar"} size={36} src={props.ringList[i].userObj.userObjAvatar} ></Avatar>
                            </Col>
                            <Col span={19}>
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

                            </Col>
                        </Row>
                        </>
                    ),
                }
                setRingList(oldArray => [tempItem,...oldArray ]);
               
            }
            setRender(true)
    }, [props.ringList]);
    const [ellipsis, setEllipsis] = useState(true);
    const setUnReadNumZero=()=>{
        
        axios.put("http://localhost:8080/notification/unreadMessage/" + email,{
            headers: {
                'Authorization': 'Bearer ' + cookieParser.getCookieByName("token"),
              }
        }).then(res => {
            console.log('ring')
            props.setRingNumber(0);
        }).catch((error) => {
            //message.info(error.response.error);

        })
    }
    return (
        <>
            {render &&
                <div>
                    <Badge count={props.ringNumber} size="small" overflowCount={10} offset={[8, 8]}>
                        <Dropdown
                            className='Ring__Dropdown'
                            overlay={(
                                <Menu
                                    items={ringList} />
                            )}
                            overlayStyle={{ width: '300px', maxHeight: '200px', overflowY: 'scroll', overflowX: 'hidden' }}
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