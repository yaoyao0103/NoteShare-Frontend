import React, { useState } from "react";
import { Row, Col, Tooltip } from "antd";
import PropTypes from 'prop-types';
import Text from "../Text/Text";
import './Information.css'

function Information(props) {

    return (
        <div id="information" className="information">
            <Row id='information__top' className='information__top'>
                {props.school!=null && (
                    <Col id='information__School' className='information__School' >
                        <div>
                            <Text color='black' cls='Small' content={"School"} fontSize='5' display="inline-block" />
                        </div>
                        {props.school}
                    </Col>
                )}
                <Col className='information__Department'>
                    <div>
                        <Text color='black' cls='Small' content={"Department"} fontSize='5' display="inline-block" />
                    </div>
                    {props.department}
                </Col>
                <Col className='information__Subject'>
                    <div>
                    <Text color='black' cls='Small' content={"Subject"} fontSize='5' display="inline-block" />
                    </div>
                    {props.subject}
                </Col>
                {props.professor!=null &&(
                    <Col className='information__Instructor'>
                        <div>
                            <Text color='black' cls='Small' content={"Professor"} fontSize='5' display="inline-block" />
                        </div>
                        {props.professor}
                    </Col>
                )}
                <div className="information__top__right">
                {props.downloadable!=null &&(
                    <Col className='information__Downloadable'>
                        <div >
                            <Text color='black' cls='Small' content={"Downloadable"} fontSize='5' display="inline-block" />
                        </div>
                        {props.downloadable? "Downloadable":"not Downloadable"}
                    </Col>
                )}
                {props.bestPrice!=null &&(
                    <Col className='information__Price'>
                        <Tooltip title={"for " + props.referenceNumber + " people" }>
                            <div className='information__Price'>
                                <Text color='black' cls='Small' content={"Best Solution"} fontSize='5' display="inline-block" />
                            </div>
                            {props.bestPrice}
                        </Tooltip>
                    </Col>
                )}
                
                {props.referencePrice!=null &&(
                    <Col className='information__RefPrice'>
                        <Tooltip title={"for " + props.referenceNumber + " people" }>
                            <div className='information__Price'>
                                <Text color='black' cls='Small' content={"Ref Solution"} fontSize='5' display="inline-block" />
                            </div>
                            {props.referencePrice}
                        </Tooltip>
                    </Col>
                    // <div className='information__RefPrice information__top__info'>
                    //     <Text color='black' cls='Default' content={"Ref Solution: " + props.referencePrice + '/person , Total: ' + props.referenceNumber + ' person(s)'} fontSize='17' display="inline-block" />
                    // </div>
                )}
                </div>
                
                
            </Row>
            <Row id='information__bottom' className='information__bottom'>
                {props.likeCount!=null &&(
                    <Col className='information__Likes'>
                        <div>
                            <Text color='black' cls='Small' content={"Likes"} fontSize='5' display="inline-block" />
                        </div>
                        {props.likeCount}
                    </Col>
                )}
                {props.favoriteCount!=null &&(
                    <Col className='information__Favorite'>
                        <div>
                            <Text color='black' cls='Small' content={"Save" } fontSize='5' display="inline-block" />
                        </div>
                        {props.favoriteCount}
                    </Col>
                )}
                {props.unlockCount!=null &&(
                    <Col className='information__Unlock'>
                        <div>
                            <Text color='black' cls='Small' content={"Unlock"} fontSize='5' display="inline-block" />
                        </div>
                        {props.unlockCount}
                    </Col>
                )}
            </Row>
        </div>
    );
}

Information.defaultProps = {
    school: null,
    department: 'Unknown',
    subject: 'Unknown',
    professor: null,
    likeCount: null,
    favoriteCount: null,
    unlockCount: null,
    downloadable: null,
    bestPrice: null,
};
export default Information;