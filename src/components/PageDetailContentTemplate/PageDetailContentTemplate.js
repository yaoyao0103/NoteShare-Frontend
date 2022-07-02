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
import axios from "../axios/axios";
import Cookie from '../../components/Cookies/Cookies';
import { Base64 } from 'js-base64';
const { Header, Content, Sider, Footer } = Layout;

const PageDetailContentTemplate = (props) => {

    const [noteId, setNoteId] = useState(null);
    const [poppedContentShow, setPoppedContentShow] = useState(false);
    const [poppedContent, setPoppedContent] = useState([]);
    const [noticeShow, setNoticeShow] = useState(true);
    const [editor, setEditor] = useState(<></>)
    const [isManager, setIsManager] = useState(false)
    const [isAuthor, setIsAuthor] = useState(false)
    const [isFavoriter, setIsFavoriter] = useState(false)
    const [versions, setVersions] = useState(null)
    const [email, setEmail] = useState('')
    const [author, setAuthor] = useState([])
    const [managerEmail, setManagerEmail] = useState('')
    const [haveApplied, setHaveApplied] = useState(null)
    const [isPublic, setIsPublic] = useState(true)

    useEffect(()=>{
        const cookieParser = new Cookie(document.cookie)
        const temp = cookieParser.getCookieByName('email')
        const tempEmail = Base64.decode(temp);
        setEmail(tempEmail)
        console.log("tempEmail",tempEmail)
        if(props.page == "NoteDetailPage"){
            setNoteId(props.data?.id);
            setEditor(<MyEditor noteId = {props.data?.id} version={'0'} page={props.page}/>)
            if (props.data?.headerEmail == tempEmail) setIsAuthor(true)
            else setIsAuthor(false)
            if(props.data?.favoriter.includes(tempEmail)) setIsFavoriter(true)
            else setIsFavoriter(false)

        }
        else if(props.page == "CollabDetailPage" && props.data){
            const noteId = props.data.answers[0];
            setNoteId(noteId);
            setIsPublic(props.data?.public)
            axios.get(`http://localhost:8080/note/${noteId}`)
            .then ( res => {
                console.log(res.data.res)
                const tempNote = res.data.res
                setVersions(tempNote.version)
                setManagerEmail(tempNote.managerEmail)
                if((tempNote.managerEmail == tempEmail) || tempNote.headerEmail == tempEmail){
                    setEditor(<MyEditor noteId = {noteId} version={'0'} page={props.page}/>)
                    setIsManager(true)
                    setIsAuthor(true)
                    console.log("is a manager")
                    setPoppedContent( props.data.collabApply );
                }
                else if(props.data.email?.includes(tempEmail)){
                    setEditor(<MyEditor noteId = {noteId} version={'0'} page={props.page}/>)
                    setIsAuthor(true)
                    console.log("is a author")
                }
                else{
                    setIsAuthor(false)
                    setIsManager(false)
                    if(props.data.collabApply){
                        for(let i = 0; i < props.data.collabApply.length; i++){
                            if(props.data.collabApply[i].wantEnterUsersEmail == tempEmail){
                                setHaveApplied(props.data.collabApply[i].commentFromApplicant)
                                break;
                            }
                        }
                    }
                    console.log("is not a manager or author")
                }
                if(tempNote.favoriter.includes(tempEmail)) setIsFavoriter(true)
                else setIsFavoriter(false)
                let tempAuthor = []
                for(let i = 0; i < tempNote.authorName.length; i++){
                    tempAuthor = [...tempAuthor, {email: tempNote.authorEmail[i], name: tempNote.authorName[i]}]
                }
                setAuthor(tempAuthor)
            })
            .catch(err =>{
                console.log(err)
            })
            //if(isManager) setPoppedContent( props.data.wantEnterUsersEmail );
            //if(isManager) setPoppedContent( props.data.collabApply );
        }
        else if(props.page == "RewardDetailPage"){
            setIsPublic(props.data?.public)
            setPoppedContent( props.data.answers );
        }
        else if(props.page == "QnADetailPage"){
            setIsPublic(props.data?.public)
        }
        
    },[props.data])
    
    const setVersion = (index) => {
        if(props.page == "NoteDetailPage")
            setEditor(<MyEditor noteId = {props.data?.id} version={index.toString()} page={props.page}/>)
        else if(props.page == "CollabDetailPage" && props.data)
            setEditor(<MyEditor noteId = {noteId} version={index.toString()} page={props.page}/>)
    }

    const apply = (content) => {
        message.success("apply")
        const data = {
            wantEnterUsersEmail: email,
            commentFromApplicant: content
        }
        console.log("data", data)
        axios.put(`http://localhost:8080/post/apply/${props.postId}`, data)
            .then ( res => {
                console.log(res.data.res)
            })
            .catch(err =>{
                console.log(err)
            })
    }

    const buyNote = () => {
        axios.put(`http://localhost:8080/coin/note/${email}/${props.noteId}`)
        .then ( res => {
            console.log(res.data.res)
            message.success("Bought!")
        })
        .catch(err =>{
            console.log(err)
        })
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
                                    author={props.page == 'NoteDetailPage'? {email: props.data?.headerEmail, name:props.data?.headerName}: props.page == 'CollabDetailPage'? author:{email: props.data?.author, name: props.data?.authorName}}
                                    date={props.data?.date} 
                                    dateFontSize="18"
                                    page={props.page}
                                    setPageProps={props.setPageProps}
                                >T</OPInfo>
                            </Col>
                            <Col className="contentTemplate__Header__middle"span={props.page!='NoteDetailPage'?16:18}>
                                <Title title={props.data?.title} size={props.page!='NoteDetailPage'?'30':'35'}/></Col>
                            <Col className="contentTemplate__Header__right contentTemplate__Dropdown" span={props.page!='NoteDetailPage'?1:2}>
                                <div className="contentTemplate__Dropdown">
                                    <OptionMenu 
                                        page={props.page}
                                        comments={props.data?.comments? props.data.comments:[]} 
                                        versions={versions? versions:props.data?.version? props.data.version:[]} 
                                        public={isPublic}
                                        setIsPublic={setIsPublic}
                                        setVersion={setVersion}
                                        isAuthor={isAuthor}
                                        isManager={isManager}
                                        isFavoriter={isFavoriter}
                                        setPoppedContentShow={setPoppedContentShow}
                                        id={props.postId? props.postId:props.noteId}
                                        postId={props.postId}
                                        noteId={props.noteId? props.noteId:noteId}
                                        setPageProps={props.setPageProps}
                                        author={author}
                                        managerEmail={managerEmail}
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
                                { (props.page=='NoteDetailPage' || (props.page=='CollabDetailPage' && isAuthor)) ? 
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
                                {!(props.data?.headerEmail == email || props.data?.buyer.includes(email)) &&
                                    <div className="contentTemplate__Footer__Button" onClick={() => buyNote()}>
                                        <Button color={"green"}><Text color='white' cls='Large' content={"Buy"} fontSize='17' display="inline-block" /></Button>
                                    </div>   
                                }
                            </>
                        }
                        {/* Todo: also check if he is an origin poster */}
                        {(props.page=='RewardDetailPage' && props.data?.author == email)  &&
                            <div className="contentTemplate__Footer__Button" onClick={() => setPoppedContentShow(true)}>
                                <Button color={"green"}><Text color='white' cls='Large' content={"Show user-contributed Notes"} fontSize='17' display="inline-block" /></Button>
                            </div>
                        }
                        {(props.page=='RewardDetailPage' && props.data?.author != email) &&
                            <div 
                                className="contentTemplate__Footer__Button" 
                                onClick={() => {
                                    /*props.setPageProps({
                                        page: "NoteNewPage",

                                    })*/
                                }}
                            >
                                <Button color={"green"}><Text color='white' cls='Large' content={"Contribute Note"} fontSize='17' display="inline-block" /></Button>
                            </div>
                        }
                        {(props.page=='CollabDetailPage' && !isAuthor) &&
                            <div className="contentTemplate__Footer__Button" onClick={() => setPoppedContentShow(true)}>
                                <Button color={"green"}><Text color='white' cls='Large' content={"Apply"} fontSize='17' display="inline-block" /></Button>
                            </div>
                        }
                        {(props.page=='CollabDetailPage' && isAuthor) &&
                            <div className="contentTemplate__Footer__Button" onClick={()=>{props.setPageProps({page:'CollabNoteEditPage', noteId:noteId, postId:props.postId, isAuthor:isAuthor, isManager:isManager})}}>
                                <Button color={"green"}><Text color='white' cls='Large' content={"Edit"} fontSize='17' display="inline-block" /></Button>
                            </div>
                        }
                        
                    </Footer>
                </Layout>
                
                {/* Sider */}
                {(props.page!='NoteDetailPage' && props.page!='CollabDetailPage') && 
                    <>
                        <Sider id="contentTemplate__Comment" className="contentTemplate__Comment" width='40%'>
                            <CommentArea type="post" page={props.page} comments={props.data?.comments? props.data.comments:[]} id={props.postId}/>
                        </Sider>
                    </>
                }
            </Layout> 
            {/* Popped up Part */}
            <div className={ poppedContentShow && 'popped__blur'}></div>
            <div className={`${ props.page!='CollabDetailPage'? 'popped__Answer': 'popped__Apply'} ${ poppedContentShow && 'popped--show'}`} >
                <PoppedContent page={props.page} content={poppedContent} apply={apply} setPoppedContentShow={setPoppedContentShow} isAuthor={isAuthor} isManager={isManager} postId={props.postId} haveApplied={haveApplied} setHaveApplied={setHaveApplied}/>
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
};

export default PageDetailContentTemplate;