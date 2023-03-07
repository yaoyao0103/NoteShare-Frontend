import React, { useState, useEffect } from 'react';
import { Row, Col, Avatar, Popconfirm } from "antd";
import PropTypes from 'prop-types';
import { UserAddOutlined } from '@ant-design/icons';
import Text from '../Text/Text';
import { message } from 'antd';
import './FansNFollowerEditor.css'
import axios from '../axios/axios';
import Cookie from '../Cookies/Cookies';
import { createMedia } from "@artsy/fresnel"
const cookieParser = new Cookie(document.cookie)
const { MediaContextProvider, Media } = createMedia({
    breakpoints: {
        sm: 0,
        lm: 391,
        md: 768,
        lg: 1024,
        xl: 1192,
    },
})
function FansNFollowerEditor(props) {
    const [isFollow, setIsFollow] = useState(true);
    const [isFans, setIsFans] = useState(true);
    const [followingNum, setFollowingNum] = useState(props.followingNum);
    const [fansNum, , setFansNum] = useState(props.fansNum);
    const [visible, setVisible] = useState(false);
    const removeFans = () => {
        if (!isFans) {
            axios.put("/follow/" + props.targetEmail + '/' + props.email, {}, {
                headers: {
                    'Authorization': 'Bearer ' + cookieParser.getCookieByName("token"),
                }
            }).then(res => {
                //setProfile(content);
                setIsFans(true);
                props.setFansNum(fansNum + 1);
                setFansNum(fansNum + 1);
                //message.success("You followed this user!")

                //message.info('Follow ' + user.name);
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
                    message.error('Server Error! Please refresh again! (Follow User Error)')
                }
                else {
                    message.error("Server Error! Please try again later. (Follow User Error)")
                }

            })
        }
        else {
            //console.log('props.targetEmail ', props.targetEmail)
            //console.log('props.email', props.email)
            axios.put("/unfollow/" + props.targetEmail + '/' + props.email, {}, {

                headers: {
                    'Authorization': 'Bearer ' + cookieParser.getCookieByName("token"),
                }
            }).then(res => {
                //setProfile(content);
                setIsFans(false);

                props.setFansNum(fansNum - 1);
                setFansNum(fansNum - 1);
                //message.success('You unfollowed this user!');
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
                    message.error('Server Error! Please refresh again! (Unfollow User Error)')
                }
                else {
                    message.error("Server Error! Please try again later. (Unfollow User Error)")
                }
            })
        }
    }
    const cancelFollowing = () => {
        if (!isFollow) {
            axios.put("/follow/" + props.email + '/' + props.targetEmail, {}, {

                headers: {
                    'Authorization': 'Bearer ' + cookieParser.getCookieByName("token"),
                }
            }).then(res => {
                //setProfile(content);

                setIsFollow(true);

                //console.log(followingNum);
                props.setFollowingNum(followingNum + 1);
                setFollowingNum(followingNum + 1);
                //message.success('You followed this user!');
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
                    message.error('Server Error! Please refresh again! (Follow User Error)')
                }
                else {
                    message.error("Server Error! Please try again later. (Follow User Error)")
                }

            })
        }
        else {
            axios.put("/unfollow/" + props.email + '/' + props.targetEmail, {}, {
                headers: {
                    'Authorization': 'Bearer ' + cookieParser.getCookieByName("token"),
                }
            }).then(res => {
                //setProfile(content);

                setIsFollow(false);

                //console.log(followingNum);
                props.setFollowingNum(followingNum - 1);
                setFollowingNum(followingNum - 1);
                //message.info('Unfollow ' + user.name);
            }).catch((error) => {
                //console.log(error.response.res);
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
                    message.error('Server Error! Please refresh again! (Unfollow User Error)')
                }
                else {
                    message.error('Server Error! Please try again later! (Unfollow User Error)')
                }
            })
        }
    }


    const handleOk = () => {
        removeFans();

        setVisible(false);

    };

    const handleCancel = () => {
        //message.info('Clicked cancel button');
        setVisible(false);
    };
    return (
        <MediaContextProvider >
            <Media at="xl" className='FansNFollowerEditor__Media'>
                <div className='FansNFollowerEditor'>

                    <Row className='FansNFollowerEditor__Row'>
                        <Col className='FansNFollowerEditor__Avatar' span={4}>
                            <Avatar className={"FansNFollowerEditor__Avatar__Inner"} size={48} src={"https://gravatar.com/avatar/7fdc37318319569a920fd7d087c14d1f?s=400&d=robohash&r=x"} onClick={() => { props.setPageProps({ page: 'ProfilePage', email: props.targetEmail }) }}></Avatar>
                        </Col>
                        <Col className='FansNFollowerEditor__Name' span={12}>
                            <Text cls='Small' fontSize={'22'} content={props.Name} />
                        </Col>
                        {props.isSwitch && isFans &&
                            <Popconfirm
                                title="Are you sure ?"
                                visible={visible}
                                onConfirm={handleOk}
                                onCancel={handleCancel}
                                okText="Yes"
                                cancelText="Cancel"
                            >


                                <Col className='FansNFollowerEditor__Fans' span={8} onClick={() => { setVisible(true); }}>
                                    {/* <UserAddOutlined className='Profile__Follow__Icon' style={{ fontSize: '22px' }} /> */}
                                    <Text className='FansNFollowerEditor__unFans' cls='Small' fontSize={'16'} content='Remove'></Text>
                                </Col >
                            </Popconfirm>}

                        {!props.isSwitch && isFollow &&
                            <Col className='FansNFollowerEditor__Fans' span={8} onClick={() => { cancelFollowing() }}>
                                {/* <UserAddOutlined className='Profile__Follow__Icon' style={{ fontSize: '22px' }} /> */}
                                <Text className='FansNFollowerEditor__unFans' cls='Small' fontSize={'16'} content='Following'></Text>
                            </Col >}
                        {!props.isSwitch && !isFollow &&
                            <Col className='FansNFollowerEditor__Fans__UnFollow' span={8} onClick={() => { cancelFollowing() }}>
                                {/* <UserAddOutlined className='Profile__Follow__Icon' style={{ fontSize: '22px' }} /> */}
                                <Text className='FansNFollowerEditor__unFans' cls='Small' fontSize={'16'} content='Follow' color={'white'}></Text>
                            </Col >}
                    </Row>

                </div>
            </Media>
            <Media at="lg" className='FansNFollowerEditor__Media'>
                <div className='FansNFollowerEditor'>

                    <Row className='FansNFollowerEditor__Row'>
                        <Col className='FansNFollowerEditor__Avatar' span={4}>
                            <Avatar className={"FansNFollowerEditor__Avatar__Inner"} size={48} src={"https://gravatar.com/avatar/7fdc37318319569a920fd7d087c14d1f?s=400&d=robohash&r=x"} onClick={() => { props.setPageProps({ page: 'ProfilePage', email: props.targetEmail }) }}></Avatar>
                        </Col>
                        <Col className='FansNFollowerEditor__Name' span={14}>
                            <Text cls='Small' fontSize={'22'} content={props.Name} />
                        </Col>
                        {props.isSwitch && isFans &&
                            <Popconfirm
                                title="Are you sure ?"
                                visible={visible}
                                onConfirm={handleOk}
                                onCancel={handleCancel}
                                okText="Yes"
                                cancelText="Cancel"
                            >


                                <Col className='FansNFollowerEditor__Fans' span={6} onClick={() => { setVisible(true); }}>
                                    {/* <UserAddOutlined className='Profile__Follow__Icon' style={{ fontSize: '22px' }} /> */}
                                    <Text className='FansNFollowerEditor__unFans' cls='Small' fontSize={'16'} content='Remove'></Text>
                                </Col >
                            </Popconfirm>}

                        {!props.isSwitch && isFollow &&
                            <Col className='FansNFollowerEditor__Fans' span={6} onClick={() => { cancelFollowing() }}>
                                {/* <UserAddOutlined className='Profile__Follow__Icon' style={{ fontSize: '22px' }} /> */}
                                <Text className='FansNFollowerEditor__unFans' cls='Small' fontSize={'16'} content='Following'></Text>
                            </Col >}
                        {!props.isSwitch && !isFollow &&
                            <Col className='FansNFollowerEditor__Fans__UnFollow' span={6} onClick={() => { cancelFollowing() }}>
                                {/* <UserAddOutlined className='Profile__Follow__Icon' style={{ fontSize: '22px' }} /> */}
                                <Text className='FansNFollowerEditor__unFans' cls='Small' fontSize={'16'} content='Follow' color={'white'}></Text>
                            </Col >}
                    </Row>

                </div>
            </Media>
            <Media at="md" className='FansNFollowerEditor__Media'>
                <div className='FansNFollowerEditor'>

                    <Row className='FansNFollowerEditor__Row'>
                        <Col className='FansNFollowerEditor__Avatar' span={4}>
                            <Avatar className={"FansNFollowerEditor__Avatar__Inner"} size={48} src={"https://gravatar.com/avatar/7fdc37318319569a920fd7d087c14d1f?s=400&d=robohash&r=x"} onClick={() => { props.setPageProps({ page: 'ProfilePage', email: props.targetEmail }) }}></Avatar>
                        </Col>
                        <Col className='FansNFollowerEditor__Name' span={12}>
                            <Text cls='Small' fontSize={'22'} content={props.Name} />
                        </Col>
                        {props.isSwitch && isFans &&
                            <Popconfirm
                                title="Are you sure ?"
                                visible={visible}
                                onConfirm={handleOk}
                                onCancel={handleCancel}
                                okText="Yes"
                                cancelText="Cancel"
                            >


                                <Col className='FansNFollowerEditor__Fans' span={8} onClick={() => { setVisible(true); }}>
                                    {/* <UserAddOutlined className='Profile__Follow__Icon' style={{ fontSize: '22px' }} /> */}
                                    <Text className='FansNFollowerEditor__unFans' cls='Small' fontSize={'16'} content='Remove'></Text>
                                </Col >
                            </Popconfirm>}

                        {!props.isSwitch && isFollow &&
                            <Col className='FansNFollowerEditor__Fans' span={8} onClick={() => { cancelFollowing() }}>
                                {/* <UserAddOutlined className='Profile__Follow__Icon' style={{ fontSize: '22px' }} /> */}
                                <Text className='FansNFollowerEditor__unFans' cls='Small' fontSize={'16'} content='Following'></Text>
                            </Col >}
                        {!props.isSwitch && !isFollow &&
                            <Col className='FansNFollowerEditor__Fans__UnFollow' span={8} onClick={() => { cancelFollowing() }}>
                                {/* <UserAddOutlined className='Profile__Follow__Icon' style={{ fontSize: '22px' }} /> */}
                                <Text className='FansNFollowerEditor__unFans' cls='Small' fontSize={'16'} content='Follow' color={'white'}></Text>
                            </Col >}
                    </Row>

                </div>
            </Media>
            <Media at="lm" className='FansNFollowerEditor__Media'>
                <div className='FansNFollowerEditor'>

                    <Row className='FansNFollowerEditor__Row'>
                        <Col className='FansNFollowerEditor__Avatar' span={4}>
                            <Avatar className={"FansNFollowerEditor__Avatar__Inner"} size={48} src={"https://gravatar.com/avatar/7fdc37318319569a920fd7d087c14d1f?s=400&d=robohash&r=x"} onClick={() => { props.setPageProps({ page: 'ProfilePage', email: props.targetEmail }) }}></Avatar>
                        </Col>
                        <Col className='FansNFollowerEditor__Name' span={12}>
                            <Text cls='Small' fontSize={'22'} content={props.Name} />
                        </Col>
                        {props.isSwitch && isFans &&
                            <Popconfirm
                                title="Are you sure ?"
                                visible={visible}
                                onConfirm={handleOk}
                                onCancel={handleCancel}
                                okText="Yes"
                                cancelText="Cancel"
                            >


                                <Col className='FansNFollowerEditor__Fans' span={8} onClick={() => { setVisible(true); }}>
                                    {/* <UserAddOutlined className='Profile__Follow__Icon' style={{ fontSize: '22px' }} /> */}
                                    <Text className='FansNFollowerEditor__unFans' cls='Small' fontSize={'16'} content='Remove'></Text>
                                </Col >
                            </Popconfirm>}

                        {!props.isSwitch && isFollow &&
                            <Col className='FansNFollowerEditor__Fans' span={8} onClick={() => { cancelFollowing() }}>
                                {/* <UserAddOutlined className='Profile__Follow__Icon' style={{ fontSize: '22px' }} /> */}
                                <Text className='FansNFollowerEditor__unFans' cls='Small' fontSize={'16'} content='Following'></Text>
                            </Col >}
                        {!props.isSwitch && !isFollow &&
                            <Col className='FansNFollowerEditor__Fans__UnFollow' span={8} onClick={() => { cancelFollowing() }}>
                                {/* <UserAddOutlined className='Profile__Follow__Icon' style={{ fontSize: '22px' }} /> */}
                                <Text className='FansNFollowerEditor__unFans' cls='Small' fontSize={'16'} content='Follow' color={'white'}></Text>
                            </Col >}
                    </Row>

                </div>
            </Media>
            <Media at="sm" className='FansNFollowerEditor__Media'>
                <div className='FansNFollowerEditor'>

                    <Row className='FansNFollowerEditor__Row'>
                        <Col className='FansNFollowerEditor__Avatar' span={4}>
                            <Avatar className={"FansNFollowerEditor__Avatar__Inner"} size={48} src={"https://gravatar.com/avatar/7fdc37318319569a920fd7d087c14d1f?s=400&d=robohash&r=x"} onClick={() => { props.setPageProps({ page: 'ProfilePage', email: props.targetEmail }) }}></Avatar>
                        </Col>
                        <Col className='FansNFollowerEditor__Name' span={12}>
                            <Text cls='Small' fontSize={'22'} content={props.Name} />
                        </Col>
                        {props.isSwitch && isFans &&
                            <Popconfirm
                                title="Are you sure ?"
                                visible={visible}
                                onConfirm={handleOk}
                                onCancel={handleCancel}
                                okText="Yes"
                                cancelText="Cancel"
                            >


                                <Col className='FansNFollowerEditor__Fans' span={8} onClick={() => { setVisible(true); }}>
                                    {/* <UserAddOutlined className='Profile__Follow__Icon' style={{ fontSize: '22px' }} /> */}
                                    <Text className='FansNFollowerEditor__unFans' cls='Small' fontSize={'16'} content='Remove'></Text>
                                </Col >
                            </Popconfirm>}

                        {!props.isSwitch && isFollow &&
                            <Col className='FansNFollowerEditor__Fans' span={8} onClick={() => { cancelFollowing() }}>
                                {/* <UserAddOutlined className='Profile__Follow__Icon' style={{ fontSize: '22px' }} /> */}
                                <Text className='FansNFollowerEditor__unFans' cls='Small' fontSize={'16'} content='Following'></Text>
                            </Col >}
                        {!props.isSwitch && !isFollow &&
                            <Col className='FansNFollowerEditor__Fans__UnFollow' span={8} onClick={() => { cancelFollowing() }}>
                                {/* <UserAddOutlined className='Profile__Follow__Icon' style={{ fontSize: '22px' }} /> */}
                                <Text className='FansNFollowerEditor__unFans' cls='Small' fontSize={'16'} content='Follow' color={'white'}></Text>
                            </Col >}
                    </Row>

                </div>
            </Media>

        </MediaContextProvider>
    );
}
FansNFollowerEditor.propTypes = {
    Name: PropTypes.string,
    Avatar: PropTypes.string,
    isFans: PropTypes.bool,
};
FansNFollowerEditor.defaultProps = {
    isFans: true,
};
export default FansNFollowerEditor;