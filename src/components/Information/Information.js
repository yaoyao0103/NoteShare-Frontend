import React, { useState } from "react";
import { Row, Col } from "antd";
import PropTypes from 'prop-types';
import Text from "../Text/Text";
import './Information.css'

function Information(props) {
    const School = () => {
        if (props.school !== '') {
            return (
            <Col id='information__School' className='information__School' >
                <Text color='black' cls='Small' content={props.school} fontSize='17' display="inline-block" />
            </Col>
            );
        }
        else return ''
    };
    return (
        <Row id='information__Row' className='information__Row'>
            {School}
            <Col id='information__Department' className='information__Departmentl'>
                <Text color='black' cls='Small' content={props.department} fontSize='17' display="inline-block" />
            </Col>
            <Col id='information__Subject' className='information__Subject'>
                <Text color='black' cls='Small' content={props.subject} fontSize='17' display="inline-block" />
            </Col>
        </Row>
    );
}
Information.propTypes = {
    school: PropTypes.string,
    department: PropTypes.string,
    subject: PropTypes.string,
};
Information.defaultProps = {
    school: '',
    department: 'Unknown',
    subject: 'Unknown',
};
export default Information;