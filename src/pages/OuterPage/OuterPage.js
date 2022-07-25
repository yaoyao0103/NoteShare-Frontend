import React, { useState, useEffect } from 'react'
import SockJS from "sockjs-client"
import axios from 'axios';
import { Base64 } from 'js-base64';
import { over } from "stompjs"
import MemberPage from "../MemberPage/MemberPage";
import QnADetailPage from "../QnADetailPage/QnADetailPage";
import NoteDetailPage from "../NoteDetailPage/NoteDetailPage";
import NoteOutlinePage from "../NoteOutlinePage/NoteOutlinePage";
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
import { PlusOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import CollabNoteEditPage from "../CollabNoteEditPage/CollabNoteEditPage";
import CollabRecommendPage from '../CollabRecommendPage/CollabRecommendPage';
import ResetPasswordPage from '../ResetPasswordPage/ResetPasswordPage';
import './OuterPage.css'
import { Button, Drawer, message, Spin, notification, Avatar } from 'antd'
import { LoadingOutlined } from '@ant-design/icons';

import { RadiusBottomleftOutlined } from '@ant-design/icons';
import { timers } from 'jquery';
import Cookie from '../../components/Cookies/Cookies';
import { set } from 'react-hook-form';
import { editor } from '../../api_utils/geditor_config';
var sock
var stompClient;
// var hasBack = false
// var hasChange = true
// var isDone = false
const OuterPage = () => {
    const [isConnect, setIsConnect] = useState(false)
    //const [pageBeforeProps, setPageBeforeProps] = useState({ page: 'LoginPage' });
    //const [pageBeforeNumber, setPageBeforeNumber] = useState(1);
    const [pageProps, setPageProps] = useState({ page: 'LoginPage' });
    const [pageComponent, setPageComponent] = useState(<></>)
    const [visible, setVisible] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const [changeAvatar, setChangeAvatar] = useState(0);
    const [coinNum, setCoinNum] = useState(0);
    const [floatButtonVisable, setFloatButtonVisable] = useState(false);
    const [pageStack, setPageStack] = useState([]);
    const [backMode, setBackMode] = useState(false);
    const [loading, setLoading] = useState(true);
    const [changePage, setChangePage] = useState(1);
    //const [pageNumber, setPageNumber] = useState(1);
    const [ringNumber, setRingNumber] = useState(0);
    const [ringList, setRingList] = useState([]);
    const [isChanging, setIsChanging] = useState(false);
    const [api, contextHolder] = notification.useNotification();
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

    const showDrawer = () => {
        setVisible(true);
    };

    const onClose = () => {
        setVisible(false);
    };


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

        let cookieParser = new Cookie(document.cookie);
        let tempEmail = cookieParser.getCookieByName('email');
        tempEmail = Base64.decode(tempEmail);
        let tempRing = ringNumber
        axios.get("http://localhost:8080/bellBy/" + tempEmail, {
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

        const cookieParser = new Cookie(document.cookie)
        const email = cookieParser.getCookieByName('email')
        if (email) {
            connect();
            setLoggedIn(true);
            setPageProps({ page: 'PersonalPage' })
        }
        const tempPageProps = cookieParser.getCookieByName('pageProps')
        if (tempPageProps) {
            const temp = JSON.parse(tempPageProps)
            //console.log("temp", temp)
            setPageProps(temp)

        }
    }, [])
    useEffect(() => {
        const cookieParser = new Cookie(document.cookie)
        const tempPageProps = cookieParser.getCookieByName('pageProps')
        if (!tempPageProps) {
            if (loggedIn) {
                setPageStack(oldArray => [...oldArray.slice(0, 0)]);
                setPageProps({ page: 'PersonalPage' })

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

        if ((pageProps.page === 'NoteEditPage' || pageProps.page === 'NoteNewPage' || pageProps.page === 'MemberPage' ||
            pageProps.page === 'RewardEditPage' || pageProps.page === 'RewardNewPage' || pageProps.page === 'RewardRecommendPage' ||
            pageProps.page === 'QnAEditPage' || pageProps.page === 'QnANewPage' || pageProps.page === 'QnARecommendPage' ||
            pageProps.page === 'CollabEditPage' || pageProps.page === 'CollabNewPage' || pageProps.page === 'CollabRecommendPage' ||
            pageProps.page === 'PersonalPage' || pageProps.page === 'ProfilePage' || pageProps.page === 'ResetPasswordPage' ||
            pageProps.page === 'VerificationPage'
        ) && !loggedIn) {
            message.info('You should log in first !!!')
            setPageProps({ page: "LoginPage" })
        }
        else if ((pageProps.page === 'LoginPage' || pageProps.page === 'SignUpPage' ||
            pageProps.page === 'VerificationPage' || pageProps.page === 'ForgetPasswordPage'
        ) && loggedIn) {
            message.info('You should log out first !!!')
            setPageProps({ page: "PersonalPage" })
        }
        else {


            //setPageBeforeNumber(pageNumber)
            if (editor) {
                editor.disconnectWS()
            }
            changePageFunction()
            //console.log('1', JSON.stringify(pageBeforeProps), '2', JSON.stringify(pageProps))

            // if (!(JSON.stringify(pageBeforeProps) === JSON.stringify(pageProps))) {
            //     //console.log('1111111')
            //     setPageNumber(1)
            //     if (pageBeforeNumber !== 1)


            //     setPageBeforeProps(pageProps);
            // }
            //寫在這裡就是有弄loading的如果寫完了，就把他拿出去    

            if (pageProps.page === 'LoginPage' || pageProps.page === "ProfilePage" || pageProps.page === 'ForgetPasswordPage' || pageProps.page === 'ResetPasswordPage' ||
                pageProps.page === 'SignUpPage' || pageProps.page === 'VerificationPage' ||
                pageProps.page === 'CollabOutlinePage' || pageProps.page === 'CollabRecommendPage' || pageProps.page === 'CollabDetailPage' ||
                pageProps.page === 'QnAOutlinePage' || pageProps.page === 'QnARecommendPage' || pageProps.page === 'QnAOutlinePage' || pageProps.page === 'QnADetailPage' ||
                pageProps.page === 'NoteOutlinePage' || pageProps.page === 'MemberPage' || pageProps.page === 'NoteDetailPage' ||
                pageProps.page === 'RewardOutlinePage' || pageProps.page === 'RewardRecommendPage' || pageProps.page === 'RewardDetailPage' ||
                pageProps.page === 'FolderOutlinePage' || pageProps.page === 'PersonalPage'
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
                pageProps.page === 'CollabDetailPage' || pageProps.page === 'CollabOutlinePage' || pageProps.page === 'CollabRecommendPage'
            )
                setFloatButtonVisable(true)
            else
                setFloatButtonVisable(false)

            switch (pageProps.page) {
                case 'NoteDetailPage': setPageComponent(<NoteDetailPage page='NoteDetailPage' sendPrivateMessage={sendPrivateMessage} changePage={changePage} setLoading={setLoading} setPageProps={setPageProps} {...pageProps} />); break;
                case 'NoteEditPage': setPageComponent(<NoteEditPage page='NoteEditPage' sendPrivateMessage={sendPrivateMessage} changePage={changePage} setLoading={setLoading} setPageProps={setPageProps}  {...pageProps} />); break;
                case 'NoteNewPage': setPageComponent(<NoteEditPage page='NoteNewPage' sendBellMessage={sendBellMessage} sendPrivateMessage={sendPrivateMessage} changePage={changePage} setLoading={setLoading} setPageProps={setPageProps} {...pageProps} />); break;
                case 'NoteOutlinePage': setPageComponent(<NoteOutlinePage page='NoteOutlinePage' changeSortMode={setSortMode} setPageNumber={changePageNumber} changePage={changePage} setLoading={setLoading} setPageProps={setPageProps}  {...pageProps} />); break;
                case 'MemberPage': setPageComponent(<MemberPage page='MemberPage' setPageNumber={changePageNumber} changePage={changePage} setLoading={setLoading} setPageProps={setPageProps}  {...pageProps} />); break;
                case 'RewardDetailPage': setPageComponent(<RewardDetailPage page='RewardDetailPage' changePage={changePage} setLoading={setLoading} setPageProps={setPageProps} {...pageProps} />); break;
                case 'RewardEditPage': setPageComponent(<RewardEditPage page='RewardEditPage' changePage={changePage} setLoading={setLoading} setPageProps={setPageProps} {...pageProps} />); break;
                case 'RewardNewPage': setPageComponent(<RewardEditPage page='RewardNewPage' sendBellMessage={sendBellMessage} changePage={changePage} setLoading={setLoading} setPageProps={setPageProps}  {...pageProps} />); break;
                case 'RewardOutlinePage': setPageComponent(<RewardOutlinePage page='RewardOutlinePage' changeSortMode={setSortMode} setPageNumber={changePageNumber} changePage={changePage} setLoading={setLoading} setPageProps={setPageProps}  {...pageProps} />); break;
                case 'RewardRecommendPage': setPageComponent(<RewardRecommendPage page='RewardRecommendPage' changeSortMode={setSortMode} setPageNumber={changePageNumber} changePage={changePage} setLoading={setLoading} setPageProps={setPageProps}  {...pageProps} />); break;
                case 'QnADetailPage': setPageComponent(<QnADetailPage page='QnADetailPage' changePage={changePage} setLoading={setLoading} setPageProps={setPageProps}  {...pageProps} />); break;
                case 'QnAOutlinePage': setPageComponent(<QnAOutlinePage page='QnAOutlinePage' changeSortMode={setSortMode} setPageNumber={changePageNumber} changePage={changePage} setLoading={setLoading} setPageProps={setPageProps} {...pageProps} />); break;
                case 'QnAEditPage': setPageComponent(<QnAEditPage page='QnAEditPage' changePage={changePage} setLoading={setLoading} setPageProps={setPageProps}  {...pageProps} />); break;
                case 'QnANewPage': setPageComponent(<QnAEditPage page='QnANewPage' sendBellMessage={sendBellMessage} changePage={changePage} setLoading={setLoading} setPageProps={setPageProps} {...pageProps} />); break;
                case 'QnARecommendPage': setPageComponent(<QnARecommendPage page='QnARecommendPage' changeSortMode={setSortMode} setPageNumber={changePageNumber} changePage={changePage} setLoading={setLoading} setPageProps={setPageProps} {...pageProps} />); break;
                case 'CollabDetailPage': setPageComponent(<CollabDetailPage page='CollabDetailPage' sendPrivateMessage={sendPrivateMessage} changePage={changePage} setLoading={setLoading} setPageProps={setPageProps} {...pageProps} />); break;
                case 'CollabEditPage': setPageComponent(<CollabEditPage page='CollabEditPage' sendPrivateMessage={sendPrivateMessage} changePage={changePage} setLoading={setLoading} setPageProps={setPageProps} {...pageProps} />); break;
                case 'CollabNoteEditPage': setPageComponent(<CollabNoteEditPage page='CollabNoteEditPage' changePage={changePage} setLoading={setLoading} setPageProps={setPageProps} {...pageProps} />); break;
                case 'CollabNewPage': setPageComponent(<CollabEditPage page='CollabNewPage' sendBellMessage={sendBellMessage} changePage={changePage} setLoading={setLoading} setPageProps={setPageProps} {...pageProps} />); break;
                case 'CollabOutlinePage': setPageComponent(<CollabOutlinePage page='CollabOutlinePage' changeSortMode={setSortMode} setPageNumber={changePageNumber} changePage={changePage} setLoading={setLoading} setPageProps={setPageProps} {...pageProps} />); break;
                case 'CollabRecommendPage': setPageComponent(<CollabRecommendPage page='CollabRecommendPage' changeSortMode={setSortMode} setPageNumber={changePageNumber} changePage={changePage} setLoading={setLoading} setPageProps={setPageProps} {...pageProps} />); break;
                case 'FolderOutlinePage': setPageComponent(<FolderOutlinePage page='FolderOutlinePage' setPageNumber={changePageNumber} changePage={changePage} setLoading={setLoading} setPageProps={setPageProps} {...pageProps} />); break;
                case 'PersonalPage': setPageComponent(<PersonalPage page='PersonalPage' changePage={changePage} setLoading={setLoading} setPageProps={setPageProps} {...pageProps} />); break;
                case 'ProfilePage': setPageComponent(<ProfilePage page='ProfilePage' sendPrivateMessage={sendPrivateMessage} changePage={changePage} setLoading={setLoading} Avatar={changeAvatar} setAvatar={setChangeAvatar} setPageProps={setPageProps} {...pageProps} />); break;
                case 'LoginPage': setPageComponent(<LoginPage page='LoginPage' changePage={changePage} setLoading={setLoading} setPageProps={setPageProps} setLoggedIn={setLoggedIn} {...pageProps} />); break;
                case 'SignUpPage': setPageComponent(<SignUpPage page='SignUpPage' changePage={changePage} setLoading={setLoading} setPageProps={setPageProps} {...pageProps} />); break;
                case 'VerificationPage': setPageComponent(<VerificationPage page='VerificationPage' changePage={changePage} setLoading={setLoading} setPageProps={setPageProps} {...pageProps} />); break;
                case 'ForgetPasswordPage': setPageComponent(<ForgetPasswordPage page='ForgetPasswordPage' changePage={changePage} setLoading={setLoading} setPageProps={setPageProps} {...pageProps} />); break;
                case 'ResetPasswordPage': setPageComponent(<ResetPasswordPage setLoggedIn={setLoggedIn} page='ResetPasswordPage' changePage={changePage} setLoading={setLoading} setPageProps={setPageProps} {...pageProps} />); break;
                default: setPageComponent(<></>); break;
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
        message.info("float button click!")

        switch (pageProps.page) {
            case 'NoteDetailPage': setPageProps({ page: 'NoteNewPage', action: "new", }); break;
            case 'NoteOutlinePage': setPageProps({ page: 'NoteNewPage', action: "new", }); break;
            case 'MemberPage': setPageProps({ page: 'NoteNewPage', action: "new", }); break;
            case 'RewardDetailPage': setPageProps({ page: 'RewardNewPage', type: 'reward', action: 'new' }); break;
            case 'RewardOutlinePage': setPageProps({ page: 'RewardNewPage', type: 'reward', action: 'new' }); break;
            case 'RewardRecommendPage': setPageProps({ page: 'RewardNewPage', type: 'reward', action: 'new' }); break;
            case 'QnADetailPage': setPageProps({ page: 'QnANewPage', type: 'QA', action: 'new', page: 'QnANewPage' }); break;
            case 'QnAOutlinePage': setPageProps({ page: 'QnANewPage', type: 'QA', action: 'new', page: 'QnANewPage' }); break;
            case 'QnARecommendPage': setPageProps({ page: 'QnANewPage', type: 'QA', action: 'new', page: 'QnANewPage' }); break;
            case 'CollabDetailPage': setPageProps({ page: 'CollabNewPage', type: 'collaboration', action: 'new', page: 'CollabNewPage' }); break;
            case 'CollabOutlinePage': setPageProps({ page: 'CollabNewPage', type: 'collaboration', action: 'new', page: 'CollabNewPage' }); break;
            case 'CollabRecommendPage': setPageProps({ page: 'CollabNewPage', type: 'collaboration', action: 'new', page: 'CollabNewPage' }); break;
            default: setPageComponent(<></>); break;
        }

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


                        <div className='outerPage__Layout'>
                            {pageComponent && pageComponent}
                        </div>
                        {backMode &&
                            <div className={"lastPageButton"} disable={false} onClick={lastPageBtnOnClick}>
                                <ArrowLeftOutlined style={{ fontSize: '1.5em' }} />
                            </div>
                        }
                        {floatButtonVisable &&
                            <div className="floatButton" onClick={floatBtnOnClick}>
                                <PlusOutlined />
                            </div>
                        }
                    </Spin>
                </>

            </div>
            <div className='drawerBtn'>
                <Button type="primary" onClick={() => { openNotification('bottomLeft', { message: '123', userObj: { userObjName: 'Plusx', userObjAvatar: "https://joeschmoe.io/api/v1/james" } }) }/*showDrawer*/}>
                    Open
                </Button>
            </div>

            <Drawer title="Basic Drawer" placement="right" onClose={onClose} visible={visible}>
                <Button type="primary" onClick={() => {
                    setPageProps({
                        noteId: "62b477d9c291fe27002cae3c",
                        page: "NoteDetailPage"
                    })
                }} >
                    NoteDetailPage
                </Button>
                <Button type="primary" onClick={() => {
                    setPageProps({
                        noteId: "62b477d9c291fe27002cae3c",
                        action: "edit",
                        page: 'NoteEditPage'
                    })
                }}>
                    NoteEditPage
                </Button>
                <Button type="primary" onClick={() => {
                    setPageProps({
                        action: "new",
                        page: "NoteNewPage"
                    })
                }}>
                    NoteNewPage
                </Button>
                <Button type="primary" onClick={() => {
                    setPageProps({
                        keyWord: 'OS',
                        subject: '',
                        department: '',
                        professor: '',
                        school: '',
                        headName: '',
                        Downloadable: true,
                        page: 'NoteOutlinePage'
                    })
                }}>
                    NoteOutlinePage
                </Button>
                <Button type="primary" onClick={() => {
                    setPageProps({
                        postId: '62b0891f0997e642d1402113',
                        page: 'RewardDetailPage'
                    })
                }}>
                    RewardDetailPage
                </Button>
                <Button type="primary" onClick={() => {
                    setPageProps({
                        postId: '62b0891f0997e642d1402113',
                        type: 'reward',
                        action: 'edit',
                        page: 'RewardEditPage'
                    })
                }}>
                    RewardEditPage
                </Button>
                <Button type="primary" onClick={() => {
                    setPageProps({
                        type: 'reward',
                        action: 'new',
                        page: 'RewardNewPage'
                    })
                }}>
                    RewardNewPage
                </Button>
                <Button type="primary" onClick={() => {
                    setPageProps({
                        keyWord: 'interrupt',
                        subject: '',
                        department: '',
                        professor: '',
                        school: '',
                        page: 'RewardOutlinePage'
                    })
                }}>
                    RewardOutlinePage
                </Button>
                <Button type="primary" onClick={() => {
                    setPageProps({
                        keyWord: 'array',
                        subject: '',
                        department: '',
                        page: 'QnAOutlinePage'
                    })
                }}>
                    QnAOutlinePage
                </Button>
                <Button type="primary" onClick={() => {
                    setPageProps({
                        postId: '62b076e50997e642d140206c',
                        page: 'QnADetailPage'
                    })
                }}>
                    QnADetailPage
                </Button>
                <Button type="primary" onClick={() => {
                    setPageProps({
                        postId: '62b076e50997e642d140206c',
                        type: 'QA',
                        action: 'edit',
                        page: 'QnAEditPage'
                    })
                }}>
                    QnAEditPage
                </Button>
                <Button type="primary" onClick={() => {
                    setPageProps({
                        type: 'QA',
                        action: 'new',
                        page: 'QnANewPage'
                    })
                }}>
                    QnANewPage
                </Button>

                <Button type="primary" onClick={() => {
                    setPageProps({
                        postId: '62bea68c4e0af13e28f37f62',
                        page: 'CollabDetailPage'
                    })
                }}>
                    CollabDetailPage
                </Button>
                <Button type="primary" onClick={() => {
                    setPageProps({
                        postId: '62b07f9c0997e642d14020c6',
                        type: 'collaboration',
                        action: 'edit',
                        page: 'CollabEditPage'
                    })
                }}>
                    CollabEditPage
                </Button>
                <Button type="primary" onClick={() => {
                    setPageProps({
                        type: 'collaboration',
                        action: 'new',
                        page: 'CollabNewPage'
                    })
                }}>
                    CollabNewPage
                </Button>
                <Button type="primary" onClick={() => {
                    setPageProps({
                        keyWord: 'interrupt',
                        subject: '',
                        department: '',
                        professor: '',
                        school: '',
                        headName: '',
                        Downloadable: true,
                        page: 'CollabOutlinePage'

                    })
                }}>
                    CollabOutlinePage
                </Button>
                <Button type="primary" onClick={() => {
                    setPageProps({
                        keyWord: 'test',
                        author: 'a',
                        page: 'FolderOutlinePage'

                    })
                }}>
                    FolderOutlinePage
                </Button>
                <Button type="primary" onClick={() => {
                    setPageProps({
                        page: 'PersonalPage'
                    })
                }}>
                    PersonalPage
                </Button>
                <Button type="primary" onClick={() => {
                    setPageProps({
                        email: 'a147896325811@gmail.com',
                        page: 'ProfilePage'
                    });
                }}>
                    ProfilePage
                </Button>

                <Button type="primary" onClick={() => {
                    setPageProps({
                        page: 'LoginPage'
                    })
                }}>
                    LoginPage
                </Button>
                <Button type="primary" onClick={() => {
                    setPageProps({
                        page: 'SignUpPage'
                    })
                }}>
                    SignUpPage
                </Button>
                <Button type="primary" onClick={() => {
                    setPageProps({
                        email: 'testemail@email.ntou.edu.tw',
                        page: 'VerificationPage'
                    })
                }}>
                    VerificationPage
                </Button>
                <Button type="primary" onClick={() => {
                    setPageProps({
                        email: 'a5477547720@yahoo.com.tw',
                        page: 'ForgetPasswordPage'
                    })
                }}>
                    ForgetPasswordPage
                </Button>
                <Button type="primary" onClick={() => {
                    setPageProps({
                        email: 'a5477547720@yahoo.com.tw',
                        page: 'ResetPasswordPage'
                    })
                }}>
                    ResetPasswordPage
                </Button>
            </Drawer>

        </>
    )
}

export default OuterPage