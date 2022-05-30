import React, { useState, useEffect } from "react";
import { Row, Col, Divider } from "antd";
import PropTypes from 'prop-types';
import Text from "../Text/Text";
import OPInfo from "../OPInfo/OPInfo";
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
                                size={36}
                                author={item.author}
                                date={item.date}
                                mode='Comment'
                                style={{ position: 'relative' }}
                            >T</OPInfo></Col>
                    </Row>
                    <Row id={'Comment__Main__Row'+index} className='Comment__Main__Row'>
                        <Col id={'Comment__Main'+index} className='Comment__Main' >
                            <Text color='black' cls='Small' content={item.content} fontSize='20' display="inline-block" />
                        </Col>
                    </Row>
                    <Divider />
                </div>);
        }

    });


    return (
        <div id='Comment' className="Comment">
            <Row id='Comment__Title__Row' className='Comment__Title__Row'>
                <Col id='Comment__Title' className="Comment__Title" flex={3}><Text color='black' cls='Default' content={'Comment'} fontSize='38' display="inline-block" /></Col>
            </Row>
            {Comments}
            {/* {props.comments?.map((item, index) => {
                if(item.author){
                    (<div key={index} id='Comment__Block' className='Comment__Block'>

                        <Row id='Comment__Author__Row' className='Comment__Author__Row' >
                            <Col id="noteDetailContent__Header__left" className="noteDetailContent__Header__left" span={12}>
                                <OPInfo
                                    id="noteDetailContent__Title__OPInfo"
                                    className="noteDetailContent__Title__OPInfo"
                                    size={34}
                                    author={item.author}
                                    date={item.date}
                                >T</OPInfo></Col>
                        </Row>
                        <Row id='Comment__Main__Row' className='Comment__Main__Row'>
                            <Col id='Comment__Main' className='Comment__Main' >
                                <Text color='black' cls='Small' content={item.content} fontSize='20' display="inline-block" />
                            </Col>
                        </Row>
                        <Divider />
                    </div>)
            }})
            } */}
        </div>
    );
}

export default Comment;