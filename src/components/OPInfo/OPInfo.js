import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Row, Col, Tooltip } from 'antd';
import { UserOutlined, AntDesignOutlined } from '@ant-design/icons';
import Text from '../Text/Text';
import "./OPInfo.css";

const OPInfo = (props) => {
    return (
        <div id="OPInfo">
            <Row id={"OPInfo__Row"+'__'+props.mode} className='OPInfo__Row'>
                <Col className={"OPInfo__left"+'__'+props.mode}>
                    {props.page!='CollabDetailPage'?
                    <Avatar className={"OPInfo__Avatar"+'__'+props.mode} size={props.size} src={props.avatar}></Avatar>
                    :
                    <Avatar.Group
                        className='OPInfo_Avatar_Group'
                        maxCount={2}
                        maxPopoverTrigger="click"
                        size="large"
                        maxStyle={{ color: '#f56a00', backgroundColor: '#fde3cf', cursor: 'pointer' }}
                        >
                        <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                        <Avatar style={{ backgroundColor: '#f56a00' }}>K</Avatar>
                        <Tooltip title="Ant User" placement="top">
                            <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
                        </Tooltip>
                        <Avatar style={{ backgroundColor: '#1890ff' }} icon={<AntDesignOutlined />} />
                        </Avatar.Group>
                    }
                </Col>
                <Col id={"OPInfo__right"+'__'+props.mode} className={"OPInfo__right"+'__'+props.mode} >
                    <Row id={'OPInfo__Author'+'__'+props.mode} className={'OPInfo__Author'+'__'+props.mode}><Text color='black' cls='Default' content={props.author} fontSize={props.authorFontSize}></Text></Row>
                    <Row id={'OPInfo__Date'+'__'+props.mode} className={'OPInfo__Date'+'__'+props.mode} ><Text color='black' cls='Small' content={props.date.split('T')[0]} fontSize={props.dateFontSize} display="inline-block" /></Row>
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
    avatar:PropTypes.string,
    date:PropTypes.string,
    authorFontSize:PropTypes.string,
    dateFontSize:PropTypes.string,
};
OPInfo.defaultProps = {
    mode:'Content',
    children: '',
    author: 'Unknown',
    avatar:'https://joeschmoe.io/api/v1/random',
    date:'2020-12-25',
    authorFontSize:'20',
    dateFontSize:'12',
};
  export default OPInfo