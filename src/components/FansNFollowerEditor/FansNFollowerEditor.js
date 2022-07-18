import React, { useState, useEffect } from 'react';
import { Row, Col, Avatar, Popconfirm } from "antd";
import PropTypes from 'prop-types';
import { UserAddOutlined } from '@ant-design/icons';
import Text from '../Text/Text';
import { message } from 'antd';
import './FansNFollowerEditor.css'
import axios from "axios";
function FansNFollowerEditor(props) {
    const [isFollow, setIsFollow] = useState(true);
    const [isFans, setIsFans] = useState(true);
    const [followingNum, setFollowingNum] = useState(props.followingNum);
    const [fansNum, , setFansNum] = useState(props.fansNum);
    const [visible, setVisible] = useState(false);
    const removeFans = () => {
        if (!isFans) {
            axios.put("http://localhost:8080/follow/" + props.targetEmail + '/' + props.email,).then(res => {
                //setProfile(content);
                setIsFans(true);
                props.setFansNum(fansNum + 1);
                setFansNum(fansNum + 1);
                message.success("You followed this user!")

                //message.info('Follow ' + user.name);
            }).catch((error) => {
                message.error("Server Error! Please try again later. (Follow User Error)")
                console.log(error.response.error);

            })
        }
        else {
            console.log('props.targetEmail ', props.targetEmail)
            console.log('props.email', props.email)
            axios.put("http://localhost:8080/unfollow/" + props.targetEmail + '/' + props.email,).then(res => {
                //setProfile(content);
                setIsFans(false);

                props.setFansNum(fansNum - 1);
                setFansNum(fansNum - 1);
                message.success('You unfollowed this user!');
            }).catch((error) => {
                message.error("Server Error! Please try again later. (Unfollow User Error)")
                console.log(error.response);
            })
        }
    }
    const cancelFollowing = () => {
        if (!isFollow) {
            axios.put("http://localhost:8080/follow/" + props.email + '/' + props.targetEmail,).then(res => {
                //setProfile(content);

                setIsFollow(true);

                console.log(followingNum);
                props.setFollowingNum(followingNum + 1);
                setFollowingNum(followingNum + 1);
                message.success('You followed this user!');
            }).catch((error) => {
                message.error("Server Error! Please try again later. (Follow User Error)")
                console.log(error.response);

            })
        }
        else {
            axios.put("http://localhost:8080/unfollow/" + props.email + '/' + props.targetEmail,).then(res => {
                //setProfile(content);

                setIsFollow(false);

                console.log(followingNum);
                props.setFollowingNum(followingNum - 1);
                setFollowingNum(followingNum - 1);
                //message.info('Unfollow ' + user.name);
            }).catch((error) => {
                console.log(error.response.res);
            })
        }
    }


    const handleOk = () => {
        removeFans();
        
          setVisible(false);
       
      };
    
      const handleCancel = () => {
        message.info('Clicked cancel button');
        setVisible(false);
      };
    return (
        <div className='FansNFollowerEditor'>
            <Row className='FansNFollowerEditor__Row'>
                <Col className='FansNFollowerEditor__Avatar' span={4}>
                    <Avatar className={"FansNFollowerEditor__Avatar__Inner"} size={48} src={props.Avatar} onClick={() => { props.setPageProps({ page: 'ProfilePage', email: props.targetEmail }) }}></Avatar>
                </Col>
                <Col className='FansNFollowerEditor__Name' span={15}>
                    <Text cls='Small' fontSize={'22'} content={props.Name} />
                </Col>
                {props.isSwitch && isFans &&
                    <Popconfirm
                        title="Are you sure ?"
                        visible={visible}
                        onConfirm={handleOk}
                        onCancel={ handleCancel}
                        okText="Yes"
                        cancelText="Cancel"
                    >
                       

                        <Col className='FansNFollowerEditor__Fans' span={5} onClick={() => {  setVisible(true); }}>
                            {/* <UserAddOutlined className='Profile__Follow__Icon' style={{ fontSize: '22px' }} /> */}
                            <Text className='FansNFollowerEditor__unFans' cls='Small' fontSize={'16'} content='移除'></Text>
                        </Col >
                    </Popconfirm>}

                {!props.isSwitch && isFollow &&
                    <Col className='FansNFollowerEditor__Fans' span={5} onClick={() => { cancelFollowing() }}>
                        {/* <UserAddOutlined className='Profile__Follow__Icon' style={{ fontSize: '22px' }} /> */}
                        <Text className='FansNFollowerEditor__unFans' cls='Small' fontSize={'16'} content='追蹤中'></Text>
                    </Col >}
                {!props.isSwitch && !isFollow &&
                    <Col className='FansNFollowerEditor__Fans__UnFollow' span={5} onClick={() => { cancelFollowing() }}>
                        {/* <UserAddOutlined className='Profile__Follow__Icon' style={{ fontSize: '22px' }} /> */}
                        <Text className='FansNFollowerEditor__unFans' cls='Small' fontSize={'16'} content='追蹤' color={'white'}></Text>
                    </Col >}
            </Row>
        </div>
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