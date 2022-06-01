import React, { useState, useEffect } from "react";
import { Row, Col, Divider, Input, Mentions  } from "antd";
import PropTypes from 'prop-types';
import Text from "../Text/Text";
import OPInfo from "../OPInfo/OPInfo";
import Button from "../Button/Button";
import './Comment.css'
const { Option } = Mentions;
const MOCK_DATA = {
    '@': ['afc163', 'zombiej', 'yesmeck'],
    '#': ['1.0', '2.0', '3.0'],
};
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

    const [prefix, setPrefix] = useState('@');

    const onSearch = (_, newPrefix) => {
        setPrefix(newPrefix);
    };

    return (
        <div id='Comment' className="Comment">
            <Row id='Comment__Title__Top' className='Comment__Title__Top'>
            
                <Col id='Comment__Title' className="Comment__Title" flex={3}><Text color='black' cls='Default' content={'Comment'} fontSize='38' display="inline-block" /></Col>
                <Divider className="Comment__Divider"/>
            </Row>

            <div id='Comment__Title__Middle' className='Comment__Title__Middle'>
                {Comments}
            </div>
            
            <Row className='Comment__Title__Bottom'>
                <Col className='Comment__Input' span={17}>
                    {/* <Input placeholder="Say something..." bordered={false} /> */}
                    <Mentions
                        style={{
                            width: '100%',
                        }}
                        placeholder="input @ to mention people, # to mention tag"
                        prefix={['@', '#']}
                        onSearch={onSearch}
                        >
                        {(MOCK_DATA[prefix] || []).map((value) => (
                            <Option key={value} value={value}>
                            {value}
                            </Option>
                        ))}
                    </Mentions>
                </Col>
                <Col className='Comment__Button' span={6}>
                    <Button color={"green"}><Text color='white' cls='Large' content={"Submit"} fontSize='20' display="inline-block" /></Button>
                </Col>
                
            </Row>
        </div>
    );
}

export default Comment;