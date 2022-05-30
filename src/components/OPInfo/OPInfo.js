import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Row, Col } from 'antd';
import Text from '../Text/Text';
import "./OPInfo.css";

const OPInfo = (props) => {
    return (
        <div id="OPInfo">
            <Row id="OPInfo__Row" className='OPInfo__Row'>
                <Col id="OPInfo__left" className='OPInfo__left'>
                    <Avatar id="OPInfo__Avatar" className="OPInfo__Avatar" size={props.size}>{props.children}</Avatar>
                </Col>
                <Col id="OPInfo__right" className='OPInfo__right'>
                    <Row id='OPInfo__Author' className='OPInfo__Author' flex={3}><Text color='black' cls='Default' content={props.author} fontSize='20'></Text></Row>
                    <Row id='OPInfo__Date' className='OPInfo__Date' span={24}><Text color='black' cls='Small' content={props.date.split('T')[0]} fontSize='12' display="inline-block" /></Row>
                </Col>
            </Row>
            
        </div>
        
        // <p className={`text${props.cls ? '__'+props.cls:''}`} style={{fontSize:props.fontSize+'px' ,color:props.color,display:props.display,textDecoration:props.decoration}}>{props.content}</p>
    )
}
//string to dom(content)


OPInfo.propTypes = {
    children: PropTypes.string,
    author: PropTypes.string,
    date:PropTypes.string,
};
OPInfo.defaultProps = {
    children: '',
    author: 'Unknown',
    date:'2020-12-25',
};
  export default OPInfo