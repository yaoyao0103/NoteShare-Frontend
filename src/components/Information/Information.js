import React, { useState } from "react";
import { Row, Col } from "antd";
import PropTypes from 'prop-types';
import Text from "../Text/Text";
import './Information.css'

function Information(props) {

    return (
        <div id="information" className="information">
            <Row id='information__Top' className='information__Top'>
                {props.school!='' && (
                    <Col id='information__School' className='information__School' >
                        <Text color='black' cls='Default' content={props.school} fontSize='17' display="inline-block" />
                    </Col>
                )}
                <Col id='information__Department' className='information__Departmentl'>
                    <Text color='black' cls='Default' content={props.department} fontSize='17' display="inline-block" />
                </Col>
                <Col id='information__Subject' className='information__Subject'>
                    <Text color='black' cls='Default' content={props.subject} fontSize='17' display="inline-block" />
                </Col>
                {props.instructor &&(
                    <Col id='information__Instructor' className='information__Instructor'>
                        <Text color='black' cls='Default' content={props.instructor} fontSize='17' display="inline-block" />
                    </Col>
                )}
            </Row>
            <Row id='information__Bottom' className='information__Bottom'>
                {props.likes &&(
                    <Col id='information__Likes' className='information__Likes'>
                        <Text color='black' cls='Default' content={props.likes} fontSize='17' display="inline-block" />
                    </Col>
                )}
                {props.save &&(
                    <Col id='information__Save' className='information__Save'>
                        <Text color='black' cls='Default' content={props.save} fontSize='17' display="inline-block" />
                    </Col>
                )}
                {props.download &&(
                    <Col id='information__Download' className='information__Download'>
                        <Text color='black' cls='Default' content={props.download} fontSize='17' display="inline-block" />
                    </Col>
                )}
            </Row>
        </div>
    );
}
Information.propTypes = {
    school: PropTypes.string,
    department: PropTypes.string,
    subject: PropTypes.string,
    instructor: PropTypes.string,
    likes: PropTypes.number,
    save: PropTypes.number,
    download: PropTypes.number,
    downloadable: PropTypes.bool,
    coins: PropTypes.number,

};
Information.defaultProps = {
    school: '',
    department: 'Unknown',
    subject: 'Unknown',
    instructor: null,
    likes: null,
    save: null,
    download: null,
    downloadable: false,
    coins: null,
};
export default Information;