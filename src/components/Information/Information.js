import React, { useState } from "react";
import { Row, Col, Tooltip, Skeleton  } from "antd";
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
                        {props.school? props.school:<Skeleton />}
                    </Col>
                )}
                <Col className='information__Department'>
                    <div>
                        <Text color='black' cls='Small' content={"Department"} fontSize='5' display="inline-block" />
                    </div>
                    {props.department? props.department:<Skeleton />}
                </Col>
                <Col className='information__Subject'>
                    <div>
                    <Text color='black' cls='Small' content={"Subject"} fontSize='5' display="inline-block" />
                    </div>
                    {props.subject? props.subject:<Skeleton />}
                </Col>
                {props.professor!=null &&(
                    <Col className='information__Instructor'>
                        <div>
                            <Text color='black' cls='Small' content={"Instructor"} fontSize='5' display="inline-block" />
                        </div>
                        {props.professor? props.professor:<Skeleton />}
                    </Col>
                )}
                <div className="information__top__right">
                {props.downloadable!=null &&(
                    <Col className='information__Downloadable'>
                        <div >
                            <Text color='black' cls='Small' content={"Downloadable"} fontSize='5' display="inline-block" />
                        </div>
                        {props.downloadable? "Downloadable":"Not Downloadable"}
                    </Col>
                )}
                
                {props.public!=null &&(
                    <Col className='information__RefPrice'>
                        <Tooltip title={"The post/note can't be seen by other users when it is private."}>
                            <div className='information__Price'>
                                <Text color='black' cls='Small' content={"State"} fontSize='5' display="inline-block" />
                            </div>
                            {props.public?<span style={{color: "#00BB00"}}>Public</span>:<span style={{color: "red"}}>Private</span>}
                        </Tooltip>
                    </Col>
                    // <div className='information__RefPrice information__top__info'>
                    //     <Text color='black' cls='Default' content={"Ref Solution: " + props.referencePrice + '/person , Total: ' + props.referenceNumber + ' person(s)'} fontSize='17' display="inline-block" />
                    // </div>
                )}
                {props.notePublic!=null &&(
                    <Col className='information__RefPrice'>
                        <Tooltip title={"The post/note can't be seen by other users when it is private."}>
                            <div className='information__Price'>
                                <Text color='black' cls='Small' content={"Note State"} fontSize='5' display="inline-block" />
                            </div>
                            {props.notePublic?<span style={{color: "#00BB00"}}>Public</span>:<span style={{color: "red"}}>Private</span>}
                        </Tooltip>
                    </Col>
                    // <div className='information__RefPrice information__top__info'>
                    //     <Text color='black' cls='Default' content={"Ref Solution: " + props.referencePrice + '/person , Total: ' + props.referenceNumber + ' person(s)'} fontSize='17' display="inline-block" />
                    // </div>
                )}

                {props.bestPrice!=null &&(
                    <Col className='information__Price'>
                        {props.remainBest!=null?
                            <Tooltip title={"Remainder: " + props.remainBest + " people" }>
                                <div className='information__Price'>
                                    <Text color='black' cls='Small' content={(props.type=="note" || props.type=="collaboration")?"Price":"Best Solution"} fontSize='5' display="inline-block" />
                                </div>
                                {props.bestPrice}
                            </Tooltip>
                            :
                            <>
                                <div className='information__Price'>
                                    <Text color='black' cls='Small' content={(props.type=="note" || props.type=="collaboration")?"Price":"Best Solution"} fontSize='5' display="inline-block" />
                                </div>
                                {props.bestPrice}
                            </>
                        }
                        
                        
                    </Col>
                )}
                
                {props.referencePrice!=null &&(
                    <Col className='information__RefPrice'>
                        <Tooltip title={"Remainder: " + props.remainRef + " people" }>
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
            <Row id='information__bottom' className='information__bottom'>
                {props.plagiarismRate!=null &&(
                    <Col className='information__Likes'>
                        <Tooltip title={<><div>{props.plagiarismRateResult}</div><div>*Suspected Plagiarism Rate. The rate is an index of plagiarising from other notes</div></>}>
                            <div>
                                <Text color='black' cls='Small' content={"SPR"} fontSize='20' display="inline-block" />
                                <span style={{color: "#842B00", fontSize:"1.2em"}}>: {props.plagiarismRate}%</span>
                            </div>
                        </Tooltip>
                        
                        
                    </Col>
                )}
                {props.quoteRate!=null &&(
                    <Col className='information__Favorite'>
                        <Tooltip title={<><div>{props.quoteRateResult}</div><div>*Citation Rate. The rate is an index of citing other notes</div></>}>
                            <div>
                                <Text color='black' cls='Small' content={"CR" } fontSize='20' display="inline-block" />
                                <span style={{color: "#01814A", fontSize:"1.2em"}}>: {props.quoteRate}%</span>
                            </div>
                        </Tooltip>  
                    </Col>
                )}
            </Row>
        </div>
    );
}

export default Information;