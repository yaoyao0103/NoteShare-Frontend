import React, { useEffect, useState } from "react";
import { Row, Col, Tooltip } from "antd";
import PropTypes from 'prop-types';
import Text from "../../Text/Text";
import './RewardInformation.css'

function RewardInformation(props) {
    useEffect(()=>{
        console.log("props:", props)
    },[props])

    return (
        <div id="rewardInformation" className="rewardInformation">
            <Row className='rewardInformation__Top'>
                <Col className='rewardInformation__Title' >
                    <div>
                        <Text color='black' cls='Small' content={"Title"} fontSize='5' display="inline-block" />
                    </div>
                    {props.title}
                </Col>
            </Row>
            <Row className='rewardInformation__row'>
                <Col className='rewardInformation__Department'>
                    <div>
                        <Text color='black' cls='Small' content={"School"} fontSize='5' display="inline-block" />
                    </div>
                    {props.school}
                </Col>
                <Col className='rewardInformation__Department'>
                    <div>
                        <Text color='black' cls='Small' content={"Department"} fontSize='5' display="inline-block" />
                    </div>
                    {props.department}
                </Col>
            </Row>
            <Row className='rewardInformation__row'>
                <Col className='rewardInformation__Subject'>
                    <div>
                    <Text color='black' cls='Small' content={"Subject"} fontSize='5' display="inline-block" />
                    </div>
                    {props.subject}
                </Col>
                <Col className='rewardInformation__Instructor'>
                    <div>
                        <Text color='black' cls='Small' content={"Professor"} fontSize='5' display="inline-block" />
                    </div>
                    {props.professor}
                </Col>
            </Row>

            <Row className='rewardInformation__row'>
                <Col className='rewardInformation__Price'>
                    <Tooltip title={"for " + props.referenceNumber + " people" }>
                        <div>
                            <Text color='black' cls='Small' content={"Best Solution"} fontSize='5' display="inline-block" />
                        </div>
                        {props.bestPrice}
                    </Tooltip>
                </Col>
                <Col className='rewardInformation__RefPrice'>
                    <Tooltip title={"for " + props.referenceNumber + " people" }>
                        <div>
                            <Text color='black' cls='Small' content={"Ref Solution"} fontSize='5' display="inline-block" />
                        </div>
                        {props.referencePrice}
                    </Tooltip>
                </Col>
            </Row>
            <Row className='rewardInformation__Bottom'>
                <Col className='rewardInformation__Content'>
                    <div>
                        <Text color='black' cls='Small' content={"Content"} fontSize='5' display="inline-block" />
                    </div>
                    {props.content}
                </Col>
            </Row>
        </div>
    );
}

RewardInformation.defaultProps = {
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
export default RewardInformation;