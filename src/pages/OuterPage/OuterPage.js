import React, { useState, useEffect } from 'react'
import SockJS from "sockjs-client"
import axios from 'axios';
import { Base64 } from 'js-base64';
import { over } from "stompjs"
import MemberPage from "../MemberPage/MemberPage";
import QnADetailPage from "../QnADetailPage/QnADetailPage";
import NoteDetailPage from "../NoteDetailPage/NoteDetailPage";
import NoteOutlinePage from "../NoteOutlinePage/NoteOutlinePage";
import TagOutlinePage from '../TagOutlinePage/TagOutlinePage';
import RewardDetailPage from "../RewardDetailPage/RewardDetailPage";
import RewardOutlinePage from "../RewardOutlinePage/RewardOutlinePage";
import RewardRecommendPage from '../RewardRecommendPage/RewardRecommendPage';
import QnAOutlinePage from "../QnAOutlinePage/QnAOutlinePage";
import QnARecommendPage from '../QnARecommendPage/QnARecommendPage';
import CollabDetailPage from "../CollabDetailPage/CollabDetailPage";
import CollabOutlinePage from "../CollabOutlinePage/CollabOutlinePage";
//import ScreenShotCapture from "../ScreenShotCapture";
import QnAEditPage from "../QnAEditPage/QnAEditPage";
import RewardEditPage from "../RewardEditPage/RewardEditPage";
import CollabEditPage from "../CollabEditPage/CollabEditPage";
import NoteEditPage from "../NoteEditPage/NoteEditPage";
import FolderOutlinePage from '../FolderOutlinePage/FolderOutlinePage';
import ProfilePage from "../ProfilePage/ProfilePage";
import PersonalPage from "../PersonalPage/PersonalPage";
import LoginPage from "../LoginPage/LoginPage";
import SignUpPage from "../SignUpPage/SignUpPage";
import VerificationPage from "../VerificationPage/VerificationPage";
import ForgetPasswordPage from '../ForgetPasswordPage/ForgetPasswordPage';
import Navbar from '../../components/Navbar/Navbar';
import { QuestionCircleOutlined, PlusOutlined, ArrowLeftOutlined, EllipsisOutlined, UpOutlined, DownOutlined, FileTextOutlined, MessageOutlined, TeamOutlined, FileSearchOutlined } from "@ant-design/icons";
import CollabNoteEditPage from "../CollabNoteEditPage/CollabNoteEditPage";
import CollabRecommendPage from '../CollabRecommendPage/CollabRecommendPage';
import ResetPasswordPage from '../ResetPasswordPage/ResetPasswordPage';
import './OuterPage.css'
import { Button, Drawer, message, Spin, notification, Avatar, Tooltip } from 'antd'
import Text from '../../components/Text/Text';
import { LoadingOutlined } from '@ant-design/icons';

import { RadiusBottomleftOutlined } from '@ant-design/icons';
import { timers } from 'jquery';
import Cookie from '../../components/Cookies/Cookies';
import { set } from 'react-hook-form';
import { editor } from '../../api_utils/geditor_config';
var sock
var stompClient;
var cookieParser = new Cookie(document.cookie);
// var hasBack = false
// var hasChange = true
// var isDone = false
const OuterPage = () => {
    const [isConnect, setIsConnect] = useState(false)
    //const [pageBeforeProps, setPageBeforeProps] = useState({ page: 'LoginPage' });
    //const [pageBeforeNumber, setPageBeforeNumber] = useState(1);
    const [pageProps, setPageProps] = useState({ page: 'LoginPage' });
    const [pageComponent, setPageComponent] = useState(<></>)
    const [loggedIn, setLoggedIn] = useState(false);
    const [changeAvatar, setChangeAvatar] = useState(0);
    const [coinNum, setCoinNum] = useState(0);
    const [floatButtonVisable, setFloatButtonVisable] = useState(false);
    const [floatButtonDetailVisable, setFloatButtonDetailVisable] = useState(false);
    const [pageStack, setPageStack] = useState([]);
    const [backMode, setBackMode] = useState(false);
    const [loading, setLoading] = useState(true);
    const [changePage, setChangePage] = useState(1);
    //const [pageNumber, setPageNumber] = useState(1);
    const [ringNumber, setRingNumber] = useState(0);
    const [ringList, setRingList] = useState([]);
    const [isChanging, setIsChanging] = useState(false);
    const [api, contextHolder] = notification.useNotification();
    const [pageLabel, setPageLabel] = useState(null)



    const changePageNumber = (pageNumber) => {
        console.log('1231')
        setPageProps({
            page: pageProps.page,
            pageNumber: pageNumber,
            sortMode: pageProps.sortMode ? pageProps.sortMode : '',
            keyword: pageProps.keyword ? pageProps.keyword : null,
            school: pageProps.school ? pageProps.school : null,
            subject: pageProps.subject ? pageProps.subject : null,
            department: pageProps.department ? pageProps.department : null,
            professor: pageProps.professord ? pageProps.professor : null,
            headerName: pageProps.headerName ? pageProps.headerName : null,
            tag: pageProps.tag ? pageProps.tag : [],
            download: pageProps.download ? pageProps.download : null,
        })
    }

    const setSortMode = (sortMode) => {
        console.log('2231')
        setPageProps({
            page: pageProps.page,
            pageNumber: 1,
            sortMode: sortMode,
            keyword: pageProps.keyword ? pageProps.keyword : null,
            school: pageProps.school ? pageProps.school : null,
            subject: pageProps.subject ? pageProps.subject : null,
            department: pageProps.department ? pageProps.department : null,
            professor: pageProps.professord ? pageProps.professor : null,
            headerName: pageProps.headerName ? pageProps.headerName : null,
            tag: pageProps.tag ? pageProps.tag : [],
            download: pageProps.download ? pageProps.download : null,
        })
    }
    const changePageFunction = () => {
        setChangePage(current => current + 1)
        console.log(changePage)
    }



    const connect = () => {
        // postID = (location.state === 'genewang7@gmail.com') ? 12345 : 67890
        if (!isConnect) {
            setIsConnect(true)
            sock = new SockJS('http://localhost:8080/websocket')
            stompClient = over(sock)
            stompClient.connect({}, onConnected, (err) => {
                setIsConnect(false)
                console.log(err)
            })
        }
    }

    function closeConnection() {
        if (isConnect)
            sock.close();
    }

    const onConnected = (frame) => {


        let tempEmail = cookieParser.getCookieByName('email');
        if (tempEmail)
            tempEmail = Base64.decode(tempEmail);
        let tempRing = ringNumber
        axios.get("http://localhost:8080/bell/" + tempEmail, {
            headers: {
                'Authorization': 'Bearer ' + cookieParser.getCookieByName("token"),
            }
        }).then(res => {

            for (let i in res.data.res) {   //訂閱"他人"地址，接收"他人"發送的訊息
                stompClient.subscribe(`/topic/bell-messages/${res.data.res[i].userObjEmail}`, (message) => {   //拿user 後端轉bell
                    openNotification('bottomLeft', JSON.parse(message.body))
                    setRingNumber(tempRing + 1)
                    setRingList(oldArray => [...oldArray, JSON.parse(message.body)])
                })
            }

        }).catch((error) => {
            //message.info(error.response.error);
            if (error.response.status === 500 || error.response.status === 404 || error.response.status === 403) {
                if (error.response.data.message.slice(0, 13) === 'Malformed JWT') {
                    document.cookie = 'error=Jwt'
                    message.destroy()
                    message.warning('The connection timed out, please login again !')
                    document.cookie = 'email=;'
                    setLoggedIn(false)
                    setPageProps({ page: 'LoginPage' })
                }
                else
                    document.cookie = 'error=true'
                message.error("Server Error! Please refresh again! (Get User's Bell Error)")
            }
            else {
                message.error("Server Error! Please try again later. (Get User's Bell Error)")
            }

        })

        stompClient.subscribe('/user/' + tempEmail + '/topic/private-messages', (message) => {
            // console.log(JSON.parse(message.body))

            openNotification('bottomLeft', JSON.parse(message.body))
            setRingNumber(tempRing + 1)
            setRingList(oldArray => [...oldArray, JSON.parse(message.body)])

        })
    }


    const sendBellMessage = (msg, type, userObjEmail, userObjName, userObjAvatar, id) => {  //地址指向"自己"，由"自己"發送訊息
        let messageObj = {
            'message': msg,
            'type': type,
            'userObj': {
                'userObjEmail': userObjEmail,
                'userObjName': userObjName,
                'userObjAvatar': userObjAvatar
            },
            'id': id,

        }

        stompClient.send(`/app/bell-messages/${userObjEmail}`, {}, JSON.stringify(messageObj))
    }

    const sendPrivateMessage = (msg, type, userObjEmail, userObjName, userObjAvatar, id, receiver) => {
        let messageObj = {
            'message': msg,
            'type': type,
            'userObj': {
                'userObjEmail': userObjEmail,
                'userObjName': userObjName,
                'userObjAvatar': userObjAvatar
            },
            'id': id,
            'receiverEmail': receiver
        }
        stompClient.send("/app/private-messages", {}, JSON.stringify(messageObj))
    }

    const openNotification = (placement, message) => {
        notification.info({
            //message: message.userObj.userObjName,
            description: message.message,
            icon: (
                <Avatar className="toast__Avatar" style={{ marginRight: '5em' }} size={40} src={message.userObj.userObjAvatar}></Avatar>
            ),
            placement,
            style: {
                width: '25em',
                minHeight: "5em"
            }

        });
    };


    useEffect(() => {
        console.log('111')
        const cookieParser = new Cookie(document.cookie)
        const email = cookieParser.getCookieByName('email')
        if (email) {
            connect();
            setLoggedIn(true);
            setPageProps({ page: 'MemberPage', pageNumber: 1, sortMode: 'likeCount' })
        }
        const tempPageProps = cookieParser.getCookieByName('pageProps')
        if (tempPageProps) {
            const temp = JSON.parse(tempPageProps)
            //console.log("temp", temp)
            setPageProps(temp)

        }
    }, [])
    useEffect(() => {
        console.log('222')
        const cookieParser = new Cookie(document.cookie)
        const tempPageProps = cookieParser.getCookieByName('pageProps')
        if (!tempPageProps) {
            if (loggedIn) {
                setPageStack(oldArray => [...oldArray.slice(0, 0)]);
                setPageProps({ page: 'MemberPage', pageNumber: 1, sortMode: 'likeCount' })

            }
            else {

                setPageProps({ page: 'LoginPage' })
            }
        }

        if (!loggedIn)
            closeConnection()
        else
            connect();
    }, [loggedIn])

    useEffect(() => {
        if (pageStack[0]?.pageProps.page === 'LoginPage' && pageStack[1]?.pageProps.page === 'LoginPage')
            setPageStack(oldArray => [...oldArray.slice(0, 1)])
    }, [pageStack])

    useEffect(() => {
        //console.log('ringNumber:', ringNumber)
    }, [ringNumber])

    useEffect(() => {
        console.log('333')
        console.log(pageProps.page)

        if (cookieParser.getCookieByName('error') && cookieParser.getCookieByName('error') === 'true') {
            document.cookie = 'error=' + 'false'
            setPageProps({ page: 'MemberPage', pageNumber: 1, sortMode: 'likeCount' })
            message.error('Server error!')
        }
        else if (cookieParser.getCookieByName('error') && cookieParser.getCookieByName('error') === 'Jwt') {
            document.cookie = 'error=' + 'false'
            document.cookie = 'email='
            document.cookie = 'token='
            document.cookie = 'name='
            document.cookie = 'avatar='
            setLoggedIn(false)
            setPageProps({ page: "LoginPage" })
            message.error('Server error!')
        }
        else {
            document.cookie = 'error=' + 'false'
            if ((pageProps.page === 'NoteEditPage' || pageProps.page === 'NoteNewPage' ||
                pageProps.page === 'RewardEditPage' || pageProps.page === 'RewardNewPage' ||
                pageProps.page === 'QnAEditPage' || pageProps.page === 'QnANewPage' ||
                pageProps.page === 'CollabEditPage' || pageProps.page === 'CollabNewPage' ||
                pageProps.page === 'PersonalPage' || pageProps.page === 'ProfilePage' || pageProps.page === 'ResetPasswordPage'
            ) && !loggedIn) {
                message.warn("Please log in first!")
                setPageProps({ page: "LoginPage" })
            }
            else if ((pageProps.page === 'LoginPage' || pageProps.page === 'SignUpPage' ||
                pageProps.page === 'VerificationPage' || pageProps.page === 'ForgetPasswordPage'
            ) && loggedIn) {
                message.warn("Please log out first!")
                setPageProps({ page: 'MemberPage', pageNumber: 1, sortMode: 'likeCount' })
            }
            else {


                //setPageBeforeNumber(pageNumber)
                if (editor) {
                    try {
                        editor.disconnectWS()
                    }
                    catch (e) {

                    }
                }
                changePageFunction()

                //寫在這裡就是有弄loading的如果寫完了，就把他拿出去    

                if (pageProps.page === 'LoginPage' || pageProps.page === "ProfilePage" || pageProps.page === 'ForgetPasswordPage' || pageProps.page === 'ResetPasswordPage' ||
                    pageProps.page === 'SignUpPage' || pageProps.page === 'VerificationPage' ||
                    pageProps.page === 'CollabOutlinePage' || pageProps.page === 'CollabRecommendPage' || pageProps.page === 'CollabDetailPage' ||
                    pageProps.page === 'QnAOutlinePage' || pageProps.page === 'QnARecommendPage' || pageProps.page === 'QnAOutlinePage' || pageProps.page === 'QnADetailPage' ||
                    pageProps.page === 'NoteOutlinePage' || pageProps.page === 'MemberPage' || pageProps.page === 'NoteDetailPage' ||
                    pageProps.page === 'RewardOutlinePage' || pageProps.page === 'RewardRecommendPage' || pageProps.page === 'RewardDetailPage' ||
                    pageProps.page === 'FolderOutlinePage' || pageProps.page === 'PersonalPage' || pageProps.page === 'TagOutlinePage'
                )
                    setLoading(true)
                else
                    setLoading(false)
                console.log('123')
                document.cookie = "pageProps=" + JSON.stringify(pageProps);
                //document.cookie = "pageNumber=" + JSON.stringify(pageNumber);

                if (pageProps.page !== 'LoginPage' || !loggedIn) {
                    setPageStack(oldArray => [...oldArray, { pageProps: pageProps }]);
                }
                if (pageProps.page === 'NoteDetailPage' || pageProps.page === 'NoteOutlinePage' || pageProps.page === 'MemberPage' ||
                    pageProps.page === 'RewardDetailPage' || pageProps.page === 'RewardOutlinePage' || pageProps.page === 'RewardRecommendPage' ||
                    pageProps.page === 'QnADetailPage' || pageProps.page === 'QnAOutlinePage' || pageProps.page === 'QnARecommendPage' ||
                    pageProps.page === 'CollabDetailPage' || pageProps.page === 'CollabOutlinePage' || pageProps.page === 'CollabRecommendPage' || pageProps.page === 'PersonalPage' ||
                    pageProps.page === 'ProfilePage' || pageProps.page === 'FolderOutlinePage' || pageProps.page === 'TagOutlinePage'
                )
                    setFloatButtonVisable(true)
                else
                    setFloatButtonVisable(false)

                switch (pageProps.page) {
                    case 'NoteDetailPage': setPageLabel("Note Detail"); setPageComponent(<NoteDetailPage page='NoteDetailPage' setLoggedIn={setLoggedIn} coinNum={coinNum} setCoinNum={setCoinNum} sendPrivateMessage={sendPrivateMessage} changePage={changePage} setLoading={setLoading} setPageProps={setPageProps} {...pageProps} />); break;
                    case 'NoteEditPage': setPageLabel("Edit a Note"); setPageComponent(<NoteEditPage page='NoteEditPage' setLoggedIn={setLoggedIn} sendPrivateMessage={sendPrivateMessage} changePage={changePage} setLoading={setLoading} setPageProps={setPageProps}  {...pageProps} />); break;
                    case 'NoteNewPage': setPageLabel("Create a Note"); setPageComponent(<NoteEditPage page='NoteNewPage' setLoggedIn={setLoggedIn} sendBellMessage={sendBellMessage} sendPrivateMessage={sendPrivateMessage} changePage={changePage} setLoading={setLoading} setPageProps={setPageProps} {...pageProps} />); break;
                    case 'NoteOutlinePage': setPageLabel("Results"); setPageComponent(<NoteOutlinePage page='NoteOutlinePage' setLoggedIn={setLoggedIn} changeSortMode={setSortMode} setPageNumber={changePageNumber} changePage={changePage} setLoading={setLoading} setPageProps={setPageProps}  {...pageProps} />); break;
                    case 'MemberPage': setPageLabel("Recommended Notes"); setPageComponent(<MemberPage page='MemberPage' setLoggedIn={setLoggedIn} setPageNumber={changePageNumber} changePage={changePage} setLoading={setLoading} setPageProps={setPageProps}  {...pageProps} />); break;
                    case 'RewardDetailPage': setPageLabel("Reward Post Detail"); setPageComponent(<RewardDetailPage page='RewardDetailPage' setLoggedIn={setLoggedIn} pageLabel='Reward Detail' changePage={changePage} setLoading={setLoading} setPageProps={setPageProps} {...pageProps} />); break;
                    case 'RewardEditPage': setPageLabel("Edit a Reward Post"); setPageComponent(<RewardEditPage page='RewardEditPage' setLoggedIn={setLoggedIn} changePage={changePage} setLoading={setLoading} setPageProps={setPageProps} {...pageProps} />); break;
                    case 'RewardNewPage': setPageLabel("Create a Reward Post"); setPageComponent(<RewardEditPage page='RewardNewPage' setLoggedIn={setLoggedIn} sendBellMessage={sendBellMessage} changePage={changePage} setLoading={setLoading} setPageProps={setPageProps}  {...pageProps} />); break;
                    case 'RewardOutlinePage': setPageLabel("Results"); setPageComponent(<RewardOutlinePage page='RewardOutlinePage' setLoggedIn={setLoggedIn} changeSortMode={setSortMode} setPageNumber={changePageNumber} changePage={changePage} setLoading={setLoading} setPageProps={setPageProps}  {...pageProps} />); break;
                    case 'RewardRecommendPage': setPageLabel("Recommended Reward Posts"); setPageComponent(<RewardRecommendPage page='RewardRecommendPage' setLoggedIn={setLoggedIn} changeSortMode={setSortMode} setPageNumber={changePageNumber} changePage={changePage} setLoading={setLoading} setPageProps={setPageProps}  {...pageProps} />); break;
                    case 'QnADetailPage': setPageLabel("QA Post Detail"); setPageComponent(<QnADetailPage page='QnADetailPage' setLoggedIn={setLoggedIn} changePage={changePage} setLoading={setLoading} setPageProps={setPageProps}  {...pageProps} />); break;
                    case 'QnAOutlinePage': setPageLabel("Results"); setPageComponent(<QnAOutlinePage page='QnAOutlinePage' setLoggedIn={setLoggedIn} changeSortMode={setSortMode} setPageNumber={changePageNumber} changePage={changePage} setLoading={setLoading} setPageProps={setPageProps} {...pageProps} />); break;
                    case 'QnAEditPage': setPageLabel("Edit a QA Post"); setPageComponent(<QnAEditPage page='QnAEditPage' setLoggedIn={setLoggedIn} changePage={changePage} setLoading={setLoading} setPageProps={setPageProps}  {...pageProps} />); break;
                    case 'QnANewPage': setPageLabel("Create a QA Post"); setPageComponent(<QnAEditPage page='QnANewPage' setLoggedIn={setLoggedIn} sendBellMessage={sendBellMessage} changePage={changePage} setLoading={setLoading} setPageProps={setPageProps} {...pageProps} />); break;
                    case 'QnARecommendPage': setPageLabel("Recommended Reward Posts"); setPageComponent(<QnARecommendPage page='QnARecommendPage' setLoggedIn={setLoggedIn} changeSortMode={setSortMode} setPageNumber={changePageNumber} changePage={changePage} setLoading={setLoading} setPageProps={setPageProps} {...pageProps} />); break;
                    case 'CollabDetailPage': setPageLabel("Collaborative Note Detail"); setPageComponent(<CollabDetailPage page='CollabDetailPage' setLoggedIn={setLoggedIn} sendPrivateMessage={sendPrivateMessage} changePage={changePage} setLoading={setLoading} setPageProps={setPageProps} {...pageProps} />); break;
                    case 'CollabEditPage': setPageLabel("Edit a Collaborative Note Post"); setPageComponent(<CollabEditPage page='CollabEditPage' setLoggedIn={setLoggedIn} sendPrivateMessage={sendPrivateMessage} changePage={changePage} setLoading={setLoading} setPageProps={setPageProps} {...pageProps} />); break;
                    case 'CollabNoteEditPage': setPageLabel("Edit a Collaborative Note"); setPageComponent(<CollabNoteEditPage page='CollabNoteEditPage' setLoggedIn={setLoggedIn} changePage={changePage} setLoading={setLoading} setPageProps={setPageProps} {...pageProps} />); break;
                    case 'CollabNewPage': setPageLabel("Create a Collaborative Note Post"); setPageComponent(<CollabEditPage page='CollabNewPage' setLoggedIn={setLoggedIn} sendBellMessage={sendBellMessage} changePage={changePage} setLoading={setLoading} setPageProps={setPageProps} {...pageProps} />); break;
                    case 'CollabOutlinePage': setPageLabel("Results"); setPageComponent(<CollabOutlinePage page='CollabOutlinePage' changeSortMode={setSortMode} setLoggedIn={setLoggedIn} setPageNumber={changePageNumber} changePage={changePage} setLoading={setLoading} setPageProps={setPageProps} {...pageProps} />); break;
                    case 'CollabRecommendPage': setPageLabel("Recommended Collaborative Note Posts"); setPageComponent(<CollabRecommendPage page='CollabRecommendPage' setLoggedIn={setLoggedIn} changeSortMode={setSortMode} setPageNumber={changePageNumber} changePage={changePage} setLoading={setLoading} setPageProps={setPageProps} {...pageProps} />); break;
                    case 'FolderOutlinePage': setPageLabel("Recommended Folder"); setPageComponent(<FolderOutlinePage page='FolderOutlinePage' setLoggedIn={setLoggedIn} setPageNumber={changePageNumber} changePage={changePage} setLoading={setLoading} setPageProps={setPageProps} {...pageProps} />); break;
                    case 'TagOutlinePage': setPageLabel("Results"); setPageComponent(<TagOutlinePage page='TagOutlinePage' setLoggedIn={setLoggedIn} changeSortMode={setSortMode} setPageNumber={changePageNumber} changePage={changePage} setLoading={setLoading} setPageProps={setPageProps}  {...pageProps} />); break;
                    case 'PersonalPage': setPageLabel("Personal Area"); setPageComponent(<PersonalPage page='PersonalPage' setLoggedIn={setLoggedIn} changePage={changePage} setLoading={setLoading} setPageProps={setPageProps} {...pageProps} />); break;
                    case 'ProfilePage': setPageLabel("Profile"); setPageComponent(<ProfilePage page='ProfilePage' setLoggedIn={setLoggedIn} sendPrivateMessage={sendPrivateMessage} changePage={changePage} setLoading={setLoading} Avatar={changeAvatar} setAvatar={setChangeAvatar} setPageProps={setPageProps} {...pageProps} />); break;
                    case 'LoginPage': setPageComponent(<LoginPage page='LoginPage' changePage={changePage} setLoading={setLoading} setPageProps={setPageProps} setLoggedIn={setLoggedIn} {...pageProps} />); break;
                    case 'SignUpPage': setPageComponent(<SignUpPage page='SignUpPage' setLoggedIn={setLoggedIn} changePage={changePage} setLoading={setLoading} setPageProps={setPageProps} {...pageProps} />); break;
                    case 'VerificationPage': setPageComponent(<VerificationPage page='VerificationPage' setLoggedIn={setLoggedIn} changePage={changePage} setLoading={setLoading} setPageProps={setPageProps} {...pageProps} />); break;
                    case 'ForgetPasswordPage': setPageComponent(<ForgetPasswordPage page='ForgetPasswordPage' setLoggedIn={setLoggedIn} changePage={changePage} setLoading={setLoading} setPageProps={setPageProps} {...pageProps} />); break;
                    case 'ResetPasswordPage': setPageComponent(<ResetPasswordPage setLoggedIn={setLoggedIn} page='ResetPasswordPage' changePage={changePage} setLoading={setLoading} setPageProps={setPageProps} {...pageProps} />); break;
                    default: setPageComponent(<></>); break;
                }
            }
        }
    }, [pageProps])
    useEffect(() => {
        console.log(pageStack)

        if (pageStack.length > 1)
            setBackMode(true)
        else
            setBackMode(false)
        if (pageStack[0]?.pageProps.page === 'LoginPage' && pageStack[1]?.pageProps.page === 'LoginPage') {
            setBackMode(false)
            console.log('123')
        }


    }, [pageStack])



    const floatBtnOnClick = () => {
        if (!floatButtonDetailVisable)
            setFloatButtonDetailVisable(true);
        else
            setFloatButtonDetailVisable(false)
        // switch (pageProps.page) {
        //     case 'PersonalPage': setPageProps({ page: 'NoteNewPage', action: "new", }); break;
        //     case 'NoteDetailPage': setPageProps({ page: 'NoteNewPage', action: "new", }); break;
        //     case 'NoteOutlinePage': setPageProps({ page: 'NoteNewPage', action: "new", }); break;
        //     case 'MemberPage': setPageProps({ page: 'NoteNewPage', action: "new", }); break;
        //     case 'RewardDetailPage': setPageProps({ page: 'RewardNewPage', type: 'reward', action: 'new' }); break;
        //     case 'RewardOutlinePage': setPageProps({ page: 'RewardNewPage', type: 'reward', action: 'new' }); break;
        //     case 'RewardRecommendPage': setPageProps({ page: 'RewardNewPage', type: 'reward', action: 'new' }); break;
        //     case 'QnADetailPage': setPageProps({ page: 'QnANewPage', type: 'QA', action: 'new', page: 'QnANewPage' }); break;
        //     case 'QnAOutlinePage': setPageProps({ page: 'QnANewPage', type: 'QA', action: 'new', page: 'QnANewPage' }); break;
        //     case 'QnARecommendPage': setPageProps({ page: 'QnANewPage', type: 'QA', action: 'new', page: 'QnANewPage' }); break;
        //     case 'CollabDetailPage': setPageProps({ page: 'CollabNewPage', type: 'collaboration', action: 'new', page: 'CollabNewPage' }); break;
        //     case 'CollabOutlinePage': setPageProps({ page: 'CollabNewPage', type: 'collaboration', action: 'new', page: 'CollabNewPage' }); break;
        //     case 'CollabRecommendPage': setPageProps({ page: 'CollabNewPage', type: 'collaboration', action: 'new', page: 'CollabNewPage' }); break;
        //     default: setPageComponent(<></>); break;
        // }

    }

    const floatBtnNoteOnClick = () => {
        setPageProps({ page: 'NoteNewPage', action: "new", });
    }
    const floatBtnQAOnClick = () => {
        setPageProps({ page: 'QnANewPage', type: 'QA', action: 'new', page: 'QnANewPage' })
    }
    const floatBtnCollabOnClick = () => {
        setPageProps({ page: 'CollabNewPage', type: 'collaboration', action: 'new' })
    }
    const floatBtnRewardOnClick = () => {
        setPageProps({ page: 'RewardNewPage', type: 'reward', action: 'new' })
    }


    const lastPageBtnOnClick = () => {
        if (pageStack.length > 0) {
            //message.info("Back to last page!");
            // hasBack = true
            // console.log(hasBack)
            setPageProps(pageStack[pageStack.length - 2].pageProps);
            //setPageBeforeProps(pageStack[pageStack.length - 2].pageProps);
            //setPageNumber(pageStack[pageStack.length - 2].pageNumber);
            //setPageBeforeNumber(pageStack[pageStack.length - 2].pageNumber);
            setPageStack(oldArray => [...oldArray.slice(0, pageStack.length - 2)]);
        }
    }

    const antIcon = (
        <LoadingOutlined
            style={{
                fontSize: 30,
            }}
            spin
        />
    );

    return (
        <>
            <div className='outerPage'>
                <>
                    <Spin wrapperClassName={'outerPage__Loading'} indicator={antIcon} spinning={loading} style={{ width: '100%', height: '100%' }}>
                        <Navbar ringList={ringList} setRingList={setRingList} ringNumber={ringNumber} setRingNumber={setRingNumber} coinNum={coinNum} setCoinNum={setCoinNum} pageProps={pageProps} changeAvatar={changeAvatar} loggedIn={loggedIn} setPageProps={setPageProps} setLoggedIn={setLoggedIn} />

                        {pageLabel &&
                            <div className='outerPage__PageLabel'>
                                <Text color='gray' cls='Default' content={pageLabel} fontSize='30' display="inline-block" />
                                <QuestionCircleOutlined  />
                            </div>
                        }
                        <div className={pageLabel ? 'outerPage__Layout__PageLabel' : 'outerPage__Layout'} >
                            {pageComponent && pageComponent}
                        </div>
                        {backMode &&
                            <div className={"lastPageButton"} disable={false} onClick={lastPageBtnOnClick}>
                                <ArrowLeftOutlined style={{ fontSize: '1.5em' }} />
                            </div>
                        }
                        {floatButtonVisable && !floatButtonDetailVisable &&
                            <div className="floatButton" onClick={floatBtnOnClick}>
                                <PlusOutlined />
                                {/* <UpOutlined /> */}
                            </div>
                        }
                        {floatButtonVisable && floatButtonDetailVisable &&
                            <div className="floatButton__Hide" onClick={floatBtnOnClick}>
                                {/* <PlusOutlined /> */}
                                <DownOutlined />
                            </div>
                        }
                        {floatButtonVisable && floatButtonDetailVisable &&
                            <Tooltip arrowPointAtCenter={true} placement="left" title={"Create New Note"} color={'#000'}>
                                <div className="floatButton__Note" onClick={floatBtnNoteOnClick}>
                                    {/* <PlusOutlined /> */}

                                    <FileTextOutlined />

                                </div>
                            </Tooltip>
                        }
                        {floatButtonVisable && floatButtonDetailVisable &&
                            <Tooltip arrowPointAtCenter={true} placement="left" title={"Create New QA"} color={'#000'}>
                                <div className="floatButton__QA" onClick={floatBtnQAOnClick}>
                                    {/* <PlusOutlined /> */}

                                    <MessageOutlined />

                                </div>
                            </Tooltip>
                        }
                        {floatButtonVisable && floatButtonDetailVisable &&
                            <Tooltip arrowPointAtCenter={true} placement="left" title={"Create New Collab"} color={'#000'}>
                                <div className="floatButton__Collab" onClick={floatBtnCollabOnClick}>
                                    {/* <PlusOutlined /> */}

                                    <TeamOutlined />

                                </div>
                            </Tooltip>
                        }
                        {floatButtonVisable && floatButtonDetailVisable &&
                            <Tooltip arrowPointAtCenter={true} placement="left" title={"Create New Reward"} color={'#000'}>
                                <div className="floatButton__Reward" onClick={floatBtnRewardOnClick}>
                                    {/* <PlusOutlined /> */}

                                    <FileSearchOutlined />

                                </div>
                            </Tooltip>
                        }
                    </Spin>
                </>

            </div>

        </>
    )
}

export default OuterPage