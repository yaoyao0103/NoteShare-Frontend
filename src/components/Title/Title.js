import React, { useState } from "react";
import { Layout, Row, Col } from "antd";
import PropTypes from 'prop-types';
import { EllipsisOutlined } from '@ant-design/icons';
import Text from "../Text/Text";
import { Avatar } from 'antd';
import './Title.css'
const { Header, Content, Sider } = Layout;

function Title(popps) {
    return (
        <div id='Title' className="Title">
            <Row id='Title__Row__First' className='Titile__Row__First' >
                <Col id='Title__Author' className='Title__Author' flex={3}><Text color='black' cls='Small' content={popps.author} fontSize='20'></Text></Col>
                <Col id='Title__Date' className='Title__Date' span={24}><Text color='black' cls='Small' content={popps.date} fontSize='12' display="inline-block" /></Col>
            </Row>
            <Row id='Title__Row__Sec' className='Titile__Row__Sec'>
                <Col id='Title__Title' className="Title__Title" flex={3}><Text color='black' cls='large' content={popps.title} fontSize='25' display="inline-block" /></Col>
            </Row>
        </div>
        );
}
Title.propTypes = {
    author: PropTypes.string,
    date:PropTypes.string,
    title:PropTypes.string,
};
Title.defaultProps = {
    author: 'Unknown',
    date:'2020-12-25',
    title:'Unknown',
};
export default Title;