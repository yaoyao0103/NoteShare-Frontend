import React, { useState, useEffect } from 'react';
import { Row, Col, Avatar } from "antd";
import PropTypes from 'prop-types';
import { UserAddOutlined} from '@ant-design/icons';
import Text from '../Text/Text';
import { message } from 'antd';
import './FansNFollowerEditor.css'
function FansNFollowerEditor(props) {

    return (
        <div className='FansNFollowerEditor'>
            <Row className='FansNFollowerEditor__Row'>
                <Col className='FansNFollowerEditor__Avatar' span={4}>
                    <Avatar className={"Profile__Avatar__Inner"} size={48} src={props.Avatar}></Avatar>
                </Col>
                <Col className='FansNFollowerEditor__Name' span={15}>
                    <Text cls='Small' fontSize={'22'} content={props.Name} />
                </Col>
                {props.isFans&& <Col className='FansNFollowerEditor__Fans' span={5}>
                    {/* <UserAddOutlined className='Profile__Follow__Icon' style={{ fontSize: '22px' }} /> */}
                    <Text className='FansNFollowerEditor__unFans' cls='Small' fontSize={'16'} content='移除'></Text>
                </Col >}
                {!props.isFans&& <Col className='FansNFollowerEditor__Fans' span={5}>
                    {/* <UserAddOutlined className='Profile__Follow__Icon' style={{ fontSize: '22px' }} /> */}
                    <Text className='FansNFollowerEditor__unFans' cls='Small' fontSize={'16'} content='追蹤中'></Text>
                </Col >}
            </Row>
        </div>
    );
}
FansNFollowerEditor.propTypes = {
    Name: PropTypes.string,
    Avatar: PropTypes.string,
    isFans:PropTypes.bool,
};
FansNFollowerEditor.defaultProps = {
    isFans:true,
};
export default FansNFollowerEditor;