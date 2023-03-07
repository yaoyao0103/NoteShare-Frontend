import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Layout, Row, Col, Tag, Progress, message, notification, Avatar, Modal, DatePicker, Select, Skeleton, Drawer, Divider, Popconfirm } from "antd";
import { CaretLeftFilled, QuestionCircleOutlined } from "@ant-design/icons";
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
const cookieParser = new Cookie(document.cookie)
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
    const [versionNum, setVersionNum] = useState(0)
    const [email, setEmail] = useState('')
    const [author, setAuthor] = useState([])
    const [manager, setManager] = useState('')
    const [haveApplied, setHaveApplied] = useState(null)
    const [isPublic, setIsPublic] = useState(null)
    const [isNotePublic, setIsNotePublic] = useState(null)
    const [authorEmail, setAuthorEmail] = useState('')
    const [noteType, setNoteType] = useState(null)
    const [isSubmit, setIsSubmit] = useState(false)
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [kickTarget, setKickTarget] = useState('')
    const [kickDate, setKickDate] = useState(null)
    const [kickUserList, setKickUserList] = useState(<></>)
    const [refNum, setRefNum] = useState(0)
    const [bestNum, setBestNum] = useState(0)
    const [isAnswered, setIsAnswered] = useState(false)
    const [visible, setVisible] = useState(false);
    const [type, setType] = useState('')
    const [publishDate, setPublishDate] = useState('')
    const [rewardIsEnd, setRewardIsEnd] = useState(false)
    const [collabNoteTags, setCollabNoteTags] = useState([])
    const [plagiarismRate, setPlagiarismRate] = useState(null)
    const [quoteRate, setQuoteRate] = useState(null)
    const [plagiarismRateResult, setPlagiarismRateResult] = useState(null)
    const [quoteRateResult, setQuoteRateResult] = useState(null)

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
        showSider: width >= 768
    }

    useEffect(() => {
        props.setLoading(true);
        const temp = cookieParser.getCookieByName('email')
        if (temp)
            var tempEmail = Base64.decode(temp);
        setEmail(tempEmail)
        if (props.page == "NoteDetailPage") {
            setNoteId(props.data?.id);
            setType("note")
            setEditor(<MyEditor setLoggedIn={props.setLoggedIn} setPageProps={props.setPageProps} noteId={props.data?.id} version={'0'} page={props.page} email={email} />)
            setNoteType(props.data?.type)
            setIsNotePublic(props.data?.public)
            setAuthorEmail(props.data?.headerUserObj.userObjEmail)
            setPlagiarismRate(props.data?.plagiarismPoint)
            setQuoteRate(props.data?.quotePoint)
            setPlagiarismRateResult(props.data?.plagiarismPointResult)
            setQuoteRateResult(props.data?.quotePointResult)
            if (props.data?.type == 'reward') {
                console.log("props.data?.submit", props.data)
                if (props.data?.submit) setIsSubmit(true)
                if (props.data?.best || props.data?.reference) setRewardIsEnd(true)
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
        else if (props.page === "CollabDetailPage" && props.data) {
            const noteId = props.data.answers[0];
            setNoteId(noteId);
            setType("collaboration")
            setIsPublic(props.data?.public)
            axios.get(`/note/${noteId}`)
                .then(res => {
                    console.log(res.data.res)
                    const tempNote = res.data.res
                    setVersions(tempNote.version)
                    setManager(tempNote.managerUserObj)
                    setIsNotePublic(tempNote.public)
                    setPublishDate(tempNote.publishDate)
                    setCollabNoteTags(tempNote.tag)
                    setPlagiarismRate(tempNote.plagiarismPoint)
                    setQuoteRate(tempNote.quotePoint)
                    setPlagiarismRateResult(tempNote.plagiarismPointResult)
                    setQuoteRateResult(tempNote.quotePointResult)
                    /*for(let i = 0; i < props.data?.authorUserObj.length; i++){
                        if(props.data?.emailUserObj[i].userObjEmail == tempEmail){
                            setEditor(<MyEditor noteId = {noteId} version={'0'} page={props.page} email={email}/>)
                            setIsAuthor(true)
                            console.log("is a author")
                            break;
                        } 
                    }*/


                    if (((tempNote.managerUserObj?.userObjEmail == tempEmail) || tempNote.headerUserObj.userObjEmail == tempEmail) && tempEmail) {
                        setEditor(<MyEditor setLoggedIn={props.setLoggedIn} setPageProps={props.setPageProps} noteId={noteId} version={'0'} page={props.page} email={email} />)
                        setIsManager(true)
                        setIsAuthor(true)
                        console.log("is a manager")
                        setPoppedContent(props.data.collabApplyUserObj);
                        console.log("props.data.collabApplyUserObj", props.data.collabApplyUserObj)
                    }
                    else if (tempNote.authorEmail.includes(tempEmail) && tempEmail) {
                        setEditor(<MyEditor setLoggedIn={props.setLoggedIn} setPageProps={props.setPageProps} noteId={noteId} version={'0'} page={props.page} email={email} />)
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
                        tempAuthor = [...tempAuthor, { email: tempNote.authorUserObj[i].userObjEmail, name: tempNote.authorUserObj[i].userObjName, avatar: "https://gravatar.com/avatar/7fdc37318319569a920fd7d087c14d1f?s=400&d=robohash&r=x" }]
                    }
                    setAuthor(tempAuthor)
                    props.setLoading(false);
                })
                .catch(err => {
                    if (err.response.status === 500 || err.response.status === 404 || err.response.status === 403) {
                        if (err.response.data.message.slice(0, 13) === 'Malformed JWT') {
                            document.cookie = 'error=Jwt'
                            message.destroy()
                            message.warning('The connection timed out, please login again !')
                            document.cookie = 'email=;'
                            props.setLoggedIn(false)
                            props.setPageProps({ page: 'LoginPage' })
                        }
                        else
                            document.cookie = 'error=true'
                        message.error('Server Error! Please refresh again! (Get Collaboration Note Error)')
                    }
                    else {
                        message.error("Server Error! Please try again later. (Get Collaboration Note Error)")
                    }
                })


            //if(isManager) setPoppedContent( props.data.wantEnterUsersEmail );
            //if(isManager) setPoppedContent( props.data.collabApply );
        }
        else if (props.page === "RewardDetailPage") {
            setType("reward")
            if (props.data?.answersUserObj?.length > 0) {
                for (let i = 0; i < props.data?.answersUserObj?.length; i++) {
                    if (props.data?.answersUserObj[i].best) {
                        setBestNum(bestNum + 1);
                    }
                }
            }
            setIsPublic(props.data?.public)
            setPoppedContent(props.data?.answersUserObj);
            if (props.data?.author == email) {
                setIsAuthor(true)
            }
        }
        else if (props.page === "QnADetailPage") {
            setType("QA")
            setIsPublic(props.data?.public)
            setAuthorEmail(props.data?.author)
            if (props.data?.author == email) {
                setIsAuthor(true)
            }
            if (props.data?.answers) {
                if (props.data?.answers.length == 1) {
                    setIsAnswered(true)
                }
            }
            if (props.data?.archive) {
                setIsArchive(true)
            }

        }
        props.setLoading(false);
    }, [props.data])

    useEffect(() => {
        if (bestNum === 1 && props.data?.referenceNumber === 0) {
            setIsAnswered(true);
        }
    }, [bestNum])

    useEffect(() => {
        if (isAnswered && props.page == 'RewardDetailPage') {
            notification.open({
                message: "The author has selected all answers",
                description: "You cannot contribute any note now",
                placement: 'bottomLeft',
                style: {
                    width: "auto"
                }
            });
        }
    }, [isAnswered])

    useEffect(() => {
        if (props.data?.voteUserObj?.length > 0 && isAuthor) {
            for (let i = 0; i < props.data?.voteUserObj.length; i++) {
                //setVote(props.data?.vote.length > 0 ? props.data?.voteUserObj[0] : null)
                if (props.data?.voteUserObj[i].result == "yet")
                    notification.open({
                        message: (
                            <>
                                <a>Vote: Kick</a>
                                <a className='vote__Header__Avatar'>
                                    <Avatar className='vote__Header__Avatar' style={{ cursor: "pointer", marginRight: ".5em" }} size={25} src={"https://gravatar.com/avatar/7fdc37318319569a920fd7d087c14d1f?s=400&d=robohash&r=x"} onClick={() => props.setPageProps({ page: 'ProfilePage', email: props.data?.voteUserObj[i].kickTargetUserObj.userObjEmail })}></Avatar>
                                    <Text className='vote__Header__Name' color='black' cls='Default' content={props.data?.voteUserObj[i].kickTargetUserObj.userObjName} fontSize='15' display="inline-block" />
                                </a>
                                <a>out of group!</a>
                            </>),
                        description: (
                            <VoteArea setLoggedIn={props.setLoggedIn} setPageProps={props.setPageProps} vote={props.data?.voteUserObj[i]} total={props.data?.emailUserObj.length} postId={props.postId} email={email} />
                        ),
                        placement: 'topLeft',
                        style: {
                            width: "auto"
                        }
                    });
            }

        }
    }, [isAuthor])

    useEffect(() => {
        if (isManager && author) {
            let votingList = []
            if (props.data?.vote.length > 0) {
                for (let i = 0; i < props.data?.vote.length; i++) {
                    if (props.data?.vote[i].result == 'yet') {
                        votingList.push(props.data?.vote[i].kickTarget)
                    }
                }
            }

            setKickUserList(<>
                {author.map((item, index) => (
                    (item.email == props.data?.author || item.email == manager?.userObjEmail || votingList.includes(item.email)) ?
                        <Option value={item.email} disabled>{item.name}</Option>
                        :
                        <Option value={item.email}>{item.name}</Option>


                ))}
            </>)
        }
    }, [isManager, author])




    const setVersion = (index) => {
        if (props.page == "NoteDetailPage")
            setEditor(<MyEditor setLoggedIn={props.setLoggedIn} setPageProps={props.setPageProps} noteId={props.data?.id} version={index.toString()} page={props.page} email={email} />)
        else if (props.page == "CollabDetailPage" && props.data)
            setEditor(<MyEditor setLoggedIn={props.setLoggedIn} setPageProps={props.setPageProps} noteId={noteId} version={index.toString()} page={props.page} email={email} />)
        setVersionNum(index)
    }

    const apply = (content) => {
        if (cookieParser.getCookieByName('email')) {
            //message.success("apply")
            const data = {
                wantEnterUsersEmail: email,
                commentFromApplicant: content
            }
            console.log("data", data)
            axios.put(`/post/apply/${props.postId}`, data, {
                headers: {
                    'Authorization': 'Bearer ' + cookieParser.getCookieByName("token"),
                }
            })
                .then(res => {
                    message.success("You submitted your application!")
                    console.log(res)
                })
                .catch(err => {
                    if (err.response.status === 500 || err.response.status === 404 || err.response.status === 403) {
                        if (err.response.data.message.slice(0, 13) === 'Malformed JWT') {
                            document.cookie = 'error=Jwt'
                            message.destroy()
                            message.warning('The connection timed out, please login again !')
                            document.cookie = 'email=;'
                            props.setLoggedIn(false)
                            props.setPageProps({ page: 'LoginPage' })
                        }
                        else
                            document.cookie = 'error=true'
                        message.error('Server Error! Please refresh again! (Submit Application Error)')
                    }
                    else {
                        message.error("Server Error! Please try again later. (Submit Application Error)")
                    }
                })
        }
        else {
            message.error("Please log in first!")
            props.setPageProps({ page: 'LoginPage' })
        }
    }

    const buyNote = () => {
        let cookieParser = new Cookie(document.cookie);
        let name = cookieParser.getCookieByName('name');
        let avatar = "https://gravatar.com/avatar/7fdc37318319569a920fd7d087c14d1f?s=400&d=robohash&r=x";
        let success = false;
        if (email) {
            axios.put(`/coin/note/${email}/${props.noteId}`, {}, {
                headers: {
                    'Authorization': 'Bearer ' + cookieParser.getCookieByName("token"),
                }
            })
                .then(res => {
                    props.setCoinNum(props.coinNum - props.data?.price)
                    console.log(res.data.res)
                    message.success("You bought this note!")
                    setIsBuyer(true);
                    if (props.data.type === 'normal')
                        props.sendPrivateMessage(
                            name + ' has bought your note !',
                            'note',
                            email,
                            name,
                            "https://gravatar.com/avatar/7fdc37318319569a920fd7d087c14d1f?s=400&d=robohash&r=x",
                            props.noteId,
                            props.data.headerEmail
                        )
                })
                .catch(err => {
                    if (err.response.status === 500 || err.response.status === 404 || err.response.status === 403) {
                        if (err.response.data.message.slice(0, 13) === 'Malformed JWT') {
                            document.cookie = 'error=Jwt'
                            message.destroy()
                            message.warning('The connection timed out, please login again !')
                            document.cookie = 'email=;'
                            props.setLoggedIn(false)
                            props.setPageProps({ page: 'LoginPage' })
                        }
                        else
                            document.cookie = 'error=true'
                        message.error('Server Error! Please refresh again! (Buy Note Error)')
                    }
                    else {
                        message.error("Server Error! Please try again later. (Buy Note Error)")
                    }
                })
        }
        else {
            message.warn("Please log in first!")
            props.setPageProps({
                page: "LoginPage"
            })
        }

    }

    const submitRewardNote = () => {
        axios.put(`/note/submit/${props.noteId}`, {}, {
            headers: {
                'Authorization': 'Bearer ' + cookieParser.getCookieByName("token"),
            }
        })
            .then(res => {
                message.success("You submitted your reward note!")
                setIsSubmit(true)
            })
            .catch(err => {
                if (err.response.status === 500 || err.response.status === 404 || err.response.status === 403) {
                    if (err.response.data.message.slice(0, 13) === 'Malformed JWT') {
                        document.cookie = 'error=Jwt'
                        message.destroy()
                        message.warning('The connection timed out, please login again !')
                        document.cookie = 'email=;'
                        props.setLoggedIn(false)
                        props.setPageProps({ page: 'LoginPage' })
                    }
                    else
                        document.cookie = 'error=true'
                    message.error('Server Error! Please refresh again! (Submit Reward Note Error)')
                }
                else {
                    message.error("Server Error! Please try again later. (Submit Reward Note Error)")
                }
            })
    }

    const withdrawRewardNote = () => {
        axios.put(`/note/withdraw/${props.noteId}`, {}, {
            headers: {
                'Authorization': 'Bearer ' + cookieParser.getCookieByName("token"),
            }
        })
            .then(res => {
                message.success("You withdrawn your reward note!")
                setIsSubmit(false)
            })
            .catch(err => {
                if (err.response.status === 500 || err.response.status === 404 || err.response.status === 403) {
                    if (err.response.data.message.slice(0, 13) === 'Malformed JWT') {
                        document.cookie = 'error=Jwt'
                        message.destroy()
                        message.warning('The connection timed out, please login again !')
                        document.cookie = 'email=;'
                        props.setLoggedIn(false)
                        props.setPageProps({ page: 'LoginPage' })
                    }
                    else
                        document.cookie = 'error=true'
                    message.error('Server Error! Please refresh again! (Withdraw Reward Note Error)')
                }
                else {
                    message.error("Server Error! Please try again later. (Withdraw Reward Note Error)")
                }
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
        axios.post(`/schedule/vote/${props.postId}`, data, {
            headers: {
                'Authorization': 'Bearer ' + cookieParser.getCookieByName("token"),
            }
        })
            .then(res => {
                message.success("You created a vote of kicking an author!")
                // Todo: remove applicant from list
            })
            .catch(err => {
                if (err.response.status === 500 || err.response.status === 404 || err.response.status === 403) {
                    if (err.response.data.message.slice(0, 13) === 'Malformed JWT') {
                        document.cookie = 'error=Jwt'
                        message.destroy()
                        message.warning('The connection timed out, please login again !')
                        document.cookie = 'email=;'
                        props.setLoggedIn(false)
                        props.setPageProps({ page: 'LoginPage' })
                    }
                    else
                        document.cookie = 'error=true'
                    message.error('Server Error! Please refresh again! (Create Vote Error)')
                }
                else {
                    message.error("Server Error! Please try again later. (Create Vote Error)")
                }
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

    const refreshAnswer = () => {
        axios.get(`/post/${props.postId}`)
            .then(res => {
                setPoppedContent(res.data.res.answersUserObj);
            })
            .catch(err => {
                if (err.response.status === 500 || err.response.status === 404 || err.response.status === 403) {
                    if (err.response.data.message.slice(0, 13) === 'Malformed JWT') {
                        document.cookie = 'error=Jwt'
                        message.destroy()
                        message.warning('The connection timed out, please login again !')
                        document.cookie = 'email=;'
                        props.setLoggedIn(false)
                        props.setPageProps({ page: 'LoginPage' })
                    }
                    else
                        document.cookie = 'error=true'
                    message.error('Server Error! Please refresh again! (Refresh Answer Error)')
                }
                else {
                    message.error("Server Error! Please try again later. (Refresh Answer Error)")
                }
            })
    }

    // Drawer
    const showDrawer = () => {
        setVisible(true);
    };

    const onClose = () => {
        setVisible(false);
    };

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
                                    author={props.page == 'NoteDetailPage' ? { email: props.data?.headerUserObj.userObjEmail, name: props.data?.headerUserObj.userObjName, avatar: "https://gravatar.com/avatar/7fdc37318319569a920fd7d087c14d1f?s=400&d=robohash&r=x" } : props.page == 'CollabDetailPage' ? author : { email: props.data?.authorUserObj?.userObjEmail, name: props.data?.authorUserObj?.userObjName, avatar: props.data?.authorUserObj?.userObjAvatar }}
                                    date={props.data?.date}
                                    dateFontSize="18"
                                    page={props.page}
                                    setPageProps={props.setPageProps}
                                >T</OPInfo>
                            </Col>
                            <Col className="contentTemplate__Header__middle" span={props.page != 'NoteDetailPage' ? 16 : 18}>
                                {props.data?.title ?
                                    <Title title={props.data.title} size={props.page != 'NoteDetailPage' ? '30' : '35'} />
                                    :
                                    <Skeleton />
                                }
                            </Col>
                            <Col className="contentTemplate__Header__right contentTemplate__Dropdown" span={props.page != 'NoteDetailPage' ? 1 : 2}>
                                <div className="contentTemplate__Dropdown">
                                    <OptionMenu
                                        setLoggedIn={props.setLoggedIn}
                                        page={props.page}
                                        comments={props.data?.commentsUserObj ? props.data.commentsUserObj : []}
                                        versions={versions ? versions : props.data?.version ? props.data.version : []}
                                        public={isPublic}
                                        notePublic={isNotePublic}
                                        setIsPublic={setIsPublic}
                                        setIsNotePublic={setIsNotePublic}
                                        setVersion={setVersion}
                                        setVersions={setVersions}
                                        isAuthor={isAuthor}
                                        isManager={isManager}
                                        isFavoriter={isFavoriter}
                                        setIsFavoriter={setIsFavoriter}
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
                                        isBuyer={isBuyer}
                                        email={email}
                                        isAnswered={isAnswered}
                                        vote={props.data?.voteUserObj}
                                        publishDate={publishDate}
                                        type={type}
                                        rewardIsEnd={rewardIsEnd}
                                        title={props.data?.title}
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
                                    bestPrice={props.data?.bestPrice ? props.data?.bestPrice : props.data?.price}
                                    referencePrice={props.data?.referencePrice}
                                    remainBest={props.page == "RewardDetailPage" ? 1 - bestNum : null}
                                    remainRef={props.data?.referenceNumber}
                                    downloadable={props.data?.downloadable}
                                    public={isPublic}
                                    notePublic={isNotePublic}
                                    type={type}
                                    plagiarismRate={plagiarismRate}
                                    quoteRate={quoteRate}
                                    plagiarismRateResult={plagiarismRateResult}
                                    quoteRateResult={quoteRateResult}
                                />
                            </Col>
                        </Row>
                        <Divider />
                        <Row className='contentTemplate__Row'>
                            <Col className='contentTemplate__Content__Title' >
                                <Text color='black' cls='Small' content={"Content:"} fontSize='22' display="inline-block" />
                            </Col>
                        </Row>

                        <Row className='contentTemplate__Row'>
                            <Col className='contentTemplate__Content__Main'>




                                {(props.page == 'NoteDetailPage' || (props.page == 'CollabDetailPage' && isAuthor)) ?
                                    <div className={(!isAuthor && !isBuyer) && "contentTemplate__Content__Main__Blur"}>
                                        {editor}
                                    </div>
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
                                        <Tag style={{ fontSize: "15px" }}><p style={{ cursor: 'pointer' }} onClick={() => (props.setPageProps({ page: 'TagOutlinePage', tag: tag, pageNumber: 1 }))}>{tag}</p></Tag>
                                    </>
                                )}
                                {(noteType != 'reward' && !(isAuthor || isBuyer)) &&
                                    <Popconfirm
                                        title="Are you sure to buy the note?"
                                        okText="Yes"
                                        cancelText="No"
                                        onConfirm={() => {
                                            buyNote();
                                        }}
                                    >
                                        <div className="contentTemplate__Footer__Button">
                                            <Button color={"green"}><Text color='white' cls='Large' content={"Buy"} fontSize='17' display="inline-block" /></Button>
                                        </div>
                                    </Popconfirm>

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
                        {((props.page == 'RewardDetailPage') && !isAuthor && !(bestNum == 1 && props.data?.referenceNumber == 0)) &&
                            <div
                                className="contentTemplate__Footer__Button"
                                onClick={() => {
                                    props.setPageProps({
                                        page: "NoteNewPage",
                                        action: "newReward",
                                        postId: props.postId,
                                        rewardAuthorEmail: props.data?.authorUserObj?.userObjEmail
                                    })
                                }}
                            >
                                <Button color={"green"}><Text color='white' cls='Large' content={"Contribute Note"} fontSize='17' display="inline-block" /></Button>
                            </div>
                        }

                        {(props.page == 'CollabDetailPage' && !isAuthor) &&
                            <>
                                <Text color='black' cls='Default' content={"Tags:"} fontSize='22' display="inline-block" />
                                <span className="left-margin"></span>
                                {collabNoteTags.map((tag) =>
                                    <>
                                        {/* 
                                    <Text color='black' cls='Default' content={tag} fontSize='18' display="inline-block" /> */}
                                        <Tag style={{ fontSize: "15px" }}><p style={{ cursor: 'pointer' }} onClick={() => (props.setPageProps({ page: 'TagOutlinePage', tag: tag, pageNumber: 1 }))}>{tag}</p></Tag>
                                    </>
                                )}
                                <div className="contentTemplate__Footer__Button" onClick={() => setPoppedContentShow(true)}>
                                    <Button color={"green"}><Text color='white' cls='Large' content={"Apply"} fontSize='17' display="inline-block" /></Button>
                                </div>
                            </>
                        }
                        {(props.page == 'CollabDetailPage' && isAuthor) &&
                            <>
                                <Text color='black' cls='Default' content={"Tags:"} fontSize='22' display="inline-block" />
                                <span className="left-margin"></span>
                                {collabNoteTags.map((tag) =>
                                    <>
                                        {/* 
                                        <Text color='black' cls='Default' content={tag} fontSize='18' display="inline-block" /> */}
                                        <Tag style={{ fontSize: "15px" }}>{tag}</Tag>
                                    </>
                                )}
                                <div className="contentTemplate__Footer__Button" onClick={() => { props.setPageProps({ page: 'CollabNoteEditPage', noteId: noteId, postId: props.postId, isAuthor: isAuthor, isManager: isManager }) }}>
                                    <Button color={"green"}><Text color='white' cls='Large' content={"Edit"} fontSize='17' display="inline-block" /></Button>
                                </div>
                            </>
                        }

                    </Footer>

                </Layout>

                {/* Sider */}
                {(props.page != 'NoteDetailPage' && props.page != 'CollabDetailPage') &&
                    <>
                        {responsive.showSider?
                        <Sider id="contentTemplate__Comment" className="contentTemplate__Comment" width={props.page == "QnADetailPage" ? '50%' : '40%'}>
                            <CommentArea type="post" setLoggedIn={props.setLoggedIn} setPageProps={props.setPageProps} page={props.page} comments={props.data?.commentsUserObj ? props.data.commentsUserObj : []} id={props.postId} isArchive={isArchive} isAuthor={isAuthor} authorEmail={authorEmail} setIsAnswered={setIsAnswered}/>
                        </Sider>
                        :
                        <div style={{paddingLeft: "1.5em", backgroundColor: "#fff"}}>
                            <CommentArea type="post" setLoggedIn={props.setLoggedIn} setPageProps={props.setPageProps} page={props.page} comments={props.data?.commentsUserObj ? props.data.commentsUserObj : []} id={props.postId} isArchive={isArchive} isAuthor={isAuthor} authorEmail={authorEmail} setIsAnswered={setIsAnswered}/>
                        </div>
                        }
                    </>
                }
            </Layout>
            {/* Popped up Part */}
            <div className={poppedContentShow && 'popped__blur'}></div>
            <div className={`${props.page != 'CollabDetailPage' ? 'popped__Answer' : 'popped__Apply'} ${poppedContentShow && 'popped--show'}`} >
                <PoppedContent setLoggedIn={props.setLoggedIn} setPageProps={props.setPageProps} email={email} sendPrivateMessage={props.sendPrivateMessage} page={props.page} content={poppedContent} apply={apply} setPoppedContentShow={setPoppedContentShow} isAuthor={isAuthor} isManager={isManager} postId={props.postId} haveApplied={haveApplied} setHaveApplied={setHaveApplied} refreshAnswer={refreshAnswer} />
            </div>

            <Modal title="Kick User Vote" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
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

            {(props.page == "NoteDetailPage" || props.page == "CollabDetailPage") &&
                <div className='note__CommentAreaButton' onClick={showDrawer}>
                    <div className='note__CommentAreaButton__Title'>Comment</div>
                    <CaretLeftFilled />
                </div>
            }

            <Drawer title={"Comment"} placement="right" onClose={onClose} visible={visible}>
                <CommentArea setLoggedIn={props.setLoggedIn} setPageProps={props.setPageProps} page={props.page} type="note" comments={props.data?.commentsUserObj ? props.data.commentsUserObj : []} id={props.postId ? props.postId : props.noteId} />
            </Drawer>


        </div>
    );
}


export default PageDetailContentTemplate;