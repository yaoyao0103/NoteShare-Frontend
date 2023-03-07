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
import FolderDetailPage from '../FolderDetailPage/FolderDetailPage';
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
import { Button, Drawer, message, Spin, notification, Avatar, Tooltip, Switch } from 'antd'
import Text from '../../components/Text/Text';
import { LoadingOutlined } from '@ant-design/icons';
import { useParams } from "react-router-dom";
import { RadiusBottomleftOutlined } from '@ant-design/icons';
import { timers } from 'jquery';
import Cookie from '../../components/Cookies/Cookies';
import { set } from 'react-hook-form';
import { editor } from '../../api_utils/geditor_config';
import { createMedia } from "@artsy/fresnel"
const { MediaContextProvider, Media } = createMedia({
    breakpoints: {
        sm: 0,
        lm: 391,
        md: 768,
        lg: 1024,
        xl: 1192,
    },
})
var sock
var stompClient;
var cookieParser = new Cookie(document.cookie);
// var hasBack = false
// var hasChange = true
// var isDone = fals

const OuterPage = () => {
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
    const [instructionChi, setInstructionChi] = useState("無介紹")
    const [isChanging, setIsChanging] = useState(false);
    const [api, contextHolder] = notification.useNotification();
    const [pageLabel, setPageLabel] = useState(null)
    const [screenCapture, setScreenCapture] = useState('');
    const [hasLink, setHasLink] = useState(false);
    const [language, setLanguage] = useState(null)
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
            sock = new SockJS('https://noteshare-backend.soselab.tw/websocket')
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
                'userObjAvatar': "https://gravatar.com/avatar/7fdc37318319569a920fd7d087c14d1f?s=400&d=robohash&r=x"
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
                'userObjAvatar': "https://gravatar.com/avatar/7fdc37318319569a920fd7d087c14d1f?s=400&d=robohash&r=x"
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
                <Avatar className="toast__Avatar" style={{ marginRight: '5em' }} size={40} src={"https://gravatar.com/avatar/7fdc37318319569a920fd7d087c14d1f?s=400&d=robohash&r=x"}></Avatar>
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
            switch (type) {
                case 'note':
                    setPageProps({ page: 'NoteDetailPage', noteId: Id })
                case 'qnA':
                    setPageProps({ page: 'QnADetailPage', postId: Id })
                case 'reward':
                    setPageProps({ page: 'RewardDetailPage', postId: Id })
                case 'collab':
                    setPageProps({ page: 'CollabDetailPage', postId: Id })
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
        setLanguage(null)

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
            ) && !loggedIn && !Id) {
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
                    pageProps.page === 'FolderOutlinePage' || pageProps.page === 'PersonalPage' || pageProps.page === 'TagOutlinePage' || pageProps.page === 'FolderDetailPage'
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
                    pageProps.page === 'ProfilePage' || pageProps.page === 'FolderOutlinePage' || pageProps.page === 'TagOutlinePage' || pageProps.page === 'FolderDetailPage'
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
                        setInstructionChi(<ul>
                            <li>在此頁面中，您可以查看筆記的所有詳細信息。</li>
                            <li>您可以在此頁面查看您的 SPR 和 CR。</li>
                            <li>當筆記設置為可下載時，您可以下載 pdf 文件。</li>
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
                        setInstructionChi(<ul>
                            <li>在此頁面中，您可以編輯筆記的信息、內容和標籤。</li>
                            <li>在信息編輯階段，您可以編輯筆記的標題、價格、學校、部門等，標題和價格不能為空。</li>
                            <li>在信息編輯階段，如果您選擇將註釋設置為公開，它將公開顯示。如果您將筆記設為私密，則只能由您自己查看。</li>
                            <li>在內容編輯階段，您可以輕鬆拖放塊來編輯您的筆記。</li>
                            <li>在內容編輯階段，側邊欄最左邊的工具是“塊”，您可以通過將它們拖到筆記上來創建塊。 </li>
                            <li>在內容編輯階段，側邊欄中的中間工具是“樣式”，可以更改塊的顏色、大小、位置、字體大小等樣式</li>
                            <li>在內容編輯階段，側邊欄最右邊的工具是“Trait”，您可以更改區塊的鏈接、來源、標題等屬性</li>
                            <li>在主題標籤編輯階段，在左側端口，您可以選擇推薦的主題標籤，然後它們將添加到您當前在右側的主題標籤中。或者，您可以輸入一些單詞，然後按 Enter 以添加一些主題標籤</li>
                        </ul>)
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
                        setInstructionChi(<ul>
                            <li>在此頁面中，您必須查看筆記的信息、內容和標籤。</li>
                            <li>在信息編輯階段，您必須輸入您的筆記的標題、價格、學校、部門等，並且標題和價格不能為空。</li>
                            <li>在信息編輯階段，如果您選擇將註釋設置為公開，它將公開顯示。如果您將筆記設為私密，則只能由您自己查看。</li>
                            <li>在內容編輯階段，您可以輕鬆拖放塊來編輯您的筆記。</li>
                            <li>在內容編輯階段，側邊欄最左邊的工具是“塊”，您可以通過將它們拖到筆記上來創建塊。 </li>
                            <li>在內容編輯階段，側邊欄中的中間工具是“樣式”，可以更改塊的顏色、大小、位置、字體大小等樣式</li>
                            <li>在內容編輯階段，側邊欄最右邊的工具是“Trait”，您可以更改區塊的鏈接、來源、標題等屬性</li>
                            <li>在主題標籤編輯階段，在左側端口，您可以選擇推薦的主題標籤，然後它們將添加到您當前在右側的主題標籤中。或者，您可以輸入一些單詞，然後按 Enter 以添加一些主題標籤</li>
                        </ul>)
                        setPageComponent(<NoteEditPage page='NoteNewPage' setLoggedIn={setLoggedIn} sendBellMessage={sendBellMessage} sendPrivateMessage={sendPrivateMessage} changePage={changePage} setLoading={setLoading} setPageProps={setPageProps} {...pageProps} />); break;
                    case 'NoteOutlinePage':
                        setPageLabel("Results");
                        setInstruction(<ul>
                            <li>You can sort the notes by dropdown list</li>
                            <li>The page only show a part of note. If you want to see all the details or buy the note, please click the note.</li>
                        </ul>
                        )
                        setInstructionChi(<ul>
                            <li>您可以通過下拉列表對筆記進行排序</li>
                            <li>該頁面僅顯示部分註釋。 如果您想查看所有詳細信息或購買便箋，請點擊便箋。</li>
                        </ul>)
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
                        setInstructionChi(<ul>
                            <li>在此頁面中，您可以查看獎勵帖子的所有詳細信息。</li>
                            <li>如果您是原創發帖者，可以點擊按鈕管理所有投稿筆記。</li>
                            <li>如果您不是原始發帖人，您可以點擊按鈕寫筆記並投稿。</li>
                            <li>一旦您選擇了最好的和所有的參考筆記，您將無法收到任何筆記</li>
                            <li>被選為最佳筆記的筆記將存儲到您的自有文件夾中</li>
                        </ul>)
                        setPageComponent(<RewardDetailPage page='RewardDetailPage' setLoggedIn={setLoggedIn} pageLabel='Reward Detail' changePage={changePage} setLoading={setLoading} setPageProps={setPageProps} {...pageProps} />); break;
                    case 'RewardEditPage':
                        setPageLabel("Edit a Reward Post");
                        setInstruction(<ul>
                            <li>In this page, you can edit the information of the reward post.</li>
                        </ul>)
                        setInstructionChi(<ul>
                            <li>在此頁面，您可以編輯打賞帖的信息。</li>
                        </ul>)
                        setPageComponent(<RewardEditPage page='RewardEditPage' setLoggedIn={setLoggedIn} changePage={changePage} setLoading={setLoading} setPageProps={setPageProps} {...pageProps} />); break;
                    case 'RewardNewPage':
                        setPageLabel("Create a Reward Post");
                        setInstruction(<ul>
                            <li>You have to enter the information of the reward post.</li>
                            <li>After you submit the post, the reward post will be shown in public</li>
                        </ul>)
                        setInstructionChi(<ul>
                            <li>您必須輸入獎勵帖子的信息。</li>
                            <li>您提交帖子後，獎勵帖子將公開顯示</li>
                        </ul>)
                        setPageComponent(<RewardEditPage page='RewardNewPage' setLoggedIn={setLoggedIn} sendBellMessage={sendBellMessage} changePage={changePage} setLoading={setLoading} setPageProps={setPageProps}  {...pageProps} />); break;
                    case 'RewardOutlinePage':
                        setPageLabel("Results");
                        setInstruction(<ul>
                            <li>You can sort the reward posts by dropdown list</li>
                            <li>The post only show a part of detail. If you want to see all the details or contribute note, please click the post.</li>
                        </ul>
                        )
                        setInstructionChi(<ul>
                            <li>您可以通過下拉列表對獎勵帖子進行排序</li>
                            <li>帖子只顯示了部分細節。 如果您想查看所有詳細信息或投稿備註，請點擊帖子。</li>
                        </ul>)
                        setPageComponent(<RewardOutlinePage page='RewardOutlinePage' setLoggedIn={setLoggedIn} changeSortMode={setSortMode} setPageNumber={changePageNumber} changePage={changePage} setLoading={setLoading} setPageProps={setPageProps}  {...pageProps} />); break;
                    case 'RewardRecommendPage':
                        setPageLabel("Recommended Reward Posts");
                        setInstruction(<ul>
                            <li>You can sort the reward posts by dropdown list</li>
                            <li>The post only show a part of detail. If you want to see all the details or contribute note, please click the post.</li>
                        </ul>
                        )
                        setInstructionChi(<ul>
                            <li>您可以通過下拉列表對獎勵帖子進行排序</li>
                            <li>帖子只顯示了部分細節。 如果您想查看所有詳細信息或投稿備註，請點擊帖子。</li>
                        </ul>)
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
                        setInstructionChi(<ul>
                            <li>在此頁面中，您可以查看 QA 帖子的所有詳細信息。</li>
                            <li>如果你是原創發帖者，你可以選擇一個最佳答案來獎勵它。</li>
                            <li>如果您不是原始發帖人，您可以點擊按鈕寫筆記並投稿。</li>
                            <li>您可以在評論區編輯和刪除未選擇最佳答案的答案。</li>
                            <li>您可以使用“@”標記其他評論者</li>
                            <li>如果你是發帖者，並且選擇了最佳答案，你可以將帖子存檔，然後帖子只能自己看到。</li>
                        </ul>)
                        setPageComponent(<QnADetailPage page='QnADetailPage' setLoggedIn={setLoggedIn} changePage={changePage} setLoading={setLoading} setPageProps={setPageProps}  {...pageProps} />); break;
                    case 'QnAOutlinePage':
                        setPageLabel("Results");
                        setInstruction(<ul>
                            <li>You can sort the QA posts by dropdown list</li>
                            <li>The post only show a part of detail. If you want to see all the details or answer the question, please click the post.</li>
                        </ul>
                        )
                        setInstructionChi(<ul>
                            <li>您可以通過下拉列表對 QA 帖子進行排序</li>
                            <li>帖子只顯示了部分細節。 如果您想查看所有詳細信息或回答問題，請點擊帖子。</li>
                        </ul>)
                        setPageComponent(<QnAOutlinePage page='QnAOutlinePage' setLoggedIn={setLoggedIn} changeSortMode={setSortMode} setPageNumber={changePageNumber} changePage={changePage} setLoading={setLoading} setPageProps={setPageProps} {...pageProps} />); break;
                    case 'QnAEditPage':
                        setPageLabel("Edit a QA Post");
                        setInstruction(<ul>
                            <li>In this page, you can edit the information of the QA post.</li>
                        </ul>)
                        setInstructionChi(<ul>
                            <li>在此頁面中，您可以編輯 QA 帖子的信息。</li>
                        </ul>)
                        setPageComponent(<QnAEditPage page='QnAEditPage' setLoggedIn={setLoggedIn} changePage={changePage} setLoading={setLoading} setPageProps={setPageProps}  {...pageProps} />); break;
                    case 'QnANewPage':
                        setPageLabel("Create a QA Post");
                        setInstruction(<ul>
                            <li>You have to enter the information of the QA post.</li>
                            <li>After you submit the post, the QA post will be shown in public</li>
                        </ul>)
                        setInstructionChi(<ul>
                            <li>您必須輸入 QA 帖子的信息。</li>
                            <li>提交帖子後，QA 帖子將公開顯示</li>
                        </ul>)
                        setPageComponent(<QnAEditPage page='QnANewPage' setLoggedIn={setLoggedIn} sendBellMessage={sendBellMessage} changePage={changePage} setLoading={setLoading} setPageProps={setPageProps} {...pageProps} />); break;
                    case 'QnARecommendPage':
                        setPageLabel("Recommended QA Posts");
                        setInstruction(<ul>
                            <li>You can sort the QA posts by dropdown list</li>
                            <li>The post only show a part of detail. If you want to see all the details or answer the question, please click the post.</li>
                        </ul>
                        )
                        setInstructionChi(<ul>
                            <li>您可以通過下拉列表對 QA 帖子進行排序</li>
                            <li>帖子只顯示了部分細節。 如果您想查看所有詳細信息或回答問題，請點擊帖子。</li>
                        </ul>)
                        setPageComponent(<QnARecommendPage page='QnARecommendPage' setLoggedIn={setLoggedIn} changeSortMode={setSortMode} setPageNumber={changePageNumber} changePage={changePage} setLoading={setLoading} setPageProps={setPageProps} {...pageProps} />); break;
                    case 'CollabDetailPage':
                        setPageLabel("Collaborative Note Detail");
                        setInstruction(<ul>
                            <li>If you are a member of this collaborative note, you can see all the details of the collaborative note.</li>
                            <li>If you are not a member of this collaborative note, you can see all the details of the collaborative note post.</li>
                            <li>If you are not a member of this collaborative note, you can apply it and leave some message for application</li>
                        </ul>
                        )
                        setInstructionChi(<ul>
                            <li>如果您是此協作筆記的成員，則可以查看協作筆記的所有詳細信息。</li>
                            <li>如果您不是此協作筆記的成員，則可以查看協作筆記帖子的所有詳細信息。</li>
                            <li>如果您不是此協作筆記的成員，您可以申請並留言申請</li>
                        </ul>)
                        setPageComponent(<CollabDetailPage page='CollabDetailPage' screenCapture={screenCapture} setScreenCapture={setScreenCapture} setLoggedIn={setLoggedIn} sendPrivateMessage={sendPrivateMessage} changePage={changePage} setLoading={setLoading} setPageProps={setPageProps} {...pageProps} />); break;
                    case 'CollabEditPage':
                        setPageLabel("Edit a Collaborative Note Post");
                        setInstruction(<ul>
                            <li>In this page, you can edit the information of the collaborative note post.</li>
                        </ul>)
                        setInstructionChi(<ul>
                            <li>在此頁面中，您可以編輯協作筆記帖子的信息。</li>
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
                        setInstructionChi(<ul>
                            <li>在此頁面中，如果您不是原始發帖人或管理員，則只能編輯備註內容。</li>
                            <li>在此頁面中，如果您是原始發帖人或管理員，您可以編輯備註的信息、內容和標籤。</li>
                            <li>在信息編輯階段，您必須輸入您的筆記的標題、價格、學校、部門等，並且標題和價格不能為空。</li>
                            <li>在信息編輯階段，如果您選擇將註釋設置為公開，它將公開顯示。如果您將筆記設為私密，則只能由您自己查看。</li>
                            <li>在內容編輯階段，您可以輕鬆拖放塊來編輯您的筆記。</li>
                            <li>在內容編輯階段，側邊欄最左邊的工具是“塊”，您可以通過將它們拖到筆記上來創建塊。 </li>
                            <li>在內容編輯階段，側邊欄中的中間工具是“樣式”，可以更改塊的顏色、大小、位置、字體大小等樣式</li>
                            <li>在內容編輯階段，側邊欄最右邊的工具是“Trait”，您可以更改區塊的鏈接、來源、標題等屬性</li>
                            <li>在主題標籤編輯階段，在左側端口，您可以選擇推薦的主題標籤，然後它們將添加到您當前在右側的主題標籤中。或者，您可以輸入一些單詞，然後按 Enter 以添加一些主題標籤</li>
                        </ul>)
                        setPageComponent(<CollabNoteEditPage page='CollabNoteEditPage' setLoggedIn={setLoggedIn} changePage={changePage} setLoading={setLoading} setPageProps={setPageProps} {...pageProps} />); break;
                    case 'CollabNewPage':
                        setPageLabel("Create a Collaborative Note Post");
                        setInstruction(<ul>
                            <li>You have to enter the information of the collaborative note post.</li>
                            <li>After you submit the post, the collaborative note post will be shown in public</li>
                        </ul>)
                        setInstructionChi(<ul>
                            <li>您必須輸入協作筆記帖子的信息。</li>
                            <li>您提交帖子後，協作筆記帖子將公開顯示</li>
                        </ul>)
                        setPageComponent(<CollabEditPage page='CollabNewPage' setLoggedIn={setLoggedIn} sendBellMessage={sendBellMessage} changePage={changePage} setLoading={setLoading} setPageProps={setPageProps} {...pageProps} />); break;
                    case 'CollabOutlinePage':
                        setPageLabel("Results");
                        setInstruction(<ul>
                            <li>You can sort the collaborative note posts by dropdown list</li>
                            <li>The post only show a part of detail. If you want to see all the details or apply, please click the post.</li>
                        </ul>
                        )
                        setInstructionChi(<ul>
                            <li>您可以通過下拉列表對協作筆記帖子進行排序</li>
                            <li>帖子只顯示了部分細節。 如果您想查看所有詳情或申請，請點擊帖子。</li>
                        </ul>)
                        setPageComponent(<CollabOutlinePage page='CollabOutlinePage' changeSortMode={setSortMode} setLoggedIn={setLoggedIn} setPageNumber={changePageNumber} changePage={changePage} setLoading={setLoading} setPageProps={setPageProps} {...pageProps} />); break;
                    case 'CollabRecommendPage':
                        setPageLabel("Recommended Collaborative Note Posts");
                        setInstruction(<ul>
                            <li>You can sort the collaborative note posts by dropdown list</li>
                            <li>The post only show a part of detail. If you want to see all the details or apply, please click the post.</li>
                        </ul>
                        )
                        setInstructionChi(<ul>
                            <li>您可以通過下拉列表對協作筆記帖子進行排序</li>
                            <li>帖子只顯示了部分細節。 如果您想查看所有詳情或申請，請點擊帖子。</li>
                        </ul>)
                        setPageComponent(<CollabRecommendPage page='CollabRecommendPage' setLoggedIn={setLoggedIn} changeSortMode={setSortMode} setPageNumber={changePageNumber} changePage={changePage} setLoading={setLoading} setPageProps={setPageProps} {...pageProps} />); break;
                    case 'FolderOutlinePage':
                        setPageLabel("Recommended Folder");
                        setInstruction(<ul>
                            <li>You can sort the folder by dropdown list</li>
                            <li>You can click the folder to see all the notes.</li>
                        </ul>
                        )
                        setInstructionChi(<ul>
                            <li>您可以通過下拉列表對文件夾進行排序</li>
                            <li>您可以點擊文件夾查看所有筆記。</li>
                        </ul>)
                        setPageComponent(<FolderOutlinePage page='FolderOutlinePage' setLoggedIn={setLoggedIn} setPageNumber={changePageNumber} changePage={changePage} setLoading={setLoading} setPageProps={setPageProps} {...pageProps} />); break;
                    case 'FolderDetailPage':
                        setPageLabel("Folder Detail");
                        setPageComponent(<FolderDetailPage page='FolderDetailPage' setLoggedIn={setLoggedIn}  setPageNumber={changePageNumber} changePage={changePage} setLoading={setLoading} setPageProps={setPageProps}  {...pageProps} />); break;
                        break;
                    case 'TagOutlinePage':
                        setPageLabel("Results");
                        setInstruction(<ul>
                            <li>The note only show a part of detail. If you want to see all the details or buy the note, please click the note.</li>
                        </ul>
                        )
                        setInstructionChi(<ul>
                            <li>註釋僅顯示部分細節。 如果您想查看所有詳細信息或購買便箋，請點擊便箋。</li>
                        </ul>)
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
                        setInstructionChi(<ul>
                            <li>如果是您的個人資料，您可以在此頁面編輯您的個人信息並管理關注的用戶或粉絲。</li>
                            <li>如果不是你的個人資料，你可以看到該用戶的所有公開筆記和文件夾。</li>
                        </ul>)
                        setPageComponent(<ProfilePage page='ProfilePage' setLoggedIn={setLoggedIn} sendPrivateMessage={sendPrivateMessage} changePage={changePage} setLoading={setLoading} Avatar={"https://gravatar.com/avatar/7fdc37318319569a920fd7d087c14d1f?s=400&d=robohash&r=x"} setAvatar={setChangeAvatar} setChangeAvatarNum={setChangeAvatarNum} setPageProps={setPageProps} {...pageProps} />); break;
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

    const onSwitchChange = () => {
        if (language == null)
            setLanguage(true)
        else
            setLanguage(!language)
    }

    useEffect(() => {
        notification.destroy();
        if (language != null) {
            if (language) {
                notification.open({
                    message: (
                        <>
                            <a>Instruction</a><Switch style={{ marginLeft: '1em' }} checkedChildren="English" unCheckedChildren="中文" defaultUnChecked onChange={onSwitchChange} />
                        </>
                    ),
                    description: instructionChi,
                    placement: 'topRight'
                });
            }
            else {
                notification.open({
                    message: (
                        <>
                            <a>Instruction</a><Switch style={{ marginLeft: '1em' }} checkedChildren="English" unCheckedChildren="中文" defaultChecked onChange={onSwitchChange} />
                        </>
                    ),
                    description: instruction,
                    placement: 'topRight'
                });
            }
        }

    }, [language])

    return (
        <>
            <div className='outerPage'>
                <>
                    <Spin wrapperClassName={'outerPage__Loading'} indicator={antIcon} spinning={loading} style={{ width: '100%', height: '100%' }}>
                        <Navbar ringList={ringList} setRingList={setRingList} ringNumber={ringNumber} setRingNumber={setRingNumber} coinNum={coinNum} setCoinNum={setCoinNum} pageProps={pageProps} changeAvatar={"https://gravatar.com/avatar/7fdc37318319569a920fd7d087c14d1f?s=400&d=robohash&r=x"} loggedIn={loggedIn} setPageProps={setPageProps} setLoggedIn={setLoggedIn} changeAvatarNum={changeAvatarNum} />
                        <MediaContextProvider >
                            <Media at="xl" className='outlineContentTemplate__Media'>
                                {pageLabel &&
                                    <div className='outerPage__PageLabel'>
                                        <Text color='gray' cls='Default' content={pageLabel} fontSize='30' display="inline-block" />
                                        <QuestionCircleOutlined onClick={() => {
                                            notification.open({
                                                message: (
                                                    <>
                                                        <a>Instruction</a><Switch style={{ marginLeft: '1em' }} checkedChildren="English" unCheckedChildren="中文" defaultChecked onChange={onSwitchChange} />
                                                    </>
                                                ),
                                                description: !language ? instruction : instructionChi,
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
                            </Media>
                            <Media at="lg" className='outlineContentTemplate__Media'>
                                {pageLabel &&
                                    <div className='outerPage__PageLabel'>
                                        <Text color='gray' cls='Default' content={pageLabel} fontSize='30' display="inline-block" />
                                        <QuestionCircleOutlined onClick={() => {
                                            notification.open({
                                                message: (
                                                    <>
                                                        <a>Instruction</a><Switch style={{ marginLeft: '1em' }} checkedChildren="English" unCheckedChildren="中文" defaultChecked onChange={onSwitchChange} />
                                                    </>
                                                ),
                                                description: !language ? instruction : instructionChi,
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
                            </Media>
                            <Media at="md" className='outlineContentTemplate__Media'>
                                {pageLabel &&
                                    <div className='outerPage__PageLabel'>
                                        <Text color='gray' cls='Default' content={pageLabel} fontSize='30' display="inline-block" />
                                        <QuestionCircleOutlined onClick={() => {
                                            notification.open({
                                                message: (
                                                    <>
                                                        <a>Instruction</a><Switch style={{ marginLeft: '1em' }} checkedChildren="English" unCheckedChildren="中文" defaultChecked onChange={onSwitchChange} />
                                                    </>
                                                ),
                                                description: !language ? instruction : instructionChi,
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
                            </Media>
                            <Media at="lm" className='outlineContentTemplate__Media'>
                                {pageLabel &&
                                    <div className='outerPage__PageLabel'>
                                        <Text  width={'70%'} wordWrap={'break-word'} color='gray' cls='Default' content={pageLabel} fontSize='30' display="inline-block" />
                                        <QuestionCircleOutlined onClick={() => {
                                            notification.open({
                                                message: (
                                                    <>
                                                        <a>Instruction</a><Switch style={{ marginLeft: '1em' }} checkedChildren="English" unCheckedChildren="中文" defaultChecked onChange={onSwitchChange} />
                                                    </>
                                                ),
                                                description: !language ? instruction : instructionChi,
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
                            </Media>
                            <Media at="sm" className='outlineContentTemplate__Media'>
                                {pageLabel &&
                                    <div className='outerPage__PageLabel'>
                                        <Text width={'70%'} wordWrap={'break-word'}color='gray' cls='Default' content={pageLabel} fontSize='30' display="inline-block" />
                                        <QuestionCircleOutlined onClick={() => {
                                            notification.open({
                                                message: (
                                                    <>
                                                        <a>Instruction</a><Switch style={{ marginLeft: '1em' }} checkedChildren="English" unCheckedChildren="中文" defaultChecked onChange={onSwitchChange} />
                                                    </>
                                                ),
                                                description: !language ? instruction : instructionChi,
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
                            </Media>
                        </MediaContextProvider>
                    </Spin>
                </>

            </div>

        </>
    )
}

export default OuterPage