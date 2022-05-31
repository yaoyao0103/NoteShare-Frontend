import React, { useState, useEffect } from "react";
import { Row, Col, Divider, Input  } from "antd";
import PropTypes from 'prop-types';
import Text from "../Text/Text";
import OPInfo from "../OPInfo/OPInfo";
import Button from "../Button/Button";
import './Comment.css'
function Comment(props) {
    const Comments = props.comments?.map((item, index) => {
        console.log(item);
        if (item.author) {
            return (
                <div key={index} id={'Comment__Block'+index} className='Comment__Block' >
                    <Row id={'Comment__Author__Row'+index} className='Comment__Author__Row' style={{ position: 'relative' }}>
                        <Col id={"Comment__Author__Row__left"+index} className="Comment__Author__Row__left" span={12}>
                            <OPInfo
                                id="Comment__Author__Row__OPInfo"
                                className="Comment__Author__Row__OPInfo"
                                size={45}
                                author={item.author}
                                date={item.date}
                                mode='Comment'
                                authorFontSize="18"
                                dateFontSize="15"
                            >T</OPInfo>
                            </Col> 
                    </Row>
                    <Row id={'Comment__Main__Row'+index} className='Comment__Main__Row'>
                        <Col id={'Comment__Main'+index} className='Comment__Main' span={12}>
                            <Text color='black' cls='Small' content={item.content} fontSize='20' display="inline-block" />
                        </Col>
                    </Row>
                    <Divider className="Comment__Divider"/>
                </div>);
        }

    });


    return (
        <div id='Comment' className="Comment">
            <Row id='Comment__Title__Top' className='Comment__Title__Top'>
            
                <Col id='Comment__Title' className="Comment__Title" flex={3}><Text color='black' cls='Default' content={'Comment'} fontSize='38' display="inline-block" /></Col>
                <Divider className="Comment__Divider"/>
            </Row>
            {/* <OPInfo
                                id="Comment__Author__Row__OPInfo"
                                className="Comment__Author__Row__OPInfo"
                                size={36}
                                author={'Ting'}
                                date={'2022-12-08'}
                                mode='Comment'
                                
                            >T</OPInfo> */}
            <div id='Comment__Title__Middle' className='Comment__Title__Middle'>
                {Comments}
            </div>
            
            <Row className='Comment__Title__Bottom'>
                <Col className='Comment__Input' span={17}>
                    <Input placeholder="Say something..." bordered={false} />
                </Col>
                <Col className='Comment__Button' span={6}>
                    <Button color={"green"}><Text color='white' cls='Large' content={"Submit"} fontSize='20' display="inline-block" /></Button>
                </Col>
                
            </Row>
        </div>
    );
}

export default Comment;