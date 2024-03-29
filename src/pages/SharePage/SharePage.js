import React, { useState, useEffect } from 'react'
import SockJS from "sockjs-client"
import axios from '../../components/axios/axios';
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
import '../OuterPage/OuterPage.css'
import { Button, Drawer, message, Spin, notification, Avatar, Tooltip } from 'antd'
import Text from '../../components/Text/Text';
import { LoadingOutlined } from '@ant-design/icons';
import { useParams } from "react-router-dom";
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
// var isDone = fals

const SharePage = () => {
    const [isConnect, setIsConnect] = useState(false)
    //const [pageBeforeProps, setPageBeforeProps] = useState({ page: 'LoginPage' });
    //const [pageBeforeNumber, setPageBeforeNumber] = useState(1);
    const [pageProps, setPageProps] = useState({ page: 'LoginPage' });
    const [pageComponent, setPageComponent] = useState(<></>)
    const [loggedIn, setLoggedIn] = useState(false);
    const [changeAvatar, setChangeAvatar] = useState('');
    const [changeAvatarNum, setChangeAvatarNum] = useState(0);
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
    const [instruction, setInstruction] = useState("No introductions")
    const [isChanging, setIsChanging] = useState(false);
    const [api, contextHolder] = notification.useNotification();
    const [pageLabel, setPageLabel] = useState(null)
    const [screenCapture, setScreenCapture] = useState('');
    const [hasLink, setHasLink] = useState(false);
    const { type, Id } = useParams();


    const changePageNumber = (pageNumber) => {
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
        axios.get("/bell/" + tempEmail, {
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
        console.log(type)
            if (email) {
                connect();
                setLoggedIn(true);
                setPageProps({ page: 'MemberPage', pageNumber: 1, sortMode: 'likeCount' })
            }
            const tempPageProps = cookieParser.getCookieByName('pageProps')
            if (tempPageProps) {
                const temp = JSON.parse(tempPageProps)
                setPageProps(temp)

            }
    }, [])
    useEffect(() => {
        const cookieParser = new Cookie(document.cookie)
        const tempPageProps = cookieParser.getCookieByName('pageProps')
        console.log(Id)
        if (Id && !hasLink) {
            console.log(Id)
            setHasLink(true)
            setPageStack(oldArray => [...oldArray.slice(0, 0)]);
            switch (type.toString()) {
                case 'note':
                    console.log('note111')
                    setPageProps({ page: 'NoteDetailPage', noteId: Id})
                    break;
                case 'qnA':
                    console.log('qa111')
                    setPageProps({ page: 'QnADetailPage', postId: Id })
                    break;
                case 'reward':
                    console.log('reward111')
                    setPageProps({ page: 'RewardDetailPage', postId: Id })
                    break;
                case 'collab':
                    console.log('collab111')
                    setPageProps({ page: 'CollabDetailPage', postId: Id })
                    break;
            }
        }
        else {
            if (!tempPageProps) {
                if (loggedIn) {
                    setPageStack(oldArray => [...oldArray.slice(0, 0)]);
                    setPageProps({ page: 'MemberPage', pageNumber: 1, sortMode: 'likeCount' })

                }
                else {
                    setPageProps({ page: 'LoginPage' })
                }
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
            ) && !loggedIn&&!Id) {
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
                    case 'NoteDetailPage':
                        setPageLabel("Note Detail");
                        setInstruction(<ul>
                            <li>In this page, you can see all the details of the note.</li>
                            <li>You can check your SPR and CR in this page.</li>
                            <li>When the note is set downloadable, you can download the pdf file.</li>
                        </ul>
                        )
                        setPageComponent(<NoteDetailPage page='NoteDetailPage' screenCapture={screenCapture} setScreenCapture={setScreenCapture} setLoggedIn={setLoggedIn} coinNum={coinNum} setCoinNum={setCoinNum} sendPrivateMessage={sendPrivateMessage} changePage={changePage} setLoading={setLoading} setPageProps={setPageProps} {...pageProps} />); break;
                    case 'NoteEditPage':
                        setPageLabel("Edit a Note");
                        setInstruction(<ul>
                            <li>In this page, you can edit the information, content and the hashtags of the note.</li>
                            <li>In information editing phase, you can edit the title, price, school, department, .etc of your note, and the title and price can't be empty.</li>
                            <li>In information editing phase, if you choose set the note public, it will be shown in public. And if you set the note private, it can only be saw by yourself.</li>
                            <li>In content editing phase, you can easily drag and drop block to edit your note.</li>
                            <li>In content editing phase, the leftmost tool in the sidebar is "Block", which you can create block by dragging them to the note. </li>
                            <li>In content editing phase, the middle tool in the sidebar is "Style", which you can change some styles like color, size, position, font-size, etc. of a block </li>
                            <li>In content editing phase, the rightmost tool in the sidebar is "Trait", which you can change some attribute like link, source, title, etc. of a block </li>
                            <li>In hashtag editing phase, on the left port, you can choose recommended hashtags and then they will add to your current hashtags on the right part. Or, you can enter some words and then press enter to add some hashtags</li>
                        </ul>
                        )
                        setPageComponent(<NoteEditPage page='NoteEditPage' setLoggedIn={setLoggedIn} sendPrivateMessage={sendPrivateMessage} changePage={changePage} setLoading={setLoading} setPageProps={setPageProps}  {...pageProps} />); break;
                    case 'NoteNewPage':
                        setPageLabel("Create a Note");
                        setInstruction(<ul>
                            <li>In this page, you have to the information, content and the hashtags of the note.</li>
                            <li>In information editing phase, you have to enter the title, price, school, department, .etc of your note, and the title and price can't be empty.</li>
                            <li>In information editing phase, if you choose set the note public, it will be shown in public. And if you set the note private, it can only be saw by yourself.</li>
                            <li>In content editing phase, you can easily drag and drop block to edit your note.</li>
                            <li>In content editing phase, the leftmost tool in the sidebar is "Block", which you can create block by dragging them to the note. </li>
                            <li>In content editing phase, the middle tool in the sidebar is "Style", which you can change some styles like color, size, position, font-size, etc. of a block </li>
                            <li>In content editing phase, the rightmost tool in the sidebar is "Trait", which you can change some attribute like link, source, title, etc. of a block </li>
                            <li>In hashtag editing phase, on the left port, you can choose recommended hashtags and then they will add to your current hashtags on the right part. Or, you can enter some words and then press enter to add some hashtags</li>
                        </ul>
                        )
                        setPageComponent(<NoteEditPage page='NoteNewPage' setLoggedIn={setLoggedIn} sendBellMessage={sendBellMessage} sendPrivateMessage={sendPrivateMessage} changePage={changePage} setLoading={setLoading} setPageProps={setPageProps} {...pageProps} />); break;
                    case 'NoteOutlinePage':
                        setPageLabel("Results");
                        setInstruction(<ul>
                            <li>You can sort the notes by dropdown list</li>
                            <li>The page only show a part of note. If you want to see all the details or buy the note, please click the note.</li>
                        </ul>
                        )
                        setPageComponent(<NoteOutlinePage page='NoteOutlinePage' setLoggedIn={setLoggedIn} changeSortMode={setSortMode} setPageNumber={changePageNumber} changePage={changePage} setLoading={setLoading} setPageProps={setPageProps}  {...pageProps} />); break;
                    case 'MemberPage':
                        setPageLabel("Recommended Notes");
                        setPageComponent(<MemberPage page='MemberPage' setLoggedIn={setLoggedIn} setPageNumber={changePageNumber} changePage={changePage} setLoading={setLoading} setPageProps={setPageProps}  {...pageProps} />); break;
                    case 'RewardDetailPage':
                        setPageLabel("Reward Post Detail");
                        setInstruction(<ul>
                            <li>In this page, you can see all the details of the reward post.</li>
                            <li>If you are origin poster, you can click the button to manage all the contributed notes.</li>
                            <li>If you are not origin poster, you can click the button to write the note and contribute it.</li>
                            <li>Once you choose the best and all the reference note, you can't receive any note</li>
                            <li>The note chosen as a best note will be stored to your Owned Folder</li>
                        </ul>)
                        setPageComponent(<RewardDetailPage page='RewardDetailPage' setLoggedIn={setLoggedIn} pageLabel='Reward Detail' changePage={changePage} setLoading={setLoading} setPageProps={setPageProps} {...pageProps} />); break;
                    case 'RewardEditPage':
                        setPageLabel("Edit a Reward Post");
                        setInstruction(<ul>
                            <li>In this page, you can edit the information of the reward post.</li>
                        </ul>)
                        setPageComponent(<RewardEditPage page='RewardEditPage' setLoggedIn={setLoggedIn} changePage={changePage} setLoading={setLoading} setPageProps={setPageProps} {...pageProps} />); break;
                    case 'RewardNewPage':
                        setPageLabel("Create a Reward Post");
                        setInstruction(<ul>
                            <li>You have to enter the information of the reward post.</li>
                            <li>After you submit the post, the reward post will be shown in public</li>
                        </ul>)
                        setPageComponent(<RewardEditPage page='RewardNewPage' setLoggedIn={setLoggedIn} sendBellMessage={sendBellMessage} changePage={changePage} setLoading={setLoading} setPageProps={setPageProps}  {...pageProps} />); break;
                    case 'RewardOutlinePage':
                        setPageLabel("Results");
                        setInstruction(<ul>
                            <li>You can sort the reward posts by dropdown list</li>
                            <li>The post only show a part of detail. If you want to see all the details or contribute note, please click the post.</li>
                        </ul>
                        )
                        setPageComponent(<RewardOutlinePage page='RewardOutlinePage' setLoggedIn={setLoggedIn} changeSortMode={setSortMode} setPageNumber={changePageNumber} changePage={changePage} setLoading={setLoading} setPageProps={setPageProps}  {...pageProps} />); break;
                    case 'RewardRecommendPage':
                        setPageLabel("Recommended Reward Posts");
                        setInstruction(<ul>
                            <li>You can sort the reward posts by dropdown list</li>
                            <li>The post only show a part of detail. If you want to see all the details or contribute note, please click the post.</li>
                        </ul>
                        )
                        setPageComponent(<RewardRecommendPage page='RewardRecommendPage' setLoggedIn={setLoggedIn} changeSortMode={setSortMode} setPageNumber={changePageNumber} changePage={changePage} setLoading={setLoading} setPageProps={setPageProps}  {...pageProps} />); break;
                    case 'QnADetailPage':
                        setPageLabel("QA Post Detail");
                        setInstruction(<ul>
                            <li>In this page, you can see all the details of the QA post.</li>
                            <li>If you are origin poster, you can choose a best answer to reward it some point.</li>
                            <li>If you are not origin poster, you can click the button to write the note and contribute it.</li>
                            <li>You can edit and delete your answer in comment area while the best answer haven't be chose.</li>
                            <li>You can tag other commenter by using '@'</li>
                            <li>If you are origin poster and the best answer have be chose, you can archive the post then the post can only saw by yourself.</li>
                        </ul>)
                        setPageComponent(<QnADetailPage page='QnADetailPage' setLoggedIn={setLoggedIn} changePage={changePage} setLoading={setLoading} setPageProps={setPageProps}  {...pageProps} />); break;
                    case 'QnAOutlinePage':
                        setPageLabel("Results");
                        setInstruction(<ul>
                            <li>You can sort the QA posts by dropdown list</li>
                            <li>The post only show a part of detail. If you want to see all the details or answer the question, please click the post.</li>
                        </ul>
                        )
                        setPageComponent(<QnAOutlinePage page='QnAOutlinePage' setLoggedIn={setLoggedIn} changeSortMode={setSortMode} setPageNumber={changePageNumber} changePage={changePage} setLoading={setLoading} setPageProps={setPageProps} {...pageProps} />); break;
                    case 'QnAEditPage':
                        setPageLabel("Edit a QA Post");
                        setInstruction(<ul>
                            <li>In this page, you can edit the information of the QA post.</li>
                        </ul>)
                        setPageComponent(<QnAEditPage page='QnAEditPage' setLoggedIn={setLoggedIn} changePage={changePage} setLoading={setLoading} setPageProps={setPageProps}  {...pageProps} />); break;
                    case 'QnANewPage':
                        setPageLabel("Create a QA Post");
                        setInstruction(<ul>
                            <li>You have to enter the information of the QA post.</li>
                            <li>After you submit the post, the QA post will be shown in public</li>
                        </ul>)
                        setPageComponent(<QnAEditPage page='QnANewPage' setLoggedIn={setLoggedIn} sendBellMessage={sendBellMessage} changePage={changePage} setLoading={setLoading} setPageProps={setPageProps} {...pageProps} />); break;
                    case 'QnARecommendPage':
                        setPageLabel("Recommended QA Posts");
                        setInstruction(<ul>
                            <li>You can sort the QA posts by dropdown list</li>
                            <li>The post only show a part of detail. If you want to see all the details or answer the question, please click the post.</li>
                        </ul>
                        )
                        setPageComponent(<QnARecommendPage page='QnARecommendPage' setLoggedIn={setLoggedIn} changeSortMode={setSortMode} setPageNumber={changePageNumber} changePage={changePage} setLoading={setLoading} setPageProps={setPageProps} {...pageProps} />); break;
                    case 'CollabDetailPage':
                        setPageLabel("Collaborative Note Detail");
                        setInstruction(<ul>
                            <li>If you are a member of this collaborative note, you can see all the details of the collaborative note.</li>
                            <li>If you are not a member of this collaborative note, you can see all the details of the collaborative note post.</li>
                            <li>If you are not a member of this collaborative note, you can apply it and leave some message for application</li>
                        </ul>
                        )
                        setPageComponent(<CollabDetailPage page='CollabDetailPage' screenCapture={screenCapture} setScreenCapture={setScreenCapture} setLoggedIn={setLoggedIn} sendPrivateMessage={sendPrivateMessage} changePage={changePage} setLoading={setLoading} setPageProps={setPageProps} {...pageProps} />); break;
                    case 'CollabEditPage':
                        setPageLabel("Edit a Collaborative Note Post");
                        setInstruction(<ul>
                            <li>In this page, you can edit the information of the collaborative note post.</li>
                        </ul>)
                        setPageComponent(<CollabEditPage page='CollabEditPage' setLoggedIn={setLoggedIn} sendPrivateMessage={sendPrivateMessage} changePage={changePage} setLoading={setLoading} setPageProps={setPageProps} {...pageProps} />); break;
                    case 'CollabNoteEditPage':
                        setPageLabel("Edit a Collaborative Note");
                        setInstruction(<ul>
                            <li>In this page, if your are not origin poster or manager, you can only edit the content of the note.</li>
                            <li>In this page, if your are origin poster or manager, you can edit the information, content and the hashtags of the note.</li>
                            <li>In information editing phase, you have to enter the title, price, school, department, .etc of your note, and the title and price can't be empty.</li>
                            <li>In information editing phase, if you choose set the note public, it will be shown in public. And if you set the note private, it can only be saw by yourself.</li>
                            <li>In content editing phase, you can easily drag and drop block to edit your note.</li>
                            <li>In content editing phase, the leftmost tool in the sidebar is "Block", which you can create block by dragging them to the note. </li>
                            <li>In content editing phase, the middle tool in the sidebar is "Style", which you can change some styles like color, size, position, font-size, etc. of a block </li>
                            <li>In content editing phase, the rightmost tool in the sidebar is "Trait", which you can change some attribute like link, source, title, etc. of a block </li>
                            <li>In hashtag editing phase, on the left port, you can choose recommended hashtags and then they will add to your current hashtags on the right part. Or, you can enter some words and then press enter to add some hashtags</li>
                        </ul>
                        )
                        setPageComponent(<CollabNoteEditPage page='CollabNoteEditPage' setLoggedIn={setLoggedIn} changePage={changePage} setLoading={setLoading} setPageProps={setPageProps} {...pageProps} />); break;
                    case 'CollabNewPage':
                        setPageLabel("Create a Collaborative Note Post");
                        setInstruction(<ul>
                            <li>You have to enter the information of the collaborative note post.</li>
                            <li>After you submit the post, the collaborative note post will be shown in public</li>
                        </ul>)
                        setPageComponent(<CollabEditPage page='CollabNewPage' setLoggedIn={setLoggedIn} sendBellMessage={sendBellMessage} changePage={changePage} setLoading={setLoading} setPageProps={setPageProps} {...pageProps} />); break;
                    case 'CollabOutlinePage':
                        setPageLabel("Results");
                        setInstruction(<ul>
                            <li>You can sort the collaborative note posts by dropdown list</li>
                            <li>The post only show a part of detail. If you want to see all the details or apply, please click the post.</li>
                        </ul>
                        )
                        setPageComponent(<CollabOutlinePage page='CollabOutlinePage' changeSortMode={setSortMode} setLoggedIn={setLoggedIn} setPageNumber={changePageNumber} changePage={changePage} setLoading={setLoading} setPageProps={setPageProps} {...pageProps} />); break;
                    case 'CollabRecommendPage':
                        setPageLabel("Recommended Collaborative Note Posts");
                        setInstruction(<ul>
                            <li>You can sort the collaborative note posts by dropdown list</li>
                            <li>The post only show a part of detail. If you want to see all the details or apply, please click the post.</li>
                        </ul>
                        )
                        setPageComponent(<CollabRecommendPage page='CollabRecommendPage' setLoggedIn={setLoggedIn} changeSortMode={setSortMode} setPageNumber={changePageNumber} changePage={changePage} setLoading={setLoading} setPageProps={setPageProps} {...pageProps} />); break;
                    case 'FolderOutlinePage':
                        setPageLabel("Recommended Folder");
                        setInstruction(<ul>
                            <li>You can sort the folder by dropdown list</li>
                            <li>You can click the folder to see all the notes.</li>
                        </ul>
                        )
                        setPageComponent(<FolderOutlinePage page='FolderOutlinePage' setLoggedIn={setLoggedIn} setPageNumber={changePageNumber} changePage={changePage} setLoading={setLoading} setPageProps={setPageProps} {...pageProps} />); break;
                    case 'TagOutlinePage':
                        setPageLabel("Results");
                        setInstruction(<ul>
                            <li>The note only show a part of detail. If you want to see all the details or buy the note, please click the note.</li>
                        </ul>
                        )
                        setPageComponent(<TagOutlinePage page='TagOutlinePage' setLoggedIn={setLoggedIn} changeSortMode={setSortMode} setPageNumber={changePageNumber} changePage={changePage} setLoading={setLoading} setPageProps={setPageProps}  {...pageProps} />); break;
                    case 'PersonalPage':
                        setPageLabel("Personal Area");

                        setPageComponent(<PersonalPage page='PersonalPage' setLoggedIn={setLoggedIn} changePage={changePage} setLoading={setLoading} setPageProps={setPageProps} {...pageProps} />); break;
                    case 'ProfilePage':
                        setPageLabel("Profile");
                        setInstruction(<ul>
                            <li>If it is your profile, you can edit your personal information and manage following user or fans in this page.</li>
                            <li>If it is not your profile, you can see all the public notes and folders of the user.</li>
                        </ul>
                        )
                        setPageComponent(<ProfilePage page='ProfilePage' setLoggedIn={setLoggedIn} sendPrivateMessage={sendPrivateMessage} changePage={changePage} setLoading={setLoading} Avatar={changeAvatar} setAvatar={setChangeAvatar} setChangeAvatarNum={setChangeAvatarNum} setPageProps={setPageProps} {...pageProps} />); break;
                    case 'LoginPage':
                        setPageComponent(<LoginPage page='LoginPage' changePage={changePage} setLoading={setLoading} setPageProps={setPageProps} setLoggedIn={setLoggedIn} {...pageProps} />); break;
                    case 'SignUpPage':
                        setPageComponent(<SignUpPage page='SignUpPage' setLoggedIn={setLoggedIn} changePage={changePage} setLoading={setLoading} setPageProps={setPageProps} {...pageProps} />); break;
                    case 'VerificationPage':
                        setPageComponent(<VerificationPage page='VerificationPage' setLoggedIn={setLoggedIn} changePage={changePage} setLoading={setLoading} setPageProps={setPageProps} {...pageProps} />); break;
                    case 'ForgetPasswordPage':
                        setPageComponent(<ForgetPasswordPage page='ForgetPasswordPage' setLoggedIn={setLoggedIn} changePage={changePage} setLoading={setLoading} setPageProps={setPageProps} {...pageProps} />); break;
                    case 'ResetPasswordPage':
                        setPageComponent(<ResetPasswordPage setLoggedIn={setLoggedIn} page='ResetPasswordPage' changePage={changePage} setLoading={setLoading} setPageProps={setPageProps} {...pageProps} />); break;
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
                        <Navbar ringList={ringList} setRingList={setRingList} ringNumber={ringNumber} setRingNumber={setRingNumber} coinNum={coinNum} setCoinNum={setCoinNum} pageProps={pageProps} changeAvatar={changeAvatar} loggedIn={loggedIn} setPageProps={setPageProps} setLoggedIn={setLoggedIn} changeAvatarNum={changeAvatarNum} />

                        {pageLabel &&
                            <div className='outerPage__PageLabel'>
                                <Text color='gray' cls='Default' content={pageLabel} fontSize='30' display="inline-block" />
                                <QuestionCircleOutlined onClick={() => {
                                    notification.open({
                                        message: "Instruction",
                                        description: instruction,
                                        placement: 'topRight'
                                    });
                                }} />
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

export default SharePage