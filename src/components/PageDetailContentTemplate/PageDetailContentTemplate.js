import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Layout, Row, Col, Tag, Progress, message, notification, Avatar, Modal, DatePicker, Select  } from "antd";
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
const { Option } = Select;

const PageDetailContentTemplate = (props) => {

    const [noteId, setNoteId] = useState(null);
    const [poppedContentShow, setPoppedContentShow] = useState(false);
    const [poppedContent, setPoppedContent] = useState([]);
    const [noticeShow, setNoticeShow] = useState(true);
    const [editor, setEditor] = useState(<></>)
    const [isManager, setIsManager] = useState(false)
    const [isAuthor, setIsAuthor] = useState(false)
    const [isFavoriter, setIsFavoriter] = useState(false)
    const [isBuyer, setIsBuyer] = useState(false)
    const [isArchive, setIsArchive] = useState(false)
    const [versions, setVersions] = useState(null)
    const [email, setEmail] = useState('')
    const [author, setAuthor] = useState([])
    const [manager, setManager] = useState('')
    const [haveApplied, setHaveApplied] = useState(null)
    const [isPublic, setIsPublic] = useState(true)
    const [authorEmail, setAuthorEmail] = useState('')
    const [noteType, setNoteType] = useState(null)
    const [isSubmit, setIsSubmit] = useState(false)
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [kickTarget, setKickTarget] = useState('')
    const [kickDate, setKickDate] = useState(null)
    const [kickUserList, setKickUserList] = useState(<></>)

    useEffect(() => {
        const cookieParser = new Cookie(document.cookie)
        const temp = cookieParser.getCookieByName('email')
        const tempEmail = Base64.decode(temp);
        setEmail(tempEmail)
        console.log("tempEmail", tempEmail)
        if (props.page == "NoteDetailPage") {
            setNoteId(props.data?.id);
            setEditor(<MyEditor noteId={props.data?.id} version={'0'} page={props.page} email={email} />)
            setNoteType(props.data?.type)
            setAuthorEmail(props.data?.headerUserObj.userObjEmail)
            if (props.data?.type == 'reward') {
                if (props.data?.submit) setIsSubmit(true)
            }
            if (props.data?.headerUserObj.userObjEmail == tempEmail) setIsAuthor(true)
            else setIsAuthor(false)
            for (let i = 0; i < props.data?.favoriterUserObj.length; i++) {
                if (props.data?.favoriterUserObj[i].userObjEmail == tempEmail) {
                    setIsFavoriter(true);
                    break;
                }
            }
            for (let i = 0; i < props.data?.buyerUserObj.length; i++) {
                if (props.data?.buyerUserObj[i].userObjEmail == tempEmail) {
                    setIsBuyer(true);
                    break;
                }
            }
        }
        else if (props.page == "CollabDetailPage" && props.data) {
            const noteId = props.data.answers[0];
            setNoteId(noteId);
            setIsPublic(props.data?.public)
            axios.get(`http://localhost:8080/note/${noteId}`)
                .then(res => {
                    console.log(res.data.res)
                    const tempNote = res.data.res
                    setVersions(tempNote.version)
                    setManager(tempNote.managerUserObj)


                    /*for(let i = 0; i < props.data?.authorUserObj.length; i++){
                        if(props.data?.emailUserObj[i].userObjEmail == tempEmail){
                            setEditor(<MyEditor noteId = {noteId} version={'0'} page={props.page} email={email}/>)
                            setIsAuthor(true)
                            console.log("is a author")
                            break;
                        } 
                    }*/


                    if ((tempNote.managerUserObj?.userObjEmail == tempEmail) || tempNote.headerUserObj.userObjEmail == tempEmail) {
                        setEditor(<MyEditor noteId={noteId} version={'0'} page={props.page} email={email} />)
                        setIsManager(true)
                        setIsAuthor(true)
                        console.log("is a manager")
                        setPoppedContent(props.data.collabApplyUserObj);
                        console.log("props.data.collabApplyUserObj", props.data.collabApplyUserObj)
                    }
                    else if (tempNote.authorEmail.includes(tempEmail)) {
                        setEditor(<MyEditor noteId={noteId} version={'0'} page={props.page} email={email} />)
                        setIsAuthor(true)
                    }
                    else {
                        setIsAuthor(false)
                        setIsManager(false)
                        if (props.data.collabApply) {
                            for (let i = 0; i < props.data.collabApply.length; i++) {
                                if (props.data.collabApply[i].wantEnterUsersEmail == tempEmail) {
                                    setHaveApplied(props.data.collabApply[i].commentFromApplicant)
                                    break;
                                }
                            }
                        }
                        console.log("is not a manager or author")
                    }

                    for (let i = 0; i < tempNote.favoriterUserObj.length; i++) {
                        if (tempNote.favoriterUserObj[i].userObjEmail == tempEmail) {
                            setIsFavoriter(true)
                            break;
                        }
                    }

                    let tempAuthor = []
                    for (let i = 0; i < tempNote.authorUserObj.length; i++) {
                        tempAuthor = [...tempAuthor, { email: tempNote.authorUserObj[i].userObjEmail, name: tempNote.authorUserObj[i].userObjName, avatar: tempNote.authorUserObj[i].userObjAvatar }]
                    }
                    setAuthor(tempAuthor)
                })
                .catch(err => {
                    console.log(err)
                })

                
            //if(isManager) setPoppedContent( props.data.wantEnterUsersEmail );
            //if(isManager) setPoppedContent( props.data.collabApply );
        }
        else if (props.page == "RewardDetailPage") {
            setIsPublic(props.data?.public)
            setPoppedContent( props.data?.answersUserObj );
            if(props.data?.author == email){
                setIsAuthor(true)
            }
        }
        else if (props.page == "QnADetailPage") {
            setIsPublic(props.data?.public)
            setAuthorEmail(props.data?.author)
            if (props.data?.author == email) {
                setIsAuthor(true)
            }
            if (props.data?.archive) {
                setIsArchive(true)
            }
        }

    }, [props.data])

    useEffect(()=>{
        if (props.data?.voteUserObj?.length > 0 && isAuthor) {
            for(let i = 0; i < props.data?.voteUserObj.length; i++){
                    //setVote(props.data?.vote.length > 0 ? props.data?.voteUserObj[0] : null)
                notification.open({
                    message: (
                    <> 
                        <a>Vote: Kick</a>
                        <a className='vote__Header__Avatar'>
                            <Avatar className='vote__Header__Avatar' style={{cursor:"pointer", marginRight:".5em"}} size={25} src={props.data?.voteUserObj[i].kickTargetUserObj.userObjAvatar} onClick={() => props.setPageProps({page: 'ProfilePage', email: props.data?.voteUserObj[i].kickTargetUserObj.userObjEmail})}></Avatar>
                            <Text className='vote__Header__Name' color='black' cls='Default' content={props.data?.voteUserObj[i].kickTargetUserObj.userObjName} fontSize='15' display="inline-block" />
                        </a>
                        <a>out of group!</a>
                    </>),
                    description:(
                        <VoteArea vote={props.data?.voteUserObj[i]} total={props.data?.emailUserObj.length} postId={props.postId} email={email} />
                    ),
                    placement: 'topLeft',
                    style:{
                        width: "auto"
                    }
                });
            }

        }
    },[isAuthor])

    useEffect(()=>{
        if(isManager && author){
            let votingList = []
            if(props.data?.vote.length > 0){
                for(let i = 0; i < props.data?.vote.length; i++){
                    if(props.data?.vote[i].result == 'yet'){
                        votingList.push(props.data?.vote[i].kickTarget)
                    }
                }
            }
            
            setKickUserList(<>
                {author.map((item, index) => (
                    (item.email==props.data?.author || item.email==manager.userObjEmail || votingList.includes(item.email))?
                        <Option value={item.email} disabled>{item.name}</Option>
                        :
                        <Option value={item.email}>{item.name}</Option>
                    
                    
                ))}
            </>)
        }
    },[isManager, author])



    const setVersion = (index) => {
        if (props.page == "NoteDetailPage")
            setEditor(<MyEditor noteId={props.data?.id} version={index.toString()} page={props.page} email={email} />)
        else if (props.page == "CollabDetailPage" && props.data)
            setEditor(<MyEditor noteId={noteId} version={index.toString()} page={props.page} email={email} />)
    }

    const apply = (content) => {
        message.success("apply")
        const data = {
            wantEnterUsersEmail: email,
            commentFromApplicant: content
        }
        console.log("data", data)
        axios.put(`http://localhost:8080/post/apply/${props.postId}`, data)
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const buyNote = () => {
        let cookieParser = new Cookie(document.cookie);
        let name = cookieParser.getCookieByName('name');
        let avatar = cookieParser.getCookieByName('avatar');
        let success = false;
        axios.put(`http://localhost:8080/coin/note/${email}/${props.noteId}`)
            .then(res => {
                console.log(res.data.res)
                message.success("Bought!")
                if(props.data.type==='normal')
                props.sendPrivateMessage(
                    name + ' has bought your note !',
                    'note',
                    email,
                    name,
                    avatar,
                    props.noteId,
                    props.data.headerEmail
                )
            })
            .catch(err => {
                console.log(err)
            })
      
    }

    const submitRewardNote = () => {
        axios.put(`http://localhost:8080/note/submit/${props.noteId}`)
            .then(res => {
                message.success("Submit!")
                setIsSubmit(true)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const withdrawRewardNote = () => {
        axios.put(`http://localhost:8080/note/withdraw/${props.noteId}`)
            .then(res => {
                message.success("Withdraw!")
                setIsSubmit(false)
            })
            .catch(err => {
                console.log(err)
            })
    }

    /////////// Kick User //////// 
    const showModal = () => {
        setIsModalVisible(true);
      };
    
      const handleOk = () => {
        const date = kickDate.split('-')
        const data = {
            year: date[0],
            month: date[1],
            day: date[2],
            kickTargetEmail: kickTarget,
          }
          console.log("data", data)
          axios.post(`http://localhost:8080/schedule/vote/${props.postId}`, data)
            .then(res => {
              message.success("Vote Submit!!")
              // Todo: remove applicant from list
            })
            .catch(err => {
              console.log(err)
            })
        setIsModalVisible(false);
      };
    
      const handleCancel = () => {
        setIsModalVisible(false);
      };
      const onDateChange = (date, dateString) => {
        setKickDate(dateString)
      };

      const onKickUserChange = (value) => {
        setKickTarget(value);
      }
    //////////////////////////
    return (

        <div className="contentTemplate" >
            <Layout className="contentTemplate__Layout__outer">
                <Layout className="contentTemplate__Layout">
                    {/* Header */}
                    <Header className="contentTemplate__Header" >
                        <Row className="contentTemplate__Row">
                            <Col className="contentTemplate__Header__left" span={props.page != 'NoteDetailPage' ? 7 : 4}>
                                <OPInfo
                                    className="contentTemplate__Title__OPInfo"
                                    size={56}
                                    author={props.page == 'NoteDetailPage' ? { email: props.data?.headerUserObj.userObjEmail, name: props.data?.headerUserObj.userObjName, avatar: props.data?.headerUserObj.userObjAvatar } : props.page == 'CollabDetailPage' ? author : { email: props.data?.authorUserObj?.userObjEmail, name: props.data?.authorUserObj?.userObjName, avatar: props.data?.authorUserObj?.userObjAvatar }}
                                    date={props.data?.date}
                                    dateFontSize="18"
                                    page={props.page}
                                    setPageProps={props.setPageProps}
                                >T</OPInfo>
                            </Col>
                            <Col className="contentTemplate__Header__middle" span={props.page != 'NoteDetailPage' ? 16 : 18}>
                                <Title title={props.data?.title} size={props.page != 'NoteDetailPage' ? '30' : '35'} /></Col>
                            <Col className="contentTemplate__Header__right contentTemplate__Dropdown" span={props.page != 'NoteDetailPage' ? 1 : 2}>
                                <div className="contentTemplate__Dropdown">
                                    <OptionMenu
                                        page={props.page}
                                        comments={props.data?.commentsUserObj ? props.data.commentsUserObj : []}
                                        versions={versions ? versions : props.data?.version ? props.data.version : []}
                                        public={isPublic}
                                        setIsPublic={setIsPublic}
                                        setVersion={setVersion}
                                        isAuthor={isAuthor}
                                        isManager={isManager}
                                        isFavoriter={isFavoriter}
                                        setPoppedContentShow={setPoppedContentShow}
                                        id={props.postId ? props.postId : props.noteId}
                                        postId={props.postId ? props.postId : props.data?.postID}
                                        noteId={props.noteId ? props.noteId : noteId}
                                        sendPrivateMessage={props.sendPrivateMessage}
                                        setPageProps={props.setPageProps}
                                        author={author}
                                        manager={manager}
                                        isArchive={isArchive}
                                        noteType={props.data?.type}
                                        setIsArchive={setIsArchive}
                                        showKickWindow={showModal}
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
                            <Col className='contentTemplate__Content__Title' >
                                <Text color='black' cls='Default' content={"Content:"} fontSize='22' display="inline-block" />
                            </Col>
                        </Row>
                        <Row className='contentTemplate__Row'>
                            <Col className='contentTemplate__Content__Main'>
                                {(props.page == 'NoteDetailPage' || (props.page == 'CollabDetailPage' && isAuthor)) ?
                                    editor
                                    :
                                    props.data?.content
                                }
                            </Col>
                        </Row>
                    </Content>
                    {/* Footer */}
                    <Footer className="contentTemplate__Footer">
                        {props.page == 'NoteDetailPage' &&
                            <>
                                <Text color='black' cls='Default' content={"Tags:"} fontSize='22' display="inline-block" />
                                <span className="left-margin"></span>
                                {props.data?.tag && props.data.tag.map((tag) =>
                                    <>
                                        {/* 
                                        <Text color='black' cls='Default' content={tag} fontSize='18' display="inline-block" /> */}
                                        <Tag style={{ fontSize: "15px" }}>{tag}</Tag>
                                    </>
                                )}
                                {(noteType != 'reward' && !(isAuthor || isBuyer)) &&
                                    <div className="contentTemplate__Footer__Button" onClick={() => buyNote()}>
                                        <Button color={"green"}><Text color='white' cls='Large' content={"Buy"} fontSize='17' display="inline-block" /></Button>
                                    </div>
                                }
                                {(noteType != 'reward' && isAuthor) &&
                                    <div className="contentTemplate__Footer__Button" onClick={() => props.setPageProps({ page: "NoteEditPage", noteId: noteId, action: "edit" })}>
                                        <Button color={"green"}><Text color='white' cls='Large' content={"Edit"} fontSize='17' display="inline-block" /></Button>
                                    </div>
                                }
                                {(noteType == 'reward' && isAuthor) &&
                                    <>
                                        {isSubmit ?
                                            <div className="contentTemplate__Footer__Button" onClick={() => withdrawRewardNote()}>
                                                <Button color={"purple"}><Text color='white' cls='Large' content={"Withdraw"} fontSize='17' display="inline-block" /></Button>
                                            </div>
                                            :
                                            <div className="contentTemplate__Footer__Button" onClick={() => submitRewardNote()}>
                                                <Button color={"purple"}><Text color='white' cls='Large' content={"Submit"} fontSize='17' display="inline-block" /></Button>
                                            </div>
                                        }
                                        <div className="contentTemplate__Footer__Button" onClick={() => props.setPageProps({ page: "NoteEditPage", noteId: noteId, action: "edit" })}>
                                            <Button color={"green"}><Text color='white' cls='Large' content={"Edit"} fontSize='17' display="inline-block" /></Button>
                                        </div>
                                    </>
                                }
                            </>
                        }
                        {/* Todo: also check if he is an origin poster */}
                        {(props.page == 'RewardDetailPage' && isAuthor) &&
                            <div className="contentTemplate__Footer__Button" onClick={() => setPoppedContentShow(true)}>
                                <Button color={"green"}><Text color='white' cls='Large' content={"Show user-contributed Notes"} fontSize='17' display="inline-block" /></Button>
                            </div>
                        }
                        {(props.page == 'RewardDetailPage' && !isAuthor) &&
                            <div
                                className="contentTemplate__Footer__Button"
                                onClick={() => {
                                    props.setPageProps({
                                        page: "NoteNewPage",
                                        action: "newReward",
                                        postId: props.postId,
                                        rewardAuthorEmail:props.data?.authorUserObj?.userObjEmail
                                    })
                                }}
                            >
                                <Button color={"green"}><Text color='white' cls='Large' content={"Contribute Note"} fontSize='17' display="inline-block" /></Button>
                            </div>
                        }
                        {(props.page == 'CollabDetailPage' && !isAuthor) &&
                            <div className="contentTemplate__Footer__Button" onClick={() => setPoppedContentShow(true)}>
                                <Button color={"green"}><Text color='white' cls='Large' content={"Apply"} fontSize='17' display="inline-block" /></Button>
                            </div>
                        }
                        {(props.page == 'CollabDetailPage' && isAuthor) &&
                            <div className="contentTemplate__Footer__Button" onClick={() => { props.setPageProps({ page: 'CollabNoteEditPage', noteId: noteId, postId: props.postId, isAuthor: isAuthor, isManager: isManager }) }}>
                                <Button color={"green"}><Text color='white' cls='Large' content={"Edit"} fontSize='17' display="inline-block" /></Button>
                            </div>
                        }

                    </Footer>
                </Layout>

                {/* Sider */}
                {(props.page != 'NoteDetailPage' && props.page != 'CollabDetailPage') &&
                    <>
                        <Sider id="contentTemplate__Comment" className="contentTemplate__Comment" width='40%'>
                            <CommentArea type="post" page={props.page} comments={props.data?.commentsUserObj ? props.data.commentsUserObj : []} id={props.postId} isArchive={isArchive} isAuthor={isAuthor} authorEmail={authorEmail} />
                        </Sider>
                    </>
                }
            </Layout>
            {/* Popped up Part */}
            <div className={poppedContentShow && 'popped__blur'}></div>
            <div className={`${props.page != 'CollabDetailPage' ? 'popped__Answer' : 'popped__Apply'} ${poppedContentShow && 'popped--show'}`} >
                <PoppedContent email={email}sendPrivateMessage={props.sendPrivateMessage} page={props.page} content={poppedContent} apply={apply} setPoppedContentShow={setPoppedContentShow} isAuthor={isAuthor} isManager={isManager} postId={props.postId} haveApplied={haveApplied} setHaveApplied={setHaveApplied} />
            </div>

            <Modal title="Kick User" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <DatePicker onChange={onDateChange} />
                <Select
                    onChange={onKickUserChange}
                    style={{
                        width: "auto",
                        marginLeft: "1em"
                    }}
                    placeholder="Select a user"
                    >
                    {kickUserList}
                    {/* <Option value="jack">Jack</Option>
                    <Option value="lucy">Lucy</Option>
                    <Option value="Yiminghe">yiminghe</Option> */}
                </Select>
            </Modal>

        </div>
    );
}


PageDetailContentTemplate.defaultProps = {
    data: null,
    versionId: '',
    page: '',
    footerBtn: null,
};

export default PageDetailContentTemplate;