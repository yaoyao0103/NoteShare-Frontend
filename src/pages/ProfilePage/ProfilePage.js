import React, { useState, useEffect, useTransition } from 'react';
import { Layout, Avatar, Modal, message, Row, Col, Divider, Spin, Tooltip } from "antd";
import { EditFilled, UserAddOutlined, LoadingOutlined, BellOutlined, BellFilled, UserDeleteOutlined } from '@ant-design/icons';
import './ProfilePage.css'
import TextEditor from '../../components/TextEditor/TextEditor';
import StrengthEditor from '../../components/StrengthEditor/StrengthEditor';
import Text from '../../components/Text/Text';
import FansNFollower from '../../components/FansNFollower/FansNFollower';
import ToggleSwitch from '../../components/ToggleSwitch/ToggleSwitch';
import FansNFollowerEditor from '../../components/FansNFollowerEditor/FansNFollowerEditor';
import IntroductionEditor from '../../components/IntroductionEditor/IntroductionEditor';
import FolderCard from '../../components/FolderCard/FolderCard';
import Cookie from '../../components/Cookies/Cookies';
import { Base64 } from 'js-base64';
import axios from "axios";
const { Header, Sider, Content, Footer } = Layout;
const cookieParser = new Cookie(document.cookie)
function ProfilePage(props) {
    const page = 'ProfilePage';
    const [user, setUser] = useState({});
    const [getUserSuccess, setGetUserSuccess] = useState(false);

    const [avatarSelector, setAvatarSelector] = useState(false);
    const [avatar, setAvatar] = useState();
    const [avatarNum, setAvatarNum] = useState(0);
    const [strength, setStrength] = useState([]);
    const [profile, setProfile] = useState('');
    const [isFollow, setIsFollow] = useState(false);
    const [isBell, setIsBell] = useState(false);
    const [fansNum, setFansNum] = useState(0);
    const [followingNum, setFollowingNum] = useState(0);

    const [fansOrFollower, setFansOrFollower] = useState(false);
    const [fansList, setFansList] = useState([]);
    const [followingList, setFollowingList] = useState([]);
    const [folderList, setFolderList] = useState([]);
    const [noteList, setNoteList] = useState([]);
    const [avatarCurrent, setAvatarCurrent] = useState(0);

    const [getFolderByIdSuccess, setGetFolderByIdSuccess] = useState(false);
    const [isRoot, setIsRoot] = useState(false);
    const [currentFolderId, setCurrentFolderId] = useState('');
    const [email, setEmail] = useState('');
    const [isAuthor, setIsAuthor] = useState(false);

    const Avatars = ["https://joeschmoe.io/api/v1/james", "https://joeschmoe.io/api/v1/jude", "https://joeschmoe.io/api/v1/jana",
        "https://joeschmoe.io/api/v1/jabala", "https://joeschmoe.io/api/v1/jacques", "https://joeschmoe.io/api/v1/jed", "https://joeschmoe.io/api/v1/jon",
        "https://joeschmoe.io/api/v1/jane", "https://joeschmoe.io/api/v1/julie", "https://joeschmoe.io/api/v1/jess", "https://joeschmoe.io/api/v1/jordan",
        "https://joeschmoe.io/api/v1/jake", "https://joeschmoe.io/api/v1/jocelyn", "https://joeschmoe.io/api/v1/josh", "https://joeschmoe.io/api/v1/jazebelle",
        "https://joeschmoe.io/api/v1/josephine", "https://joeschmoe.io/api/v1/jeri", "https://joeschmoe.io/api/v1/jolee", "https://joeschmoe.io/api/v1/jenni",
        "https://joeschmoe.io/api/v1/jia", "https://joeschmoe.io/api/v1/jaqueline", "https://joeschmoe.io/api/v1/joe", "https://joeschmoe.io/api/v1/jean",
        "https://joeschmoe.io/api/v1/jerry", "https://joeschmoe.io/api/v1/jai", "https://joeschmoe.io/api/v1/jack", "https://joeschmoe.io/api/v1/jeane",
        "https://joeschmoe.io/api/v1/jodi"
    ];

    function changeFansSwitch() {
        if (fansOrFollower) {
            props.setLoading(true)
            setGetFolderByIdSuccess(false);
            setFansOrFollower(false);
            //console.log(isAuthor);
            if (!isAuthor)
                getAllFolder(props.email);
            else {
                props.setLoading(true)
                getFans()
                setGetFolderByIdSuccess(true);
            }
        }
        else {
            props.setLoading(true)
            setGetFolderByIdSuccess(false);
            setFansOrFollower(true);
            //console.log(isAuthor);
            if (!isAuthor)
                getAllNote(props.email);
            else {
                props.setLoading(true)
                getFollowing()
                setGetFolderByIdSuccess(true);
            }
        };
    }

    const AvatarsList = [];

    for (let i = 0; i <= Avatars.length - 1; i++) {
        let temp = -1;
        if (avatar === i)
            temp = 'Profile__AvatarSelector__Avatar__Active';
        else {
            temp = 'Profile__AvatarSelector__Avatar';
        }
        AvatarsList.push(<Avatar className={temp} size={84} src={Avatars[i]} onClick={() => { setAvatar(i); }}></Avatar>)
    };

    const getFans = () => {
        axios.get("http://localhost:8080/followers/" + email, {
            headers: {
                'Authorization': 'Bearer ' + cookieParser.getCookieByName("token"),
            }
        }).then(res => {
            let tempFansList = [];
            for (let i = 0; i < res.data.followers.length; i++) {


                tempFansList.push(<FansNFollowerEditor setPageProps={props.setPageProps} setFansNum={setFansNum} fansNum={res.data.followers.length} email={email} targetEmail={res.data.followers[i].userObjEmail} Name={res.data.followers[i].userObjName} Avatar={res.data.followers[i].userObjAvatar} isSwitch={true} />)
            }
            setFansList(oldArray => [...oldArray.slice(0, 0), tempFansList]);
            props.setLoading(false)

        }).catch((error) => {
            if (error.response.status === 500 || error.response.status === 404||error.response.status === 403){
                if(error.response.data.message.slice(0,13)==='Malformed JWT')
                document.cookie = 'error=Jwt'
                else
                document.cookie = 'error=true'
                message.error('Server Error! Please refresh again! (Get Fans Error)')
            }
            else{
                message.error("Server Error! Please try again later. (Get Fans Error)")  
            }
        })
    }

    const getFollowing = () => {
        axios.get("http://localhost:8080/following/" + email, {
            headers: {
                'Authorization': 'Bearer ' + cookieParser.getCookieByName("token"),
            }
        }).then(res => {
            let tempFollowingList = [];
            for (let i = 0; i < res.data.following.length; i++) {

                tempFollowingList.push(<FansNFollowerEditor setPageProps={props.setPageProps} setFollowingNum={setFollowingNum} followingNum={res.data.following.length} email={email} targetEmail={res.data.following[i].userObjEmail} Name={res.data.following[i].userObjName} Avatar={res.data.following[i].userObjAvatar} isSwitch={false} />)
            }

            setFollowingList(oldArray => [...oldArray.slice(0, 0), tempFollowingList]);
            props.setLoading(false)
        }).catch((error) => {
            if (error.response.status === 500 || error.response.status === 404||error.response.status === 403){
                if(error.response.data.message.slice(0,13)==='Malformed JWT')
                document.cookie = 'error=Jwt'
                else
                document.cookie = 'error=true'
                message.error('Server Error! Please refresh again! (Get Following Error)')
            }
            else{
                message.error("Server Error! Please try again later. (Get Following Error)")
            }
        })
    }

    const SaveAvatar = () => {
        if (avatar) {
            axios.put("http://localhost:8080/user/head/" + email, { headshotPhoto: Avatars[avatar] }, {
                headers: {
                    'Authorization': 'Bearer ' + cookieParser.getCookieByName("token"),
                }
            }).then(res => {
                setAvatarCurrent(Avatars[avatar]);
                //message.success('You changed your avatar!');
                //console.log(avatarNum+1);
                setAvatarNum(avatarNum + 1);
                props.setAvatar(avatarNum + 1);

            }).catch((error) => {
                if (error.response.status === 500 || error.response.status === 404||error.response.status === 403){
                    if(error.response.data.message.slice(0,13)==='Malformed JWT')
                    document.cookie = 'error=Jwt'
                    else
                    document.cookie = 'error=true'
                    message.error('Server Error! Please refresh again! (Change Avatar Error)')
                }
                else{
                    message.error("Server Error! Please try again later. (Change Avatar Error)")
                }
            })
        }
        else {
            message.warn("Please select your avatar!")
        }
    }

    const Follow = () => {

        let name = cookieParser.getCookieByName('name');
        let avatar = cookieParser.getCookieByName('avatar');
        if (!isFollow) {
            axios.put("http://localhost:8080/follow/" + email + '/' + props.email, {}, {
                headers: {
                    'Authorization': 'Bearer ' + cookieParser.getCookieByName("token"),
                }
            }).then(res => {
                //props.sendPrivateMessage(email+'has following you','Follow',)
                //setProfile(content);
                setIsFollow(true);
                setFansNum(fansNum + 1);
                props.sendPrivateMessage(
                    name + ' has followed you !',
                    'ProfilePage',
                    email,
                    name,
                    avatar,
                    '',
                    props.email
                )
                //message.success('You followed ' + user.name + " !");
            }).catch((error) => {
                if (error.response.status === 500 || error.response.status === 404||error.response.status === 403){
                    if(error.response.data.message.slice(0,13)==='Malformed JWT')
                    document.cookie = 'error=Jwt'
                    else
                    document.cookie = 'error=true'
                    message.error('Server Error! Please refresh again! (Follow User Error)')
                }
                else{
                    message.error("Server Error! Please try again later. (Follow User Error)")
                }

            })

        }
        else {
            axios.put("http://localhost:8080/unfollow/" + email + '/' + props.email, {}, {
                headers: {
                    'Authorization': 'Bearer ' + cookieParser.getCookieByName("token"),
                }
            }).then(res => {
                //setProfile(content);
                setIsFollow(false);
                setFansNum(fansNum - 1);
                //message.success('You unfollowed ' + user.name + " !");
            }).catch((error) => {
                if (error.response.status === 500 || error.response.status === 404||error.response.status === 403){
                    if(error.response.data.message.slice(0,13)==='Malformed JWT')
                    document.cookie = 'error=Jwt'
                    else
                    document.cookie = 'error=true'
                    message.error('Server Error! Please refresh again! (Unfollow User Error)')
                }
                else{
                    message.error("Server Error! Please try again later. (Unfollow User Error)")
                }
            })
        }
    }

    const changeBell = () => {
        if (isBell) {
            axios.put('http://localhost:8080/cancelBell/' + email + '/' + props.email, {}, {
                headers: {
                    'Authorization': 'Bearer ' + cookieParser.getCookieByName("token"),
                }
            }).then(res => {
                //setProfile(content);
                setIsBell(false);
                message.success('You turned off the bell of ' + user.name + " !");
            }).catch((error) => {
                if (error.response.status === 500 || error.response.status === 404||error.response.status === 403){
                    if(error.response.data.message.slice(0,13)==='Malformed JWT')
                    document.cookie = 'error=Jwt'
                    else
                    document.cookie = 'error=true'
                    message.error('Server Error! Please refresh again! (Turn Off The Bell Error)')
                }
                else{
                    message.error("Server Error! Please try again later. (Turn Off The Bell Error)")
                }
            })
        }
        else {
            axios.put("http://localhost:8080/bell/" + email + '/' + props.email, {}, {
                headers: {
                    'Authorization': 'Bearer ' + cookieParser.getCookieByName("token"),
                }
            }).then(res => {
                //setProfile(content);
                setIsBell(true);
                message.success('You turned on the bell of ' + user.name + " !");
            }).catch((error) => {
                if (error.response.status === 500 || error.response.status === 404||error.response.status === 403){
                    if(error.response.data.message.slice(0,13)==='Malformed JWT')
                    document.cookie = 'error=Jwt'
                    else
                    document.cookie = 'error=true'
                    message.error('Server Error! Please refresh again! (Turn On The Bell Error)')
                }
                else{
                    message.error("Server Error! Please try again later. (Turn On The Bell Error)")
                }
            })

        }
    }

    const SaveProfile = (content) => {
        axios.put("http://localhost:8080/user/profile/" + email, { profile: content }, {
            headers: {
                'Authorization': 'Bearer ' + cookieParser.getCookieByName("token"),
            }
        }).then(res => {
            setProfile(content);
            message.success("You updated your profile!")
        }).catch((error) => {
            if (error.response.status === 500 || error.response.status === 404||error.response.status === 403){
                if(error.response.data.message.slice(0,13)==='Malformed JWT')
                document.cookie = 'error=Jwt'
                else
                document.cookie = 'error=true'
                message.error('Server Error! Please refresh again! (Update Profile Error)')
            }
            else{
                message.error("Server Error! Please try again later. (Update Profile Error)")
            }
        })
    };

    const AddStrength = (tag) => {
        //console.log(tag);
        const tags = [...strength, tag];
        axios.put("http://localhost:8080/user/strength/" + email, { strength: tags }, {
            headers: {
                'Authorization': 'Bearer ' + cookieParser.getCookieByName("token"),
            }
        }).then(res => {
            //console.log(...strength, tag);
            setStrength(oldArray => [...oldArray, tag]);
            //message.success("You added a strength!")
        }).catch((error) => {
            if (error.response.status === 500 || error.response.status === 404||error.response.status === 403){
                if(error.response.data.message.slice(0,13)==='Malformed JWT')
                document.cookie = 'error=Jwt'
                else
                document.cookie = 'error=true'
                message.error('Server Error! Please refresh again! (Add Strength Error)')
            }
            else{
                message.error("Server Error! Please try again later. (Add Strength Error)")
            }
        })
    }
    const DeleteStrength = (key) => {
        const tags = [...strength.slice(0, key), ...strength.slice(key + 1, strength.length)]
        axios.put("http://localhost:8080/user/strength/" + email, { strength: tags }, {
            headers: {
                'Authorization': 'Bearer ' + cookieParser.getCookieByName("token"),
            }
        }).then(res => {
            setStrength(oldArray => [...oldArray.slice(0, key), ...oldArray.slice(key + 1, strength.oldArray)]);
            //message.success("You deleted a strength!")
        }).catch((error) => {
            if (error.response.status === 500 || error.response.status === 404||error.response.status === 403){
                if(error.response.data.message.slice(0,13)==='Malformed JWT')
                document.cookie = 'error=Jwt'
                else
                document.cookie = 'error=true'
                message.error('Server Error! Please refresh again! (Delete Strength Error)')
            }
            else{
                message.error("Server Error! Please try again later. (Delete Strength Error)")
            }
        })
    }

    const ClickBack = (id) => {
        props.setLoading(true)
        axios.get("http://localhost:8080/folder/" + id, {
            headers: {
                'Authorization': 'Bearer ' + cookieParser.getCookieByName("token"),
            }
        }).then(res => {
            setCurrentFolderId(res.data.res.parent);

        }).catch((error) => {
            if (error.response.status === 500 || error.response.status === 404||error.response.status === 403){
                if(error.response.data.message.slice(0,13)==='Malformed JWT')
                document.cookie = 'error=Jwt'
                else
                document.cookie = 'error=true'
                message.error('Server Error! Please refresh again! (Back To The Last Layer Error)')
            }
            else{
                message.error("Server Error! Please try again later. (Back To The Last Layer Error)")
            }
        })
    };



    const antIcon = (
        <LoadingOutlined
            style={{
                fontSize: 24,
            }}
            spin
        />
    );
    const getFolderById = (id) => {
        axios.get("http://localhost:8080/folder/" + id, {
            headers: {
                'Authorization': 'Bearer ' + cookieParser.getCookieByName("token"),
            }
        }).then(res => {
            const list = res.data.res.children.concat(res.data.res.notes);
            //console.log(list);
            setFolderList(oldArray => [...oldArray.slice(0, 0), list]);
            if (res.data.res.parent === null)
                setIsRoot(true);
            else
                setIsRoot(false);
            setGetFolderByIdSuccess(true);
            props.setLoading(false);

        }).catch((error) => {
            if (error.response.status === 500 || error.response.status === 404||error.response.status === 403){
                if(error.response.data.message.slice(0,13)==='Malformed JWT')
                document.cookie = 'error=Jwt'
                else
                document.cookie = 'error=true'
                message.error('Server Error! Please refresh again! (Get Folder Error)')
            }
            else{
                message.error("Server Error! Please try again later. (Get Folder Error)")
            }
        })
    };

    function getAllFolder(Email) {
        axios.get("http://localhost:8080/folder/root/" + Email, {
            headers: {
                'Authorization': 'Bearer ' + cookieParser.getCookieByName("token"),
            }
        }).then(res => {
            //console.log(res.data.res[2]);
            getFolderById(res.data.res[2].id);
            setIsRoot(true);
        }).catch((error) => {
            if (error.response.status === 500 || error.response.status === 404||error.response.status === 403){
                if(error.response.data.message.slice(0,13)==='Malformed JWT')
                document.cookie = 'error=Jwt'
                else
                document.cookie = 'error=true'
                message.error('Server Error! Please refresh again! (Get All Folders Error)')
            }
            else{
                message.error("Server Error! Please try again later. (Get All Folders Error)")
            }
        });
    };

    function getAllNote(Email) {
        //console.log('123')
        axios.get("http://localhost:8080/note/all/" + Email, {
            headers: {
                'Authorization': 'Bearer ' + cookieParser.getCookieByName("token"),
            }
        }).then(res => {
            setNoteList(oldArray => [...oldArray.slice(0, 0), res.data.res]);
            setCurrentFolderId('');
            setGetFolderByIdSuccess(true);
            props.setLoading(false)
        }).catch((error) => {
            //setGetFolderFail(true);
            if (error.response.status === 500 || error.response.status === 404||error.response.status === 403){
                if(error.response.data.message.slice(0,13)==='Malformed JWT')
                document.cookie = 'error=Jwt'
                else
                document.cookie = 'error=true'
                message.error('Server Error! Please refresh again! (Get All Notes Error)')
            }
            else{
                message.error("Server Error! Please try again later. (Get All Notes Error)")
            }
        });
    };

    function getUserByEmail(Email) {

        axios.get("http://localhost:8080/user/" + props.email, {
            headers: {
                'Authorization': 'Bearer ' + cookieParser.getCookieByName("token"),
            }
        }).then(res => {
            setUser(res.data.res);
            setAvatarCurrent(res.data.res.headshotPhoto);
            // console.log(res.data.res.name);
            setProfile(res.data.res.profile);
            setStrength(res.data.res.strength);
            //console.log(res.data.res.subscribe);
            setFansNum(res.data.res.fansUserObj.length);
            setFollowingNum(res.data.res.subscribeUserObj.length);
            var tempFansList = [];
            var tempFollowingList = [];
            for (let i = 0; i < res.data.res.belledByUserObj.length; i++) {

                if (res.data.res.belledByUserObj[i].userObjEmail === Email) {
                    setIsBell(true);
                }



            }

            for (let i = 0; i < res.data.res.fansUserObj.length; i++) {

                if (res.data.res.fansUserObj[i].userObjEmail === Email)
                    setIsFollow(true);

                tempFansList.push(<FansNFollowerEditor setPageProps={props.setPageProps} setFansNum={setFansNum} fansNum={res.data.res.fansUserObj.length} email={Email} targetEmail={res.data.res.fansUserObj[i].userObjEmail} Name={res.data.res.fansUserObj[i].userObjName} Avatar={res.data.res.fansUserObj[i].userObjAvatar} isSwitch={true} />)
            }

            for (let i = 0; i < res.data.res.subscribeUserObj.length; i++) {

                tempFollowingList.push(<FansNFollowerEditor setPageProps={props.setPageProps} setFollowingNum={setFollowingNum} followingNum={res.data.res.subscribeUserObj.length} email={Email} targetEmail={res.data.res.subscribeUserObj[i].userObjEmail} Name={res.data.res.subscribeUserObj[i].userObjName} Avatar={res.data.res.subscribeUserObj[i].userObjAvatar} isSwitch={false} />)
            }


            setFansList(oldArray => [...oldArray.slice(0, 0), tempFansList]);
            setFollowingList(oldArray => [...oldArray.slice(0, 0), tempFollowingList]);

            setGetUserSuccess(true);

            let tempEmail = cookieParser.getCookieByName('email')
            if (tempEmail)
                tempEmail = Base64.decode(tempEmail);
            if (tempEmail === props.email)
                props.setLoading(false);

        }).catch((error) => {
            if (error.response.status === 500 || error.response.status === 404||error.response.status === 403){
                if(error.response.data.message.slice(0,13)==='Malformed JWT')
                document.cookie = 'error=Jwt'
                else
                document.cookie = 'error=true'
                message.error('Server Error! Please refresh again! (Get User Error)')
            }
            else{
                message.error("Server Error! Please try again later. (Get User Error)")
            }
        });
    };

    useEffect(() => {
        props.setLoading(true)
        setGetFolderByIdSuccess(false);
        setIsAuthor(false);
        setFansOrFollower(false);
        setIsFollow(false);
        setFolderList(oldArray => [...oldArray.slice(0, 0)]);
        setGetUserSuccess(false);

        let tempEmail = cookieParser.getCookieByName('email')
        if (tempEmail)
            tempEmail = Base64.decode(tempEmail);
        //console.log(tempEmail);
        //console.log(props.email);

        if (tempEmail === props.email) {
            getUserByEmail(tempEmail);
            setEmail(tempEmail);
            //console.log('isAuthor')
            setIsAuthor(true);
            setGetFolderByIdSuccess(true);

        }
        else {
            //console.log('111')
            getUserByEmail(tempEmail);
            setEmail(tempEmail);
            setIsAuthor(false);
            if (!fansOrFollower)
                getAllFolder(props.email);
            else if (fansOrFollower)
                getAllNote(props.email);


        }



    }, [props]);
    /* useEffect(() => {
         console.log(isAuthor);
         if (fansOrFollower && !isAuthor)
             getAllFolder(props.email);
         else if (!fansOrFollower && !isAuthor)
             getAllNote(props.email);
         if (isAuthor) {
             props.setLoading(false)
             setGetFolderByIdSuccess(true);
         }
 
     }, [fansOrFollower && isAuthor]);*/

    useEffect(() => {
        if (currentFolderId !== '')
            getFolderById(currentFolderId);

    }, [currentFolderId]);

    return (
        <>
            {getUserSuccess &&

                <Layout className='Profile__Layout__Inner'>
                    <Content className='Profile__Content'>
                        <Row className='Profile__Content__First__Row'>
                            <Col span={6}>
                                <div className={"Profile__Avatar__Outer"}>
                                    <Avatar className={"Profile__Avatar__Inner"} size={84} src={avatarCurrent}></Avatar>
                                    {isAuthor && <div className={"Profile__Avatar__Editor"} onClick={() => { setAvatarSelector(true) }}>
                                        <EditFilled />

                                    </div>
                                    }
                                </div>
                            </Col>
                            <Col className='Profile__NameNEmail' span={18}>
                                <div className='Profile__TextEditor'>
                                    <TextEditor name={user.name}></TextEditor>
                                </div>
                                <div className='Profile__Email'>
                                    <Text className='TextEditor__Name' cls='Gerneral' fontSize='20' content={'Email : ' + props.email} />
                                </div>
                                {!isAuthor &&
                                    <Row className='Profile__FollowNBell'>
                                        {!isFollow &&
                                            <Col className='Profile__Follow' span={6} onClick={() => { Follow() }}>
                                                <Tooltip arrowPointAtCenter={true} placement="top" title={"Follow " + user.name} color={'#000'}>
                                                    <UserAddOutlined className='Profile__Follow__Icon' style={{ fontSize: '20px' }} />
                                                    <Text cls='Small' fontSize={'14'} content='追蹤'></Text>
                                                </Tooltip>
                                            </Col>
                                        }
                                        {isFollow &&
                                            <Col className='Profile__Follow' span={6} onClick={() => { Follow() }}>
                                                <Tooltip arrowPointAtCenter={true} placement="top" title={"Follow " + user.name} color={'#000'}>
                                                    <UserDeleteOutlined className='Profile__Follow__Icon' style={{ fontSize: '20px' }} />
                                                    <Text cls='Small' fontSize={'14'} content='取消'></Text>
                                                </Tooltip>
                                            </Col>
                                        }
                                        <Col className='Profile__Bell' span={8}>
                                            {!isBell && <Tooltip arrowPointAtCenter={true} placement="top" title={"Turn on the notification of " + user.name} color={'#000'}>
                                                <BellOutlined className='Profile__Bell__Icon' style={{ fontSize: '22px' }} onClick={() => { changeBell() }} />
                                            </Tooltip>}
                                            {isBell && <Tooltip arrowPointAtCenter={true} placement="top" title={"Turn off the notification of " + user.name} color={'#000'}>
                                                <BellFilled className='Profile__Bell__Icon' style={{ fontSize: '22px' }} onClick={() => { changeBell() }} />
                                            </Tooltip>}

                                        </Col>
                                    </Row>
                                }
                            </Col>
                        </Row>
                        <div className="Profile__Fans">
                            <FansNFollower fans={fansNum} following={followingNum}></FansNFollower>
                        </div>
                        <div className='Profile__Strength'>
                            <StrengthEditor strength={strength} delete={(key) => { DeleteStrength(key) }} add={(tag) => (AddStrength(tag))} isAuthor={isAuthor}></StrengthEditor>
                        </div>
                        <div className='Profile__Introduction'>
                            <IntroductionEditor edit={(content) => { SaveProfile(content) }} content={profile} isAuthor={isAuthor}></IntroductionEditor>
                        </div>
                    </Content>

                    <Sider className='Profile__Sider' width='60%'>
                        {/* <Spin className='signUpPage__Spin' indicator={antIcon} spinning={!getFolderByIdSuccess}> */}
                        {isAuthor && <Row className='Profile__Sider__Fir__Row'>
                            <ToggleSwitch isSwitch={fansOrFollower} SwitchLeft='Following' SwitchRight="Fans" ChangeSwitch={() => changeFansSwitch()} />
                        </Row>}
                        {!isAuthor && <Row className='Profile__Sider__Fir__Row'>
                            <ToggleSwitch isSwitch={fansOrFollower} SwitchLeft='Note' SwitchRight="Folder" ChangeSwitch={() => changeFansSwitch()} />
                        </Row>}
                        <Divider />
                        {isAuthor && !fansOrFollower && <div className='Profile_Sider__Main_Content'>
                            {fansList}

                        </div>}
                        {isAuthor && fansOrFollower && <div className='Profile_Sider__Main_Content'>
                            {followingList}
                        </div>}
                        {!isAuthor && getFolderByIdSuccess && !fansOrFollower && <div className='Profile_Sider__Main_Content'>
                            <FolderCard setLoading={props.setLoading} folderList={folderList} isFolder={true} setPageProps={props.setPageProps} isRoot={isRoot} clickBack={(id) => { ClickBack(id) }} clickFolder={(id) => { setCurrentFolderId(id); }} />

                        </div>}

                        {!isAuthor && fansOrFollower && getFolderByIdSuccess && <div className='Profile_Sider__Main_Content'>
                            <FolderCard setLoading={props.setLoading} folderList={noteList} isFolder={true} setPageProps={props.setPageProps} isRoot={isRoot} clickBack={(id) => { ClickBack(id) }} clickFolder={(id) => { setCurrentFolderId(id); }} />

                        </div>}
                        {/* </Spin> */}
                    </Sider>

                    <Modal
                        title="Choose your avatar"
                        centered
                        visible={avatarSelector}
                        onOk={() => { SaveAvatar(); props.setAvatar(props.Avatar + 1); setAvatarSelector(false) }}
                        onCancel={() => setAvatarSelector(false)}
                        okText="Save"
                        cancelText="Cancel"
                        width={590}
                    >
                        {AvatarsList}

                    </Modal>
                </Layout >
            }
        </>
    );


}

export default ProfilePage;