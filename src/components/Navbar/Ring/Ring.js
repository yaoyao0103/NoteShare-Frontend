import React, { useState, useEffect } from "react";
import { Dropdown, Menu, Avatar, Badge, Row, Col, Typography } from 'antd';
import { BellOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import './Ring.css';
import Cookie from "../../Cookies/Cookies";
import { Base64 } from 'js-base64';
import axios from "axios";
const { Paragraph } = Typography;
function Ring(props) {
    const [email, setEmail] = useState('a147896325811@gmail.com');
    const [ringList, setRingList] = useState([]);
    useEffect(() => {

        // let cookieParser = new Cookie(document.cookie);
        // let tempEmail = cookieParser.getCookieByName('email');
        // tempEmail = Base64.decode(tempEmail);
        // axios.get("http://localhost:8080/notification/" + tempEmail,).then(res => {
            
        // }).catch((error) => {
        //     //message.info(error.response.error);

        // })
        // setEmail(tempEmail);
       
    }, [props]);
    const [ellipsis, setEllipsis] = useState(true);
    const menu = (
        <Menu
            items={[
                {
                    key: '1',
                    label: (
                        <>  <Row>
                            <Col span={5} className={"Ring__Icon"}>
                                {/* <ExclamationCircleOutlined /> */}
                                <Avatar className={"Ring__Avatar"} size={36} src='https://joeschmoe.io/api/v1/james' onClick={() => props.setPageProps({page: 'ProfilePage', email: email})}></Avatar>
                            </Col>
                            <Col span={19}>
                                <Paragraph
                                    className={"Ring__Paragraph"}
                                    ellipsis={
                                        ellipsis
                                            ? {
                                                rows:3,
                                                expandable: false,
                                            }
                                            : false
                                    }
                                >
                                    1st menu item51165115151561 1223123123123123213123123123123
                                </Paragraph>

                            </Col>
                        </Row>



                        </>



                    ),
                },
                {
                    key: '2',
                    label: (
                        <>  <Row>
                            <Col span={5} className={"Ring__Icon"}>
                                {/* <ExclamationCircleOutlined /> */}
                                <Avatar className={"Ring__Avatar"} size={36} src='https://joeschmoe.io/api/v1/james' onClick={() => props.setPageProps({page: 'ProfilePage', email: email})}></Avatar>
                            </Col>
                            <Col span={19}>
                                <Paragraph
                                    className={"Ring__Paragraph"}
                                    ellipsis={
                                        ellipsis
                                            ? {
                                                rows:3,
                                                expandable: false,
                                            }
                                            : false
                                    }
                                >
                                    1st menu item51165115151561 1223123123123123213123123123123
                                </Paragraph>

                            </Col>
                        </Row>



                        </>
                    ),
                },
                {
                    key: '3',
                    label: (
                        <>  <Row>
                            <Col span={5} className={"Ring__Icon"}>
                                {/* <ExclamationCircleOutlined /> */}
                                <Avatar className={"Ring__Avatar"} size={36} src='https://joeschmoe.io/api/v1/james' onClick={() => props.setPageProps({page: 'ProfilePage', email: email})}></Avatar>
                            </Col>
                            <Col span={19}>
                                <Paragraph
                                    className={"Ring__Paragraph"}
                                    ellipsis={
                                        ellipsis
                                            ? {
                                                rows:3,
                                                expandable: false,
                                            }
                                            : false
                                    }
                                >
                                    1st menu item51165115151561 1223123123123123213123123123123
                                </Paragraph>

                            </Col>
                        </Row>



                        </>
                    ),
                },
            ]}
        />
    );
    return (
        <div>
            <Badge count={99} size="small" overflowCount={10} offset={[8, 8]}>
                <Dropdown
                    className='Ring__Dropdown'
                    overlay={menu}
                    overlayStyle={{ width: '300px',maxHeight:'200px',overflowY:'scroll',overflowX:'hidden' }}
                    trigger='click'
                    placement="bottom"

                >
                    <BellOutlined className='Ring__Bell__Button' style={{ fontSize: '28px' }} />
                </Dropdown>
            </Badge>
        </div>
    );
}
export default Ring;