import React, { useState, useEffect } from 'react'
import MemberPage from "../MemberPage/MemberPage";
import QnADetailPage from "../QnADetailPage/QnADetailPage";
import NoteDetailPage from "../NoteDetailPage/NoteDetailPage";
import NoteOutlinePage from "../NoteOutlinePage/NoteOutlinePage";
import RewardDetailPage from "../RewardDetailPage/RewardDetailPage";
import RewardOutlinePage from "../RewardOutlinePage/RewardOutlinePage";
import QnAOutlinePage from "../QnAOutlinePage/QnAOutlinePage";
import CollabDetailPage from "../CollabDetailPage/CollabDetailPage";
import CollabOutlinePage from "../CollabOutlinePage/CollabOutlinePage";
import ScreenShotCapture from "../ScreenShotCapture";
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
import Navbar from '../../components/Navbar/Navbar';
import { PlusOutlined } from "@ant-design/icons";
import CollabNoteEditPage from "../CollabNoteEditPage/CollabNoteEditPage";

import './OuterPage.css'
import { Button, Drawer, message } from 'antd'
import { timers } from 'jquery';
import Cookie from '../../components/Cookies/Cookies';

const OuterPage = () => {
    const [pageProps, setPageProps] = useState({page: 'LoginPage'});
    const [pageComponent, setPageComponent] = useState(<></>)
    const [visible, setVisible] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const showDrawer = () => {
        setVisible(true);
    };

    const onClose = () => {
        setVisible(false);
    };


    useEffect(()=> {
        const cookieParser = new Cookie(document.cookie)
        const email = cookieParser.getCookieByName('email')
        if(email){
            setLoggedIn(true);
            setPageProps({page: 'PersonalPage'})
        }
    },[])

    useEffect(() => {
        console.log("page", pageProps.page)
        switch (pageProps.page) {
            case 'NoteDetailPage': setPageComponent(<NoteDetailPage page='NoteDetailPage' setPageProps={setPageProps} {...pageProps} />); break;
            case 'NoteEditPage': setPageComponent(<NoteEditPage page='NoteEditPage' setPageProps={setPageProps}  {...pageProps} />); break;
            case 'NoteNewPage': setPageComponent(<NoteEditPage page='NoteNewPage' setPageProps={setPageProps} {...pageProps} />); break;
            case 'NoteOutlinePage': setPageComponent(<NoteOutlinePage page='NoteOutlinePage' setPageProps={setPageProps}  {...pageProps} />); break;
            case 'RewardDetailPage': setPageComponent(<RewardDetailPage page='RewardDetailPage' setPageProps={setPageProps} {...pageProps} />); break;
            case 'RewardEditPage': setPageComponent(<RewardEditPage page='RewardEditPage' setPageProps={setPageProps} {...pageProps} />); break;
            case 'RewardNewPage': setPageComponent(<RewardEditPage page='RewardNewPage' setPageProps={setPageProps}  {...pageProps} />); break;
            case 'RewardOutlinePage': setPageComponent(<RewardOutlinePage page='RewardOutlinePage' setPageProps={setPageProps}  {...pageProps} />); break;
            case 'QnADetailPage': setPageComponent(<QnADetailPage page='QnADetailPage' setPageProps={setPageProps}  {...pageProps} />); break;
            case 'QnAOutlinePage': setPageComponent(<QnAOutlinePage page='QnAOutlinePage' setPageProps={setPageProps} {...pageProps} />); break;
            case 'QnAEditPage': setPageComponent(<QnAEditPage page='QnAEditPage' setPageProps={setPageProps}  {...pageProps} />); break;
            case 'QnANewPage': setPageComponent(<QnAEditPage page='QnANewPage' setPageProps={setPageProps} {...pageProps} />); break;
            case 'CollabDetailPage': setPageComponent(<CollabDetailPage page='CollabDetailPage' setPageProps={setPageProps} {...pageProps} />); break;
            case 'CollabEditPage': setPageComponent(<CollabEditPage page='CollabEditPage' setPageProps={setPageProps} {...pageProps} />); break;
            case 'CollabNoteEditPage': setPageComponent(<CollabNoteEditPage page='CollabNoteEditPage' setPageProps={setPageProps} {...pageProps} />); break;
            case 'CollabNewPage': setPageComponent(<CollabEditPage page='CollabNewPage' setPageProps={setPageProps} {...pageProps} />); break;
            case 'CollabOutlinePage': setPageComponent(<CollabOutlinePage page='CollabOutlinePage' setPageProps={setPageProps} {...pageProps} />); break;
            case 'FolderOutlinePage': setPageComponent(<CollabOutlinePage page='FolderOutlinePage' setPageProps={setPageProps} {...pageProps} />); break;
            case 'PersonalPage': setPageComponent(<PersonalPage page='PersonalPage' setPageProps={setPageProps} {...pageProps}/>); break;
            case 'ProfilePage': setPageComponent(<ProfilePage page='ProfilePage' setPageProps={setPageProps} {...pageProps}/>); break;
            case 'LoginPage': setPageComponent(<LoginPage page='LoginPage' setPageProps={setPageProps} setLoggedIn={setLoggedIn} {...pageProps}/>); break;
            case 'SignUpPage': setPageComponent(<SignUpPage page='SignUpPage' setPageProps={setPageProps} {...pageProps}/>); break;
            case 'VerificationPage': setPageComponent(<VerificationPage page='VerificationPage' setPageProps={setPageProps} {...pageProps}/>); break;
            default: setPageComponent(<></>); break;
        }
    }, [pageProps])


    const floatBtnOnClick = () => {
        message.info("float button click!")
    }
    return (
        <>
            <div className='outerPage'>
                <Navbar loggedIn={loggedIn} setPageProps={setPageProps} setLoggedIn={setLoggedIn}/>
                <div className='outerPage__Layout'>
                    {pageComponent&&pageComponent}
                </div>
            </div>
            <div className='drawerBtn'>
                <Button type="primary" onClick={showDrawer}>
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
                        school:'',
                        headName:'',
                        Downloadable:true,
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
                        page:'RewardEditPage'
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
                        school:'',
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
                        postId: '62b07f9c0997e642d14020c6',
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
                        school:'',
                        headName:'',
                        Downloadable:true,
                        page: 'CollabOutlinePage'

                    })
                }}>
                    CollabOutlinePage
                </Button>
                <Button type="primary" onClick={() => {
                    setPageProps({
                        keyWord: 'test',
                        author:'a',
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
                        email:'a147896325811%40gmail.com',
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
            </Drawer>
            <div className="floatButton" onClick={floatBtnOnClick}>
                <PlusOutlined />
            </div>
        </>
    )
}

export default OuterPage