import React, { useState } from "react";
import { Layout, Row, Col,Divider } from "antd";
import PropTypes from 'prop-types';
import Text from "../Text/Text";
import { Avatar } from 'antd';
import './Comment.css'
const { Header, Content, Sider } = Layout;
function Comment(props) {
    return (
        <div id='Comment'>
            <Row id='Comment__Titile__Row' className='Comment__Titile__Row'>
                <Col id='Comment__Titile' className="Comment__Titile" flex={3}><Text color='black' cls='Default' content={'Comment'} fontSize='38' display="inline-block" /></Col>
            </Row>
            <div className='Comment__Block'>
                <Avatar id="Comment__Avatar" className="Comment__Avatar" size={36}>{props.comments.author[0]}</Avatar>
                <Row id='Comment__Author__Row' className='Comment__Author__Row' >
                    <Col id='Comment__Author' className='Comment__Autho' flex={3}><Text color='black' cls='Small' content={props.comments.author} fontSize='15'></Text></Col>
                    <Col id='Comment__Date' className='Comment__Date' span={24}><Text color='black' cls='Small' content={props.comments.date} fontSize='12' display="inline-block" /></Col>
                </Row>
                <Row id='Comment__Main__Row' className='Content__Main__Row'>
                    <Col id='Comment__Main' className='Content__Main' >
                        <Text color='black' cls='Small' content={props.comments.content} fontSize='20' display="inline-block" />
                    </Col>
                </Row>
            </div>
            <Divider />
        </div>



    );
}
Comment.propTypes = {
    comments:PropTypes.object,
};
export default Comment;