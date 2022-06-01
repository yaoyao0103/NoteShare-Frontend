import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Row, Col } from 'antd';
import Text from '../Text/Text';
import "./OPInfo.css";

const OPInfo = (props) => {
    return (
        <div id="OPInfo">
            <Row id={"OPInfo__Row"+'__'+props.mode} className='OPInfo__Row'>
                <Col className={"OPInfo__left"+'__'+props.mode}>
                    <Avatar className={"OPInfo__Avatar"+'__'+props.mode} size={props.size} src="https://joeschmoe.io/api/v1/random"></Avatar>
                </Col>
                <Col id={"OPInfo__right"+'__'+props.mode} className='OPInfo__right'>
                    <Row id={'OPInfo__Author'+'__'+props.mode} className='OPInfo__Author' ><Text color='black' cls='Default' content={props.author} fontSize={props.authorFontSize}></Text></Row>
                    <Row id={'OPInfo__Date'+'__'+props.mode} className='OPInfo__Date' ><Text color='black' cls='Small' content={props.date.split('T')[0]} fontSize={props.dateFontSize} display="inline-block" /></Row>
                </Col>
            </Row>
            
        </div>
        
        // <p className={`text${props.cls ? '__'+props.cls:''}`} style={{fontSize:props.fontSize+'px' ,color:props.color,display:props.display,textDecoration:props.decoration}}>{props.content}</p>
    )
}
//string to dom(content)


OPInfo.propTypes = {
    mode: PropTypes.string,
    children: PropTypes.string,
    author: PropTypes.string,
    date:PropTypes.string,
    authorFontSize:PropTypes.string,
    dateFontSize:PropTypes.string,
};
OPInfo.defaultProps = {
    mode:'Content',
    children: '',
    author: 'Unknown',
    date:'2020-12-25',
    authorFontSize:'20',
    dateFontSize:'12',
};
  export default OPInfo