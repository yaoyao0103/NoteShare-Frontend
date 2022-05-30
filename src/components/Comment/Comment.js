import React, { useState, useEffect } from "react";
import { Layout, Row, Col, Divider } from "antd";
import PropTypes from 'prop-types';
import Text from "../Text/Text";
import { Avatar } from 'antd';
import './Comment.css'
const { Header, Content, Sider } = Layout;
function Comment(props) {
    const Comments = props.comments?.map((item, index) => {
        console.log(item);
        if (item.author) {
            return <div id='Comment__Block'className='Comment__Block'>
                <Avatar id="Comment__Avatar" className="Comment__Avatar" size={36}>
                    {item.author[0]}
                </Avatar>
                <Row id='Comment__Author__Row' className='Comment__Author__Row' >
                    <Col id='Comment__Author' className='Comment__Author' flex={3}><Text color='black' cls='Small' content={item.author} fontSize='15' display="inline-block"></Text></Col>
                    <Col id='Comment__Date' className='Comment__Date' flex={3}><Text color='black' cls='Small' content={item.date.split('T')[0]} fontSize='12' display="inline-block" /></Col>
                </Row>
                <Row id='Comment__Main__Row' className='Comment__Main__Row'>
                    <Col id='Comment__Main' className='Comment__Main' >
                        <Text color='black' cls='Small' content={item.content} fontSize='20' display="inline-block" />
                    </Col>
                </Row>
                <Divider />
            </div>
        }

    });


    return (
        <div id='Comment' className="Comment">
            <Row id='Comment__Title__Row' className='Comment__Title__Row'>
                <Col id='Comment__Title' className="Comment__Title" flex={3}><Text color='black' cls='Default' content={'Comment'} fontSize='38' display="inline-block" /></Col>
            </Row>
            {Comments}
            {/* { props.comments?.map((item, index) => {
                item.author && 
                (<div id='Comment__Block'className='Comment__Block'>
                        <Avatar id="Comment__Avatar" className="Comment__Avatar" size={36}>
                            {item.author[0]}
                        </Avatar>
                        <Row id='Comment__Author__Row' className='Comment__Author__Row' >
                            <Col id='Comment__Author' className='Comment__Author' flex={3}><Text color='black' cls='Small' content={item.author} fontSize='15' display="inline-block"></Text></Col>
                            <Col id='Comment__Date' className='Comment__Date' flex={3}><Text color='black' cls='Small' content={item.date.split('T')[0]} fontSize='12' display="inline-block" /></Col>
                        </Row>
                        <Row id='Comment__Main__Row' className='Comment__Main__Row'>
                            <Col id='Comment__Main' className='Comment__Main' >
                                <Text color='black' cls='Small' content={item.content} fontSize='20' display="inline-block" />
                            </Col>
                        </Row>
                        <Divider />
                    </div>)
                })
            } */}
        </div>
    );
}

export default Comment;