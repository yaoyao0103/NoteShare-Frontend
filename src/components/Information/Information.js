import React, { useState } from "react";
import { Row, Col } from "antd";
import PropTypes from 'prop-types';
import Text from "../Text/Text";
import './Information.css'

function Information(props) {

    return (
        <div id="information" className="information">
            <Row id='information__top' className='information__top'>
                {props.school!='' && (
                    <Col id='information__School' className='information__School' >
                        <Text color='black' cls='Default' content={props.school} fontSize='17' display="inline-block" />
                    </Col>
                )}
                <Col className='information__Department'>
                    <Text color='black' cls='Default' content={props.department} fontSize='17' display="inline-block" />
                </Col>
                <Col className='information__Subject'>
                    <Text color='black' cls='Default' content={props.subject} fontSize='17' display="inline-block" />
                </Col>
                {props.instructor &&(
                    <Col className='information__Instructor'>
                        <Text color='black' cls='Default' content={props.instructor} fontSize='17' display="inline-block" />
                    </Col>
                )}
                <div className="information__top__right">
                {props.downloadable!=null &&(
                    <div className='information__Price information__top__info'>
                        <Text color='black' cls='Default' content={"Downloadable"} fontSize='17' display="inline-block" />
                    </div>
                )}
                {props.price!=null &&(
                    <div className='information__Downloadable information__top__info'>
                        <Text color='black' cls='Default' content={"Price: " + props.price} fontSize='17' display="inline-block" />
                    </div>
                )}
                </div>
                
                
            </Row>
            <Row id='information__bottom' className='information__bottom'>
                {props.likeCount &&(
                    <Col className='information__Likes'>
                        <Text color='black' cls='Default' content={"Likes: " + props.likeCount} fontSize='17' display="inline-block" />
                    </Col>
                )}
                {props.favoriteCount &&(
                    <Col className='information__Favorite'>
                        <Text color='black' cls='Default' content={"Save: " + props.favoriteCount} fontSize='17' display="inline-block" />
                    </Col>
                )}
                {props.unlockCount &&(
                    <Col className='information__Unlock'>
                        <Text color='black' cls='Default' content={"Unlock: " + props.unlockCount} fontSize='17' display="inline-block" />
                    </Col>
                )}
            </Row>
        </div>
    );
}

Information.defaultProps = {
    school: '',
    department: 'Unknown',
    subject: 'Unknown',
    instructor: false,
    likeCount: false,
    favoriteCount: false,
    unlockCount: false,
    downloadable: false,
    price: false,
};
export default Information;