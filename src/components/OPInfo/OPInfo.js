import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Avatar, Row, Col, Tooltip } from 'antd';
import { UserOutlined, AntDesignOutlined } from '@ant-design/icons';
import Text from '../Text/Text';
import "./OPInfo.css";
import { createMedia } from "@artsy/fresnel"
const { MediaContextProvider, Media } = createMedia({
    breakpoints: {
        sm: 0,
        lm: 391,
        md: 768,
        lg: 1024,
        xl: 1192,
    },
})
const OPInfo = (props) => {

    useEffect(()=>{
        //console.log("date", props.date)
    },[props.date])
    return (
        <div id="OPInfo">
            <Row id={"OPInfo__Row"+'__'+props.mode} className='OPInfo__Row'>
                <Col className={"OPInfo__left"+'__'+props.mode}>
                    {props.page!='CollabDetailPage'?
                    <Avatar className={"OPInfo__Avatar OPInfo__Avatar"+'__'+props.mode} size={props.size} src={"https://gravatar.com/avatar/7fdc37318319569a920fd7d087c14d1f?s=400&d=robohash&r=x"} onClick={() => props.setPageProps({page: 'ProfilePage', email: props.author.email})}></Avatar>
                    :
                    <Avatar.Group
                        className='OPInfo_Avatar_Group'
                        maxCount={2}
                        maxPopoverTrigger="click"
                        size="large"
                        maxStyle={{ color: '#f56a00', backgroundColor: '#fde3cf', cursor: 'pointer' }}
                        >
                        {props.author.map( (item, index) => (
                            <Tooltip placement="top" title={item.name}>
                                <Avatar className={"OPInfo__Avatar OPInfo__Avatar"+'__'+props.mode} src={"https://gravatar.com/avatar/7fdc37318319569a920fd7d087c14d1f?s=400&d=robohash&r=x"} onClick={() => props.setPageProps({page: 'ProfilePage', email: item.email})}/>
                            </Tooltip>

                        ))}
                        </Avatar.Group>
                    }
                </Col>
                <Col id={"OPInfo__right"+'__'+props.mode} className={"OPInfo__right"+'__'+props.mode} >
                    <Row id={'OPInfo__Author'+'__'+props.mode} className={'OPInfo__Author'+'__'+props.mode}><p style={{fontSize:props.authorFontSize + 'px'}}>{props.author.name}</p></Row>
                    {props.date&&<Row id={'OPInfo__Date'+'__'+props.mode} className={'OPInfo__Date'+'__'+props.mode} ><Text color='black' cls='Small' content={props.date.split('T')[0]} fontSize={props.dateFontSize} display="inline-block" /></Row>}
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
    avatar:PropTypes.string,
    date:PropTypes.string,
    authorFontSize:PropTypes.string,
    dateFontSize:PropTypes.string,
};
OPInfo.defaultProps = {
    mode:'Content',
    children: '',
    author: {},
    avatar:"https://gravatar.com/avatar/7fdc37318319569a920fd7d087c14d1f?s=400&d=robohash&r=x",
    authorFontSize:'20',
    dateFontSize:'12',
};
  export default OPInfo