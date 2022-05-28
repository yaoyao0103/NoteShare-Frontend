import React, { useState } from "react";
import {Row, Col } from "antd";
import PropTypes from 'prop-types';
import Text from "../Text/Text";
import './Information.css'

function Information(props) { 
    return (
        <Row id='qnaContent__Information__Row' className='qnaContent__Information__Row'>
            <Col id='qnaContent__School' className='qnaContent__School' >
                <Text color='black' cls='Small' content={props.school} fontSize='17' display="inline-block" />
            </Col>
            <Col id='qnaContent__Department' className='qnaContent__Departmentl'>
                <Text color='black' cls='Small' content={props.department} fontSize='17' display="inline-block" />
            </Col>
            <Col id='qnaContent__Subject' className='qnaContent__Subject'>
                <Text color='black' cls='Small' content={props.subject} fontSize='17' display="inline-block" />
            </Col>
        </Row>
    );
}
Information.propTypes = {
    school: PropTypes.string,
    department:PropTypes.string,
    subject:PropTypes.string,
};
Information.defaultProps = {
    school: 'Unknown',
    department:'Unknown',
    subject:'Unknown',
};
export default Information;