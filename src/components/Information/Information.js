import React, { useState, useEffect } from "react";
import { Row, Col, Tooltip, Skeleton  } from "antd";
import PropTypes from 'prop-types';
import Text from "../Text/Text";
import './Information.css'

function Information(props) {

    const [width, setWindowWidth] = useState(0)
    useEffect(() => { 

        updateDimensions();
        window.addEventListener("resize", updateDimensions);
        return () => 
            window.removeEventListener("resize",updateDimensions);
    }, [])

    const updateDimensions = () => {
        const width = window.innerWidth
        setWindowWidth(width)
    }
    const responsive = {
        topRightMode: width >= 768
    }

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

                <div className={responsive.topRightMode?"information__top__right":"information__top__below"}>
                {props.downloadable!=null &&
                (
                    <div className={responsive.topRightMode?'information__Downloadable':'information__Downloadable__below'}>
                        <div>
                            <Text color='black' cls='Small' content={"Downloadable"} fontSize='5' display="inline-block" />
                        </div>
                        {props.downloadable? "Downloadable":"Not Downloadable"}
                    </div>
                )}
                
                {props.public!=null &&(
                    <div className={responsive.topRightMode?'information__RefPrice':'information__RefPrice__below'}>
                        <Tooltip title={"The post/note can't be seen by other users when it is private."}>
                            <div className={responsive.topRightMode?'information__Price':'information__Price__below'}>
                                <Text color='black' cls='Small' content={"State"} fontSize='5' display="inline-block" />
                            </div>
                            {props.public?<span style={{color: "#00BB00"}}>Public</span>:<span style={{color: "red"}}>Private</span>}
                        </Tooltip>
                    </div>
                    // <div className='information__RefPrice information__top__info'>
                    //     <Text color='black' cls='Default' content={"Ref Solution: " + props.referencePrice + '/person , Total: ' + props.referenceNumber + ' person(s)'} fontSize='17' display="inline-block" />
                    // </div>
                )}
                {props.notePublic!=null &&(
                    <div className={responsive.topRightMode?'information__NotePublic':'information__NotePublic__below'}>
                        <Tooltip title={"The post/note can't be seen by other users when it is private."}>
                            <div className={responsive.topRightMode?'information__NotePublic__Top':'information__NotePublic__Top__below'}>
                                <Text color='black' cls='Small' content={"Note State"} fontSize='5' display="inline-block" />
                            </div>
                            {props.notePublic?<span style={{color: "#00BB00"}}>Public</span>:<span style={{color: "red"}}>Private</span>}
                        </Tooltip>
                    </div>
                    // <div className='information__RefPrice information__top__info'>
                    //     <Text color='black' cls='Default' content={"Ref Solution: " + props.referencePrice + '/person , Total: ' + props.referenceNumber + ' person(s)'} fontSize='17' display="inline-block" />
                    // </div>
                )}

                {props.bestPrice!=null &&(
                    <div className={responsive.topRightMode?'information__Price':'information__Price__below'}>
                        {props.remainBest!=null?
                            <Tooltip title={"Remainder: " + props.remainBest + " people" }>
                                <div>
                                    <Text color='black' cls='Small' content={(props.type=="note" || props.type=="collaboration")?"Price":"Best Solution"} fontSize='5' display="inline-block" />
                                </div>
                                {props.bestPrice}
                            </Tooltip>
                            :
                            <>
                                <div>
                                    <Text color='black' cls='Small' content={(props.type=="note" || props.type=="collaboration")?"Price":"Best Solution"} fontSize='5' display="inline-block" />
                                </div>
                                {props.bestPrice}
                            </>
                        }
                        
                        
                    </div>
                )}
                
                {props.referencePrice!=null &&(
                    <div className={responsive.topRightMode?'information__RefPrice':'information__RefPrice__below'}>
                        <Tooltip title={"Remainder: " + props.remainRef + " people" }>
                            <div>
                                <Text color='black' cls='Small' content={"Ref Solution"} fontSize='5' display="inline-block" />
                            </div>
                            {props.referencePrice}
                        </Tooltip>
                    </div>
                    // <div className='information__RefPrice information__top__info'>
                    //     <Text color='black' cls='Default' content={"Ref Solution: " + props.referencePrice + '/person , Total: ' + props.referenceNumber + ' person(s)'} fontSize='17' display="inline-block" />
                    // </div>
                )}
                </div>
                
                
            </Row>
            <div className='information__bottom'>
                <div className='information__bottom__Col'>
                    {props.likeCount!=null &&(
                        <div className='information__Likes'>
                            <div>
                                <Text color='black' cls='Small' content={"Likes"} fontSize='5' display="inline-block" />
                            </div>
                            {props.likeCount}
                        </div>
                    )}
                    {props.favoriteCount!=null &&(
                        <div className='information__Favorite'>
                            <div>
                                <Text color='black' cls='Small' content={"Save" } fontSize='5' display="inline-block" />
                            </div>
                            {props.favoriteCount}
                        </div>
                    )}
                    {props.unlockCount!=null &&(
                        <div className='information__Unlock'>
                            <div>
                                <Text color='black' cls='Small' content={"Unlock"} fontSize='5' display="inline-block" />
                            </div>
                            {props.unlockCount}
                        </div>
                    )}
                </div>
                <div className='information__bottom__Col'>
                    {props.plagiarismRate!=null &&(
                        <div className='information__Likes'>
                            <Tooltip title={<><div>{props.plagiarismRateResult}</div><div>*Suspected Plagiarism Rate. The rate is an index of plagiarising from other notes</div></>}>
                                <div>
                                    <Text color='black' cls='Small' content={"SPR"} fontSize='20' display="inline-block" />
                                    <span style={{color: "#842B00", fontSize:"1.2em"}}>: {props.plagiarismRate}%</span>
                                </div>
                            </Tooltip>
                            
                            
                        </div>
                    )}
                    {props.quoteRate!=null &&(
                        <div className='information__Favorite'>
                            <Tooltip title={<><div>{props.quoteRateResult}</div><div>*Citation Rate. The rate is an index of citing other notes</div></>}>
                                <div>
                                    <Text color='black' cls='Small' content={"CR" } fontSize='20' display="inline-block" />
                                    <span style={{color: "#01814A", fontSize:"1.2em"}}>: {props.quoteRate}%</span>
                                </div>
                            </Tooltip>  
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Information;