import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Layout, Row, Col, Tag, Progress, message } from "antd";
import Button from "../Button/Button";
import Text from "../Text/Text";
import Title from "../Title/Title";
import Information from "../Information/Information";
import CommentArea from "../CommentArea/CommentArea";
import ContentEditor from "../../pages/NoteDetailPage/ContentEditor/ContentEditor";
import OPInfo from "../OPInfo/OPInfo";
import OptionMenu from "../OptionMenu/OptionMenu";
import './PageDetailContentTemplate.css'
import PoppedContent from "./PoppedContent/PoppedContent";
import DetailNotice from "../DetailNotice/DetailNotice";
import VoteArea from "../VoteArea/VoteArea";
import MyEditor from "../MyEditor/MyEditor";
const { Header, Content, Sider, Footer } = Layout;

const PageDetailContentTemplate = (props) => {

    const [versionId, setVersionId] = useState(null);
    const [poppedContentShow, setPoppedContentShow] = useState(false);
    const [poppedContent, setPoppedContent] = useState([]);
    const [noticeShow, setNoticeShow] = useState(true);
    const [editor, setEditor] = useState(<></>)

    
    useEffect(()=>{
        if(props.page == "NoteDetailPage"){
            setVersionId(props.data?.id);
            setEditor(<MyEditor noteId = {props.data?.id} version={'0'} page={props.page}/>)
        }
        else if(props.page == "CollabDetailPage" && props.isAuthor && props.data){
            const noteId = props.data.answers[0];
            setVersionId(noteId);
            if(props.isManager) setPoppedContent( props.data.wantEnterUsersEmail );
        }
        else if(props.page == "RewardDetailPage"){
            setPoppedContent( props.data.answers );
        }
        
    },[props.data])
    
    const setVersion = (index) => {
        setEditor(<MyEditor noteId = {props.data?.id} version={index.toString()} page={props.page}/>)
    }

    return (
        
        <div className="contentTemplate" >
            <Layout className="contentTemplate__Layout__outer">
                <Layout className="contentTemplate__Layout">
                    {/* Header */}
                    <Header className="contentTemplate__Header" >
                        <Row className="contentTemplate__Row">
                            <Col className="contentTemplate__Header__left" span={props.page!='NoteDetailPage'?7:4}>
                                <OPInfo
                                    className="contentTemplate__Title__OPInfo" 
                                    size={56}
                                    author={props.page == 'NoteDetailPage'? props.data?.headerName:props.data?.authorName}
                                    date={props.data?.date} 
                                    dateFontSize="18"
                                >T</OPInfo>
                            </Col>
                            <Col className="contentTemplate__Header__middle"span={props.page!='NoteDetailPage'?16:18}>
                                <Title title={props.data?.title} size={props.page!='NoteDetailPage'?'30':'35'}/></Col>
                            <Col className="contentTemplate__Header__right contentTemplate__Dropdown" span={props.page!='NoteDetailPage'?1:2}>
                                <div className="contentTemplate__Dropdown">
                                    <OptionMenu 
                                        page={props.page}
                                        comments={props.data?.comments? props.data.comments:[]} 
                                        versions={props.data?.version? props.data.version:[]} 
                                        public={props.data?.public}
                                        setVersion={setVersion}
                                        isAuthor={props.isAuthor}
                                        isManager={props.isManager}
                                        setPoppedContentShow={setPoppedContentShow}
                                        id={props.postId? props.postId:props.noteId}
                                        setPageProps={props.setPageProps}
                                    /></div>
                                
                            </Col>
                        </Row>     
                    </Header>
                    {/* Content */}
                    <Content className="contentTemplate__Content" >
                        <Row className='contentTemplate__Row'>
                            <Col className='contentTemplate__Content__Information' >
                                <Information 
                                    school={props.data?.school}
                                    department={props.data?.department}
                                    subject={props.data?.subject}
                                    professor={props.data?.professor}
                                    likeCount={props.data?.likeCount}
                                    favoriteCount={props.data?.favoriteCount}
                                    unlockCount={props.data?.unlockCount} 
                                    bestPrice={props.data?.bestPrice}
                                    referencePrice={props.data?.referencePrice}
                                    referenceNumber={props.data?.referenceNumber}
                                    downloadable={props.data?.downloadable}
                                />
                            </Col>
                        </Row>
                        
                        <Row className='contentTemplate__Row'>
                            <Col  className='contentTemplate__Content__Title' >
                                <Text color='black' cls='Default' content={"Content:"} fontSize='22' display="inline-block" />
                            </Col>
                        </Row>
                        <Row className='contentTemplate__Row'>
                            <Col className='contentTemplate__Content__Main'>
                                { (props.page=='NoteDetailPage' || (props.page=='CollabDetailPage' && props.isAuthor)) ? 
                                    editor
                                    :
                                    props.data?.content
                                }
                            </Col>
                        </Row>
                    </Content>
                    {/* Footer */}
                    <Footer className="contentTemplate__Footer">
                        {props.page=='NoteDetailPage' &&
                            <>
                                <Text color='black' cls='Default' content={"Tags:"} fontSize='22' display="inline-block" />
                                <span className="left-margin"></span>
                                {props.data?.tag && props.data.tag.map( (tag) =>
                                    <>
                                        {/* 
                                        <Text color='black' cls='Default' content={tag} fontSize='18' display="inline-block" /> */}
                                        <Tag style={{ fontSize:"15px" }}>{tag}</Tag>
                                    </>
                                )}
                            </>
                        }
                        {/* Todo: also check if he is an origin poster */}
                        {props.page=='RewardDetailPage' &&
                            <div className="contentTemplate__Footer__Button" onClick={() => setPoppedContentShow(true)}>
                                <Button color={"green"}><Text color='white' cls='Large' content={"Show Answer"} fontSize='17' display="inline-block" /></Button>
                            </div>
                        }
                        {(props.page=='CollabDetailPage' && !props.isAuthor) &&
                            <div className="contentTemplate__Footer__Button" onClick={() => setPoppedContentShow(true)}>
                                <Button color={"green"}><Text color='white' cls='Large' content={"Apply"} fontSize='17' display="inline-block" /></Button>
                            </div>
                        }
                        {(props.page=='CollabDetailPage' && props.isAuthor) &&
                            <div className="contentTemplate__Footer__Button" onClick={null}>
                                <Button color={"green"}><Text color='white' cls='Large' content={"Edit"} fontSize='17' display="inline-block" /></Button>
                            </div>
                        }
                        
                    </Footer>
                </Layout>
                
                {/* Sider */}
                {(props.page!='NoteDetailPage' && props.page!='CollabDetailPage') && 
                    <>
                        <Sider id="contentTemplate__Comment" className="contentTemplate__Comment" width='40%'>
                            <CommentArea page={props.page} comments={props.data?.comments? props.data.comments:[]} id={props.postId}/>
                        </Sider>
                    </>
                }
            </Layout> 
            {/* Popped up Part */}
            <div className={ poppedContentShow && 'popped__blur'}></div>
            <div className={`popped ${ poppedContentShow && 'popped--show'}`} >
                <PoppedContent page={props.page} content={poppedContent} setPoppedContentShow={setPoppedContentShow} isAuthor={props.isAuthor}/>
            </div>

            {props.voting &&
                <div className={`detailNotice ${ noticeShow && 'detailNotice--show'}`}>
                    <DetailNotice setNoticeShow={setNoticeShow} type={"vote"} kickUser={"Joe"}>
                        <VoteArea kickUser={"user's email"} total={10} agree={3} disagree={4}/>
                    </DetailNotice>
                </div>
            }
            
        </div>
    );
}


PageDetailContentTemplate.defaultProps = {
    data: null,
    versionId: '',
    page:'',
    footerBtn: null,
    isAuthor: false,
};

export default PageDetailContentTemplate;