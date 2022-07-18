import React, { useState, useEffect } from "react";
import { message, Dropdown, Menu, Avatar, Badge, Row, Col, Typography } from 'antd';
import { BellOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import './Ring.css';
import Cookie from "../../Cookies/Cookies";
import { Base64 } from 'js-base64';
import axios from "axios";
const { Paragraph } = Typography;
function Ring(props) {
    const [email, setEmail] = useState('');
    const [unReadNum,setUnReadNum]=useState(0);
    const [ringList, setRingList] = useState([]);
    const [render, setRender] = useState(false);
    useEffect(() => {

        let cookieParser = new Cookie(document.cookie);
        let tempEmail = cookieParser.getCookieByName('email');
        tempEmail = Base64.decode(tempEmail);
        setEmail(tempEmail);
        console.log(tempEmail)
        axios.get("http://localhost:8080/notification/" + tempEmail,).then(res => {
            console.log(res.data.notification.messageReturn);
            setUnReadNum(res.data.notification.unreadMessageCount);
           
            
            for (let i = 0; i < res.data.notification.messageReturn.length; i++) {
                let type=res.data.notification.messageReturn[i].type

                if(res.data.notification.messageReturn[i].type==='note'||res.data.notification.messageReturn[i].type==='normal'){
                    type='NoteDetailPage';
                }
                else if(res.data.notification.messageReturn[i].type==='qa'){
                    type='QnADetailPage';
                }
                else if(res.data.notification.messageReturn[i].type==='reward'){
                    type='RewardDetailPage';
                }
                else if(res.data.notification.messageReturn[i].type==='collaboration'){
                    type='CollabDetailPage';
                }

                let tempItem = {
                    key: i + 1,
                    label: (
                        <>  <Row onClick={() => props.setPageProps({ page: type, noteId: res.data.notification.messageReturn[i].id, postId: res.data.notification.messageReturn[i].id, email: res.data.notification.messageReturn[i].userObj.userObjEmail })}>
                            <Col span={5} className={"Ring__Icon"}>
                                {/* <ExclamationCircleOutlined /> */}
                                <Avatar className={"Ring__Avatar"} size={36} src={res.data.notification.messageReturn[i].userObj.userObjAvatar} ></Avatar>
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
                                    {res.data.notification.messageReturn[i].message}
                                </Paragraph>

                            </Col>
                        </Row>
                        </>
                    ),
                }
                
                setRingList(oldArray => [tempItem,...oldArray ]);
            }
            
            setRender(true)
        }).catch((error) => {
            message.error("Server Error! Please try again later. (Get Notification Error)")
            //message.info(error.response.error);

        })
        

    }, []);
    const [ellipsis, setEllipsis] = useState(true);
    const setUnReadNumZero=()=>{
        
        axios.put("http://localhost:8080/notification/unreadMessage/" + email,).then(res => {
            setUnReadNum(0);
        }).catch((error) => {
            //message.info(error.response.error);

        })
    }
    return (
        <>
            {render &&
                <div>
                    <Badge count={unReadNum} size="small" overflowCount={10} offset={[8, 8]}>
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