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
import ProfilePage from "../ProfilePage/ProfilePage";
import PersonalPage from "../PersonalPage/PersonalPage";
import LoginPage from "../LoginPage/LoginPage";
import SignUpPage from "../SignUpPage/SignUpPage";
import VerificationPage from "../VerificationPage/VerificationPage";
import Navbar from '../../components/Navbar/Navbar';
import './OuterPage.css'
import { Button, Drawer } from 'antd'
import { timers } from 'jquery';

const OuterPage = () => {
    const [currPage, setCurrPage] = useState('LoginPage');
    const [pageProps, setPageProps] = useState({});
    const [pageComponent, setPageComponent] = useState(<></>)
    const [visible, setVisible] = useState(false);
    const [searchCondition,setSearchCondition]=useState({});
    const showDrawer = () => {
        setVisible(true);
    };

    const onClose = () => {
        setVisible(false);
    };
    useEffect(() => {
        console.log(currPage)
        switch (currPage) {
            case 'NoteDetailPage': setPageComponent(<NoteDetailPage page='NoteDetailPage' setPageProps={setPageProps} setCurrPage={setCurrPage} {...pageProps} />); break;
            case 'NoteEditPage': setPageComponent(<NoteEditPage page='NoteEditPage' setPageProps={setPageProps} setCurrPage={setCurrPage} {...pageProps} />); break;
            case 'NoteNewPage': setPageComponent(<NoteEditPage page='NoteNewPage' setPageProps={setPageProps} setCurrPage={setCurrPage} {...pageProps} />); break;
            case 'NoteOutlinePage': setPageComponent(<NoteOutlinePage page='NoteOutlinePage' setPageProps={setPageProps} setCurrPage={setCurrPage} {...pageProps} />); break;
            case 'RewardDetailPage': setPageComponent(<RewardDetailPage page='RewardDetailPage' setPageProps={setPageProps} setCurrPage={setCurrPage} {...pageProps} />); break;
            case 'RewardEditPage': setPageComponent(<RewardEditPage page='RewardEditPage' setPageProps={setPageProps} setCurrPage={setCurrPage} {...pageProps} />); break;
            case 'RewardNewPage': setPageComponent(<RewardEditPage page='RewardNewPage' setPageProps={setPageProps} setCurrPage={setCurrPage} {...pageProps} />); break;
            case 'RewardOutlinePage': setPageComponent(<RewardOutlinePage page='RewardOutlinePage' setPageProps={setPageProps} setCurrPage={setCurrPage} {...pageProps} />); break;
            case 'QnADetailPage': setPageComponent(<QnADetailPage page='QnADetailPage' setPageProps={setPageProps} setCurrPage={setCurrPage} {...pageProps} />); break;
            case 'QnAOutlinePage': setPageComponent(<QnAOutlinePage page='QnAOutlinePage' setPageProps={setPageProps} setCurrPage={setCurrPage} {...pageProps} />); break;
            case 'QnAEditPage': setPageComponent(<QnAEditPage page='QnAEditPage' setPageProps={setPageProps} setCurrPage={setCurrPage} {...pageProps} />); break;
            case 'QnANewPage': setPageComponent(<QnAEditPage page='QnANewPage' setPageProps={setPageProps} setCurrPage={setCurrPage} {...pageProps} />); break;
            case 'CollabDetailPage': setPageComponent(<CollabDetailPage page='CollabDetailPage' setPageProps={setPageProps} setCurrPage={setCurrPage} {...pageProps} />); break;
            case 'CollabEditPage': setPageComponent(<CollabEditPage page='CollabEditPage' setPageProps={setPageProps} setCurrPage={setCurrPage} {...pageProps} />); break;
            case 'CollabNewPage': setPageComponent(<CollabEditPage page='CollabNewPage' setPageProps={setPageProps} setCurrPage={setCurrPage} {...pageProps} />); break;
            case 'CollabOutlinePage': setPageComponent(<CollabOutlinePage page='CollabOutlinePage' setPageProps={setPageProps} setCurrPage={setCurrPage} {...pageProps} />); break;
            case 'PersonalPage': setPageComponent(<PersonalPage page='PersonalPage' setPageProps={setPageProps} setCurrPage={setCurrPage} />); break;
            case 'ProfilePage': setPageComponent(<ProfilePage page='ProfilePage' setPageProps={setPageProps} setCurrPage={setCurrPage}  {...pageProps}/>); break;
            case 'LoginPage': setPageComponent(<LoginPage page='LoginPage' setPageProps={setPageProps} setCurrPage={setCurrPage} />); break;
            case 'SignUpPage': setPageComponent(<SignUpPage page='SignUpPage' setPageProps={setPageProps} setCurrPage={setCurrPage} />); break;
            case 'VerificationPage': setPageComponent(<VerificationPage page='VerificationPage' setPageProps={setPageProps} setCurrPage={setCurrPage} {...pageProps}/>); break;
            default: setPageComponent(<></>); break;
        }
    }, [currPage])
    useEffect(() => {
        //console.log(searchCondition);
        if(searchCondition.keyword)
            setPageProps(searchCondition);
        //setCurrPage(searchCondition.page+'OutlinePage');
    }, [searchCondition])
    useEffect(() => {
        if(searchCondition.keyword)
        setCurrPage(searchCondition.page+'OutlinePage');
    }, [pageProps])
    return (
        <>
            <div className='outerPage'>
                <Navbar currPage={currPage} setCurrPage={setCurrPage} setSearchCondition={setSearchCondition}/>
                <div className='outerPage__Layout'>
                    {pageComponent}
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
                        noteId: "62b477d9c291fe27002cae3c"
                    })
                    setCurrPage('NoteDetailPage');
                }} >
                    NoteDetailPage
                </Button>
                <Button type="primary" onClick={() => {
                    setPageProps({
                        noteId: "62b477d9c291fe27002cae3c",
                        action: "edit"
                    })
                    setCurrPage('NoteEditPage');
                }}>
                    NoteEditPage
                </Button>
                <Button type="primary" onClick={() => {
                    setPageProps({
                        action: "new"
                    })
                    setCurrPage('NoteNewPage');
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
                    })
                    setCurrPage('NoteOutlinePage');
                }}>
                    NoteOutlinePage
                </Button>
                <Button type="primary" onClick={() => {
                    setPageProps({
                        postId: '62b0891f0997e642d1402113'
                    })
                    setCurrPage('RewardDetailPage');
                }}>
                    RewardDetailPage
                </Button>
                <Button type="primary" onClick={() => {
                    setPageProps({
                        postId: '62b0891f0997e642d1402113',
                        type: 'reward',
                        action: 'edit'
                    })
                    setCurrPage('RewardEditPage');
                }}>
                    RewardEditPage
                </Button>
                <Button type="primary" onClick={() => {
                    setPageProps({
                        type: 'reward',
                        action: 'new'
                    })
                    setCurrPage('RewardNewPage');
                }}>
                    RewardNewPage
                </Button>
                <Button type="primary" onClick={() => {
                    setPageProps({
                        keyWord: 'interrupt',
                        subject: '',
                        department: '',
                        professor: '',
                        school:''
                        

                    })
                    setCurrPage('RewardOutlinePage');
                }}>
                    RewardOutlinePage
                </Button>
                <Button type="primary" onClick={() => {
                    setPageProps({
                        keyWord: 'array',
                        subject: '',
                        department: '',
                        

                    })
                    setCurrPage('QnAOutlinePage');
                }}>
                    QnAOutlinePage
                </Button>
                <Button type="primary" onClick={() => {
                    setPageProps({
                        postId: '62b076e50997e642d140206c',
                    })
                    setCurrPage('QnADetailPage');
                }}>
                    QnADetailPage
                </Button>
                <Button type="primary" onClick={() => {
                    setPageProps({
                        postId: '62b076e50997e642d140206c',
                        type: 'QA',
                        action: 'edit'
                    })
                    setCurrPage('QnAEditPage');
                }}>
                    QnAEditPage
                </Button>
                <Button type="primary" onClick={() => {
                    setPageProps({
                        type: 'QA',
                        action: 'new'
                    })
                    setCurrPage('QnANewPage');
                }}>
                    QnANewPage
                </Button>

                <Button type="primary" onClick={() => {
                    setPageProps({
                        postId: '62b07f9c0997e642d14020c6',
                    })
                    setCurrPage('CollabDetailPage');
                }}>
                    CollabDetailPage
                </Button>
                <Button type="primary" onClick={() => {
                    setPageProps({
                        postId: '62b07f9c0997e642d14020c6',
                        type: 'collaboration',
                        action: 'edit'
                    })
                    setCurrPage('CollabEditPage');
                }}>
                    CollabEditPage
                </Button>
                <Button type="primary" onClick={() => {
                    setPageProps({
                        type: 'collaboration',
                        action: 'new'
                    })
                    setCurrPage('CollabNewPage');
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
                        

                    })
                    setCurrPage('CollabOutlinePage');
                }}>
                    CollabOutlinePage
                </Button>
                <Button type="primary" onClick={() => {
                    setCurrPage('PersonalPage');
                }}>
                    PersonalPage
                </Button>
                <Button type="primary" onClick={() => {
                    setPageProps({
                        email:'a147896325811%40gmail.com',
                    });
                    
                    setCurrPage('ProfilePage');
                }}>
                    ProfilePage
                </Button>

                <Button type="primary" onClick={() => {
                    setCurrPage('LoginPage');
                }}>
                    LoginPage
                </Button>
                <Button type="primary" onClick={() => {
                    setCurrPage('SignUpPage');
                }}>
                    SignUpPage
                </Button>
                <Button type="primary" onClick={() =>{
                    setPageProps({
                        email: 'testemail@email.ntou.edu.tw'
                    })
                    setCurrPage('VerificationPage');
                }}>
                    VerificationPage
                </Button>
            </Drawer>
        </>
    )
}

export default OuterPage