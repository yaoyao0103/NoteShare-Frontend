import React, { useState, useEffect, useTransition } from 'react';
import { Layout, Avatar, Modal, message, Row, Col, Divider, Spin, Tooltip } from "antd";
import { EditFilled, UserAddOutlined, LoadingOutlined, BellOutlined, BellFilled, UserDeleteOutlined, QuestionCircleOutlined } from '@ant-design/icons';
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
import axios from '../../components/axios/axios';
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

    const Avatars = ["https://gravatar.com/avatar/7fdc37318319569a920fd7d087c14d1f?s=400&d=robohash&r=x", "https://gravatar.com/avatar/7fdc37318319569a920fd7d087c14d1f?s=400&d=robohash&r=x", "https://gravatar.com/avatar/7fdc37318319569a920fd7d087c14d1f?s=400&d=robohash&r=x",
    "https://gravatar.com/avatar/7fdc37318319569a920fd7d087c14d1f?s=400&d=robohash&r=x", "https://gravatar.com/avatar/7fdc37318319569a920fd7d087c14d1f?s=400&d=robohash&r=x", "https://gravatar.com/avatar/7fdc37318319569a920fd7d087c14d1f?s=400&d=robohash&r=x", "https://gravatar.com/avatar/7fdc37318319569a920fd7d087c14d1f?s=400&d=robohash&r=x",
    "https://gravatar.com/avatar/7fdc37318319569a920fd7d087c14d1f?s=400&d=robohash&r=x", "https://gravatar.com/avatar/7fdc37318319569a920fd7d087c14d1f?s=400&d=robohash&r=x", "https://gravatar.com/avatar/7fdc37318319569a920fd7d087c14d1f?s=400&d=robohash&r=x", "https://gravatar.com/avatar/7fdc37318319569a920fd7d087c14d1f?s=400&d=robohash&r=x",
    "https://gravatar.com/avatar/7fdc37318319569a920fd7d087c14d1f?s=400&d=robohash&r=x", "https://gravatar.com/avatar/7fdc37318319569a920fd7d087c14d1f?s=400&d=robohash&r=x", "https://gravatar.com/avatar/7fdc37318319569a920fd7d087c14d1f?s=400&d=robohash&r=x", "https://gravatar.com/avatar/7fdc37318319569a920fd7d087c14d1f?s=400&d=robohash&r=x",
    "https://gravatar.com/avatar/7fdc37318319569a920fd7d087c14d1f?s=400&d=robohash&r=x", "https://gravatar.com/avatar/7fdc37318319569a920fd7d087c14d1f?s=400&d=robohash&r=x", "https://gravatar.com/avatar/7fdc37318319569a920fd7d087c14d1f?s=400&d=robohash&r=x", "https://gravatar.com/avatar/7fdc37318319569a920fd7d087c14d1f?s=400&d=robohash&r=x",
    "https://gravatar.com/avatar/7fdc37318319569a920fd7d087c14d1f?s=400&d=robohash&r=x", "https://gravatar.com/avatar/7fdc37318319569a920fd7d087c14d1f?s=400&d=robohash&r=x", "https://gravatar.com/avatar/7fdc37318319569a920fd7d087c14d1f?s=400&d=robohash&r=x", "https://gravatar.com/avatar/7fdc37318319569a920fd7d087c14d1f?s=400&d=robohash&r=x",
    "https://gravatar.com/avatar/7fdc37318319569a920fd7d087c14d1f?s=400&d=robohash&r=x", "https://gravatar.com/avatar/7fdc37318319569a920fd7d087c14d1f?s=400&d=robohash&r=x","https://gravatar.com/avatar/7fdc37318319569a920fd7d087c14d1f?s=400&d=robohash&r=x", "https://gravatar.com/avatar/7fdc37318319569a920fd7d087c14d1f?s=400&d=robohash&r=x",
        "https://gravatar.com/avatar/7fdc37318319569a920fd7d087c14d1f?s=400&d=robohash&r=x"
    ];

    function changeFansSwitch() {
        if (fansOrFollower) {
            props.setLoading(true)
            setGetFolderByIdSuccess(false);
            setFansOrFollower(false);
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
        AvatarsList.push(<Avatar className={temp} size={84} src={"https://gravatar.com/avatar/7fdc37318319569a920fd7d087c14d1f?s=400&d=robohash&r=x"} onClick={() => { setAvatar(i); }}></Avatar>)
    };

    const getFans = () => {
        axios.get("/followers/" + email, {
            headers: {
                'Authorization': 'Bearer ' + cookieParser.getCookieByName("token"),
            }
        }).then(res => {
            let tempFansList = [];
            for (let i = 0; i < res.data.followers.length; i++) {


                tempFansList.push(<FansNFollowerEditor setLoggedIn={props.setLoggedIn} setPageProps={props.setPageProps} setFansNum={setFansNum} fansNum={res.data.followers.length} email={email} targetEmail={res.data.followers[i].userObjEmail} Name={res.data.followers[i].userObjName} Avatar={"https://gravatar.com/avatar/7fdc37318319569a920fd7d087c14d1f?s=400&d=robohash&r=x"} isSwitch={true} />)
            }
            setFansList(oldArray => [...oldArray.slice(0, 0), tempFansList]);
            props.setLoading(false)

        }).catch((error) => {
            if (error.response.status === 500 || error.response.status === 404 || error.response.status === 403) {
                if (error.response.data.message.slice(0, 13) === 'Malformed JWT') {
                    document.cookie = 'error=Jwt'
                    message.destroy()
                    message.warning('The connection timed out, please login again !')
                    document.cookie = 'email=;'
                    props.setLoggedIn(false)
                    props.setPageProps({ page: 'LoginPage' })
                }
                else
                    document.cookie = 'error=true'
                message.error('Server Error! Please refresh again! (Get Fans Error)')
            }
            else {
                message.error("Server Error! Please try again later. (Get Fans Error)")
            }
        })
    }

    const getFollowing = () => {
        axios.get("/following/" + email, {
            headers: {
                'Authorization': 'Bearer ' + cookieParser.getCookieByName("token"),
            }
        }).then(res => {
            let tempFollowingList = [];
            for (let i = 0; i < res.data.following.length; i++) {

                tempFollowingList.push(<FansNFollowerEditor setLoggedIn={props.setLoggedIn} setPageProps={props.setPageProps} setFollowingNum={setFollowingNum} followingNum={res.data.following.length} email={email} targetEmail={res.data.following[i].userObjEmail} Name={res.data.following[i].userObjName} Avatar={"https://gravatar.com/avatar/7fdc37318319569a920fd7d087c14d1f?s=400&d=robohash&r=x"} isSwitch={false} />)
            }

            setFollowingList(oldArray => [...oldArray.slice(0, 0), tempFollowingList]);
            props.setLoading(false)
        }).catch((error) => {
            if (error.response.status === 500 || error.response.status === 404 || error.response.status === 403) {
                if (error.response.data.message.slice(0, 13) === 'Malformed JWT') {
                    document.cookie = 'error=Jwt'
                    message.destroy()
                    message.warning('The connection timed out, please login again !')
                    document.cookie = 'email=;'
                    props.setLoggedIn(false)
                    props.setPageProps({ page: 'LoginPage' })
                }
                else
                    document.cookie = 'error=true'
                message.error('Server Error! Please refresh again! (Get Following Error)')
            }
            else {
                message.error("Server Error! Please try again later. (Get Following Error)")
            }
        })
    }

    const SaveAvatar = () => {
        if (avatar>=0) {
            axios.put("/user/head/" + email, { headshotPhoto: "https://gravatar.com/avatar/7fdc37318319569a920fd7d087c14d1f?s=400&d=robohash&r=x" }, {
                headers: {
                    'Authorization': 'Bearer ' + cookieParser.getCookieByName("token"),
                }
            }).then(res => {
                setAvatarCurrent("https://gravatar.com/avatar/7fdc37318319569a920fd7d087c14d1f?s=400&d=robohash&r=x");
                setAvatarNum(avatarNum + 1);
                props.setAvatar("https://gravatar.com/avatar/7fdc37318319569a920fd7d087c14d1f?s=400&d=robohash&r=x");
                props.setChangeAvatarNum(avatarNum + 1)

            }).catch((error) => {
                if (error.response.status === 500 || error.response.status === 404 || error.response.status === 403) {
                    if (error.response.data.message.slice(0, 13) === 'Malformed JWT') {
                        document.cookie = 'error=Jwt'
                        message.destroy()
                        message.warning('The connection timed out, please login again !')
                        document.cookie = 'email=;'
                        props.setLoggedIn(false)
                        props.setPageProps({ page: 'LoginPage' })
                    }
                    else
                        document.cookie = 'error=true'
                    message.error('Server Error! Please refresh again! (Change Avatar Error)')
                }
                else {
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
        let avatar = "https://gravatar.com/avatar/7fdc37318319569a920fd7d087c14d1f?s=400&d=robohash&r=x";
        if (!isFollow) {
            axios.put("/follow/" + email + '/' + props.email, {}, {
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
                    "https://gravatar.com/avatar/7fdc37318319569a920fd7d087c14d1f?s=400&d=robohash&r=x",
                    '',
                    props.email
                )
                //message.success('You followed ' + user.name + " !");
            }).catch((error) => {
                if (error.response.status === 500 || error.response.status === 404 || error.response.status === 403) {
                    if (error.response.data.message.slice(0, 13) === 'Malformed JWT') {
                        document.cookie = 'error=Jwt'
                        message.destroy()
                        message.warning('The connection timed out, please login again !')
                        document.cookie = 'email=;'
                        props.setLoggedIn(false)
                        props.setPageProps({ page: 'LoginPage' })
                    }
                    else
                        document.cookie = 'error=true'
                    message.error('Server Error! Please refresh again! (Follow User Error)')
                }
                else {
                    message.error("Server Error! Please try again later. (Follow User Error)")
                }

            })

        }
        else {
            axios.put("/unfollow/" + email + '/' + props.email, {}, {
                headers: {
                    'Authorization': 'Bearer ' + cookieParser.getCookieByName("token"),
                }
            }).then(res => {
                //setProfile(content);
                setIsFollow(false);
                setFansNum(fansNum - 1);
                //message.success('You unfollowed ' + user.name + " !");
            }).catch((error) => {
                if (error.response.status === 500 || error.response.status === 404 || error.response.status === 403) {
                    if (error.response.data.message.slice(0, 13) === 'Malformed JWT') {
                        document.cookie = 'error=Jwt'
                        message.destroy()
                        message.warning('The connection timed out, please login again !')
                        document.cookie = 'email=;'
                        props.setLoggedIn(false)
                        props.setPageProps({ page: 'LoginPage' })
                    }
                    else
                        document.cookie = 'error=true'
                    message.error('Server Error! Please refresh again! (Unfollow User Error)')
                }
                else {
                    message.error("Server Error! Please try again later. (Unfollow User Error)")
                }
            })
        }
    }

    const changeBell = () => {
        if (isBell) {
            axios.put('/cancelBell/' + email + '/' + props.email, {}, {
                headers: {
                    'Authorization': 'Bearer ' + cookieParser.getCookieByName("token"),
                }
            }).then(res => {
                //setProfile(content);
                setIsBell(false);
                message.success('You turned off the bell of ' + user.name + " !");
            }).catch((error) => {
                if (error.response.status === 500 || error.response.status === 404 || error.response.status === 403) {
                    if (error.response.data.message.slice(0, 13) === 'Malformed JWT') {
                        document.cookie = 'error=Jwt'
                        message.destroy()
                        message.warning('The connection timed out, please login again !')
                        document.cookie = 'email=;'
                        props.setLoggedIn(false)
                        props.setPageProps({ page: 'LoginPage' })
                    }
                    else
                        document.cookie = 'error=true'
                    message.error('Server Error! Please refresh again! (Turn Off The Bell Error)')
                }
                else {
                    message.error("Server Error! Please try again later. (Turn Off The Bell Error)")
                }
            })
        }
        else {
            axios.put("/bell/" + email + '/' + props.email, {}, {
                headers: {
                    'Authorization': 'Bearer ' + cookieParser.getCookieByName("token"),
                }
            }).then(res => {
                //setProfile(content);
                setIsBell(true);
                message.success('You turned on the bell of ' + user.name + " !");
            }).catch((error) => {
                if (error.response.status === 500 || error.response.status === 404 || error.response.status === 403) {
                    if (error.response.data.message.slice(0, 13) === 'Malformed JWT') {
                        document.cookie = 'error=Jwt'
                        message.destroy()
                        message.warning('The connection timed out, please login again !')
                        document.cookie = 'email=;'
                        props.setLoggedIn(false)
                        props.setPageProps({ page: 'LoginPage' })
                    }
                    else
                        document.cookie = 'error=true'
                    message.error('Server Error! Please refresh again! (Turn On The Bell Error)')
                }
                else {
                    message.error("Server Error! Please try again later. (Turn On The Bell Error)")
                }
            })

        }
    }

    const SaveProfile = (content) => {
        axios.put("/user/profile/" + email, { profile: content }, {
            headers: {
                'Authorization': 'Bearer ' + cookieParser.getCookieByName("token"),
            }
        }).then(res => {
            setProfile(content);
            message.success("You updated your profile!")
        }).catch((error) => {
            if (error.response.status === 500 || error.response.status === 404 || error.response.status === 403) {
                if (error.response.data.message.slice(0, 13) === 'Malformed JWT') {
                    document.cookie = 'error=Jwt'
                    message.destroy()
                    message.warning('The connection timed out, please login again !')
                    document.cookie = 'email=;'
                    props.setLoggedIn(false)
                    props.setPageProps({ page: 'LoginPage' })
                }
                else
                    document.cookie = 'error=true'
                message.error('Server Error! Please refresh again! (Update Profile Error)')
            }
            else {
                message.error("Server Error! Please try again later. (Update Profile Error)")
            }
        })
    };

    const AddStrength = (tag) => {
        const tags = [...strength, tag];
        axios.put("/user/strength/" + email, { strength: tags }, {
            headers: {
                'Authorization': 'Bearer ' + cookieParser.getCookieByName("token"),
            }
        }).then(res => {
            setStrength(oldArray => [...oldArray, tag]);
            //message.success("You added a strength!")
        }).catch((error) => {
            if (error.response.status === 500 || error.response.status === 404 || error.response.status === 403) {
                if (error.response.data.message.slice(0, 13) === 'Malformed JWT') {
                    document.cookie = 'error=Jwt'
                    message.destroy()
                    message.warning('The connection timed out, please login again !')
                    document.cookie = 'email=;'
                    props.setLoggedIn(false)
                    props.setPageProps({ page: 'LoginPage' })
                }
                else
                    document.cookie = 'error=true'
                message.error('Server Error! Please refresh again! (Add Strength Error)')
            }
            else {
                message.error("Server Error! Please try again later. (Add Strength Error)")
            }
        })
    }
    const DeleteStrength = (key) => {
        const tags = [...strength.slice(0, key), ...strength.slice(key + 1, strength.length)]
        axios.put("/user/strength/" + email, { strength: tags }, {
            headers: {
                'Authorization': 'Bearer ' + cookieParser.getCookieByName("token"),
            }
        }).then(res => {
            setStrength(oldArray => [...oldArray.slice(0, key), ...oldArray.slice(key + 1, strength.oldArray)]);
            //message.success("You deleted a strength!")
        }).catch((error) => {
            if (error.response.status === 500 || error.response.status === 404 || error.response.status === 403) {
                if (error.response.data.message.slice(0, 13) === 'Malformed JWT') {
                    document.cookie = 'error=Jwt'
                    message.destroy()
                    message.warning('The connection timed out, please login again !')
                    document.cookie = 'email=;'
                    props.setLoggedIn(false)
                    props.setPageProps({ page: 'LoginPage' })
                }
                else
                    document.cookie = 'error=true'
                message.error('Server Error! Please refresh again! (Delete Strength Error)')
            }
            else {
                message.error("Server Error! Please try again later. (Delete Strength Error)")
            }
        })
    }

    const ClickBack = (id) => {
        props.setLoading(true)
        axios.get("/folder/" + id, {
            headers: {
                'Authorization': 'Bearer ' + cookieParser.getCookieByName("token"),
            }
        }).then(res => {
            setCurrentFolderId(res.data.res.parent);

        }).catch((error) => {
            if (error.response.status === 500 || error.response.status === 404 || error.response.status === 403) {
                if (error.response.data.message.slice(0, 13) === 'Malformed JWT') {
                    document.cookie = 'error=Jwt'
                    message.destroy()
                    message.warning('The connection timed out, please login again !')
                    document.cookie = 'email=;'
                    props.setLoggedIn(false)
                    props.setPageProps({ page: 'LoginPage' })
                }
                else
                    document.cookie = 'error=true'
                message.error('Server Error! Please refresh again! (Back To The Last Layer Error)')
            }
            else {
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
        axios.get("/folder/" + id, {
            headers: {
                'Authorization': 'Bearer ' + cookieParser.getCookieByName("token"),
            }
        }).then(res => {
            const list = res.data.res.children.concat(res.data.res.notes);
            setFolderList(oldArray => [...oldArray.slice(0, 0), list]);
            if (res.data.res.parent === null)
                setIsRoot(true);
            else
                setIsRoot(false);
            setGetFolderByIdSuccess(true);
            props.setLoading(false);

        }).catch((error) => {
            if (error.response.status === 500 || error.response.status === 404 || error.response.status === 403) {
                if (error.response.data.message.slice(0, 13) === 'Malformed JWT') {
                    document.cookie = 'error=Jwt'
                    message.destroy()
                    message.warning('The connection timed out, please login again !')
                    document.cookie = 'email=;'
                    props.setLoggedIn(false)
                    props.setPageProps({ page: 'LoginPage' })
                }
                else
                    document.cookie = 'error=true'
                message.error('Server Error! Please refresh again! (Get Folder Error)')
            }
            else {
                message.error("Server Error! Please try again later. (Get Folder Error)")
            }
        })
    };

    function getAllFolder(Email) {
        axios.get("/folder/root/" + Email, {
            headers: {
                'Authorization': 'Bearer ' + cookieParser.getCookieByName("token"),
            }
        }).then(res => {
            getFolderById(res.data.res[2].id);
            setIsRoot(true);
        }).catch((error) => {
            if (error.response.status === 500 || error.response.status === 404 || error.response.status === 403) {
                if (error.response.data.message.slice(0, 13) === 'Malformed JWT') {
                    document.cookie = 'error=Jwt'
                    message.destroy()
                    message.warning('The connection timed out, please login again !')
                    document.cookie = 'email=;'
                    props.setLoggedIn(false)
                    props.setPageProps({ page: 'LoginPage' })
                }
                else
                    document.cookie = 'error=true'
                message.error('Server Error! Please refresh again! (Get All Folders Error)')
            }
            else {
                message.error("Server Error! Please try again later. (Get All Folders Error)")
            }
        });
    };

    function getAllNote(Email) {
        console.log(Email)
        axios.get("/note/all/" + Email, {
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
            console.log(error)
            if (error.response.status === 500 || error.response.status === 404 || error.response.status === 403) {
                if (error.response.data.message.slice(0, 13) === 'Malformed JWT') {
                    document.cookie = 'error=Jwt'
                    message.destroy()
                    message.warning('The connection timed out, please login again !')
                    document.cookie = 'email=;'
                    props.setLoggedIn(false)
                    props.setPageProps({ page: 'LoginPage' })
                }
                else
                    document.cookie = 'error=true'
                message.error('Server Error! Please refresh again! (Get All Notes Error)')
            }
            else {
                message.error("Server Error! Please try again later. (Get All Notes Error)")
            }
        });
    };

    function getUserByEmail(Email) {

        axios.get("/user/" + props.email, {
            headers: {
                'Authorization': 'Bearer ' + cookieParser.getCookieByName("token"),
            }
        }).then(res => {
            setUser(res.data.res);
            setAvatarCurrent("https://gravatar.com/avatar/7fdc37318319569a920fd7d087c14d1f?s=400&d=robohash&r=x");
            setProfile(res.data.res.profile);
            setStrength(res.data.res.strength);
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

                tempFansList.push(<FansNFollowerEditor setLoggedIn={props.setLoggedIn} setPageProps={props.setPageProps} setFansNum={setFansNum} fansNum={res.data.res.fansUserObj.length} email={Email} targetEmail={res.data.res.fansUserObj[i].userObjEmail} Name={res.data.res.fansUserObj[i].userObjName} Avatar={"https://gravatar.com/avatar/7fdc37318319569a920fd7d087c14d1f?s=400&d=robohash&r=x"} isSwitch={true} />)
            }

            for (let i = 0; i < res.data.res.subscribeUserObj.length; i++) {

                tempFollowingList.push(<FansNFollowerEditor setLoggedIn={props.setLoggedIn} setPageProps={props.setPageProps} setFollowingNum={setFollowingNum} followingNum={res.data.res.subscribeUserObj.length} email={Email} targetEmail={res.data.res.subscribeUserObj[i].userObjEmail} Name={res.data.res.subscribeUserObj[i].userObjName} Avatar={"https://gravatar.com/avatar/7fdc37318319569a920fd7d087c14d1f?s=400&d=robohash&r=x"} isSwitch={false} />)
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
            if (error.response.status === 500 || error.response.status === 404 || error.response.status === 403) {
                if (error.response.data.message.slice(0, 13) === 'Malformed JWT') {
                    document.cookie = 'error=Jwt'
                    message.destroy()
                    message.warning('The connection timed out, please login again !')
                    document.cookie = 'email=;'
                    props.setLoggedIn(false)
                    props.setPageProps({ page: 'LoginPage' })
                }
                else
                    document.cookie = 'error=true'
                message.error('Server Error! Please refresh again! (Get User Error)')
            }
            else {
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

        if (tempEmail === props.email) {
            getUserByEmail(tempEmail);
            setEmail(tempEmail);
            setIsAuthor(true);
            setGetFolderByIdSuccess(true);

        }
        else {
            getUserByEmail(tempEmail);
            setEmail(tempEmail);
            setIsAuthor(false);
            if (!fansOrFollower)
                getAllFolder(props.email);
            else if (fansOrFollower)
                getAllNote(props.email);


        }



    }, [props]);
    useEffect(() => {
        if (currentFolderId !== '')
            getFolderById(currentFolderId);

    }, [currentFolderId]);

    return (
        <>
            {getUserSuccess &&
                <MediaContextProvider >
                    <Media at="xl" className='Profile__Media'>
                        <Layout className='Profile__Layout__Inner'>
                            <Content className='Profile__Content'>
                                <Row className='Profile__Content__First__Row'>
                                <Col span={1}></Col>
                                    <Col span={5}>
                                        <div className={"Profile__Avatar__Outer"}>
                                            <Avatar className={"Profile__Avatar__Inner"} size={84} src={"https://gravatar.com/avatar/7fdc37318319569a920fd7d087c14d1f?s=400&d=robohash&r=x"}></Avatar>
                                            {isAuthor && <div className={"Profile__Avatar__Editor"} onClick={() => { setAvatarSelector(true) }}>
                                                <EditFilled />

                                            </div>
                                            }
                                        </div>
                                    </Col>
                                    <Col className='Profile__NameNEmail' span={18}>
                                        <div className='Profile__TextEditor'>
                                            <Text className='TextEditor__Title' cls='Gerneral' fontSize='22px' content={'Name :'} />

                                            <div className='TextEditor__Name'>
                                                <Text cls='Gerneral' fontSize='22px' content={user.name} />
                                            </div>
                                        </div>
                                        <div className='Profile__Email'>
                                            <Text className='Profile__Email__Text' cls='Gerneral' fontSize='20px' content={'Email : ' + props.email} />
                                        </div>
                                        {!isAuthor &&
                                            <Row className='Profile__FollowNBell'>
                                                {!isFollow &&
                                                    <Col className='Profile__Follow' span={6} onClick={() => { Follow() }}>
                                                        <Tooltip arrowPointAtCenter={true} placement="top" title={"Follow " + user.name} color={'#000'}>
                                                            <UserAddOutlined className='Profile__Follow__Icon' style={{ fontSize: '20px' }} />
                                                            <Text cls='Small' fontSize='14px' content='Follow'></Text>
                                                        </Tooltip>
                                                    </Col>
                                                }
                                                {isFollow &&
                                                    <Col className='Profile__Follow' span={6} onClick={() => { Follow() }}>
                                                        <Tooltip arrowPointAtCenter={true} placement="top" title={"Follow " + user.name} color={'#000'}>
                                                            <UserDeleteOutlined className='Profile__Follow__Icon' style={{ fontSize: '20px' }} />
                                                            <Text cls='Small' fontSize='14px' content='Cancel'></Text>
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
                                onOk={() => { SaveAvatar();  setAvatarSelector(false) }}
                                onCancel={() => setAvatarSelector(false)}
                                okText="Save"
                                cancelText="Cancel"
                                width={590}
                            >
                                {AvatarsList}

                            </Modal>
                        </Layout >
                    </Media>
                    <Media at="lg" className='Profile__Media'>
                        <Layout className='Profile__Layout__Inner'>

                            <Content className='Profile__Content'>
                                <Row className='Profile__Content__First__Row'>
                                    <Col span={6}>
                                        <div className={"Profile__Avatar__Outer"}>
                                            <Avatar className={"Profile__Avatar__Inner"} size={84} src={"https://gravatar.com/avatar/7fdc37318319569a920fd7d087c14d1f?s=400&d=robohash&r=x"}></Avatar>
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
                                            <Text className='TextEditor__Name' cls='Gerneral' fontSize='20px' content={'Email : ' + props.email} />
                                        </div>
                                        {!isAuthor &&
                                            <Row className='Profile__FollowNBell'>
                                                {!isFollow &&
                                                    <Col className='Profile__Follow' span={6} onClick={() => { Follow() }}>
                                                        <Tooltip arrowPointAtCenter={true} placement="top" title={"Follow " + user.name} color={'#000'}>
                                                            <UserAddOutlined className='Profile__Follow__Icon' style={{ fontSize: '20px' }} />
                                                            <Text cls='Small' fontSize='14px' content='Follow'></Text>
                                                        </Tooltip>
                                                    </Col>
                                                }
                                                {isFollow &&
                                                    <Col className='Profile__Follow' span={6} onClick={() => { Follow() }}>
                                                        <Tooltip arrowPointAtCenter={true} placement="top" title={"Follow " + user.name} color={'#000'}>
                                                            <UserDeleteOutlined className='Profile__Follow__Icon' style={{ fontSize: '20px' }} />
                                                            <Text cls='Small' fontSize='14px' content='Cancel'></Text>
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
                    </Media>
                    <Media at="md" className='Profile__Media'>
                        <Layout className='Profile__Layout__Inner'>

                            <Content className='Profile__Content'>
                                <Row className='Profile__Content__First__Row'>
                                    <Col span={6}>
                                        <div className={"Profile__Avatar__Outer"}>
                                            <Avatar className={"Profile__Avatar__Inner"} size={84} src={"https://gravatar.com/avatar/7fdc37318319569a920fd7d087c14d1f?s=400&d=robohash&r=x"}></Avatar>
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
                                            <Text className='TextEditor__Name' cls='Gerneral' fontSize='20px' content={'Email : ' + props.email} />
                                        </div>
                                        {!isAuthor &&
                                            <Row className='Profile__FollowNBell'>
                                                {!isFollow &&
                                                    <Col className='Profile__Follow' span={6} onClick={() => { Follow() }}>
                                                        <Tooltip arrowPointAtCenter={true} placement="top" title={"Follow " + user.name} color={'#000'}>
                                                            <UserAddOutlined className='Profile__Follow__Icon' style={{ fontSize: '20px' }} />
                                                            <Text cls='Small' fontSize='14px' content='Follow'></Text>
                                                        </Tooltip>
                                                    </Col>
                                                }
                                                {isFollow &&
                                                    <Col className='Profile__Follow' span={6} onClick={() => { Follow() }}>
                                                        <Tooltip arrowPointAtCenter={true} placement="top" title={"Follow " + user.name} color={'#000'}>
                                                            <UserDeleteOutlined className='Profile__Follow__Icon' style={{ fontSize: '20px' }} />
                                                            <Text cls='Small' fontSize='14px' content='Cancel'></Text>
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
                                {isAuthor && <Row className='Profile__Sider__Fir__Row__md'>
                                    <ToggleSwitch isSwitch={fansOrFollower} SwitchLeft='Following' SwitchRight="Fans" ChangeSwitch={() => changeFansSwitch()} />
                                </Row>}
                                {!isAuthor && <Row className='Profile__Sider__Fir__Row__md'>
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
                    </Media>
                    <Media at="lm" className='Profile__Media'>
                        <Layout className='Profile__Layout__Inner__lm'>

                            <Content className='Profile__Content'>
                                <Row className='Profile__Content__First__Row'>
                                <Col span={1}></Col>
                                    <Col span={4}>
                                        <div className={"Profile__Avatar__Outer"}>
                                            <Avatar className={"Profile__Avatar__Inner"} size={84} src={"https://gravatar.com/avatar/7fdc37318319569a920fd7d087c14d1f?s=400&d=robohash&r=x"}></Avatar>
                                            {isAuthor && <div className={"Profile__Avatar__Editor"} onClick={() => { setAvatarSelector(true) }}>
                                                <EditFilled />

                                            </div>
                                            }
                                        </div>
                                    </Col>
                                    <Col span={1}></Col>
                                    <Col className='Profile__NameNEmail' span={15}>
                                        <div className='Profile__TextEditor'>
                                            <TextEditor name={user.name}></TextEditor>
                                        </div>
                                        <div className='Profile__Email'>
                                            <Text className='TextEditor__Name' cls='Gerneral' fontSize='20px' content={'Email : ' + props.email} />
                                        </div>
                                        {!isAuthor &&
                                            <Row className='Profile__FollowNBell'>
                                                {!isFollow &&
                                                    <Col className='Profile__Follow' span={6} onClick={() => { Follow() }}>
                                                        <Tooltip arrowPointAtCenter={true} placement="top" title={"Follow " + user.name} color={'#000'}>
                                                            <UserAddOutlined className='Profile__Follow__Icon' style={{ fontSize: '20px' }} />
                                                            <Text cls='Small' fontSize='14px' content='Follow'></Text>
                                                        </Tooltip>
                                                    </Col>
                                                }
                                                {isFollow &&
                                                    <Col className='Profile__Follow' span={6} onClick={() => { Follow() }}>
                                                        <Tooltip arrowPointAtCenter={true} placement="top" title={"Follow " + user.name} color={'#000'}>
                                                            <UserDeleteOutlined className='Profile__Follow__Icon' style={{ fontSize: '20px' }} />
                                                            <Text cls='Small' fontSize='14px' content='Cancel'></Text>
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
                                <div className="Profile__Fans__lm">
                                    <FansNFollower fans={fansNum} following={followingNum}></FansNFollower>
                                </div>
                                <div className='Profile__Strength__lm'>
                                    <StrengthEditor strength={strength} delete={(key) => { DeleteStrength(key) }} add={(tag) => (AddStrength(tag))} isAuthor={isAuthor}></StrengthEditor>
                                </div>
                                <div className='Profile__Introduction__lm'>
                                    <IntroductionEditor edit={(content) => { SaveProfile(content) }} content={profile} isAuthor={isAuthor}></IntroductionEditor>
                                </div>
                                {isAuthor && <Row className='Profile__Sider__Fir__Row__lm'>
                                    <ToggleSwitch isSwitch={fansOrFollower} SwitchLeft='Following' SwitchRight="Fans" ChangeSwitch={() => changeFansSwitch()} />
                                </Row>}
                                {!isAuthor && <Row className='Profile__Sider__Fir__Row__lm'>
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
                            </Content>

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
                    </Media>
                    <Media at="sm" className='Profile__Media'>
                        <Layout className='Profile__Layout__Inner__sm'>

                            <Content className='Profile__Content'>
                                <Row className='Profile__Content__First__Row'>
                                    <Col span={5}>
                                        <div className={"Profile__Avatar__Outer"}>
                                            <Avatar className={"Profile__Avatar__Inner"} size={84} src={"https://gravatar.com/avatar/7fdc37318319569a920fd7d087c14d1f?s=400&d=robohash&r=x"}></Avatar>
                                            {isAuthor && <div className={"Profile__Avatar__Editor"} onClick={() => { setAvatarSelector(true) }}>
                                                <EditFilled />

                                            </div>
                                            }
                                        </div>
                                    </Col>
                                    <Col span={1}></Col>
                                    <Col className='Profile__NameNEmail' span={18}>
                                        <div className='Profile__TextEditor'>
                                            <TextEditor name={user.name}></TextEditor>
                                        </div>
                                        <div className='Profile__Email'>
                                            <Text className='TextEditor__Name' cls='Gerneral' fontSize='20px' content={'Email : ' + props.email} />
                                        </div>
                                        {!isAuthor &&
                                            <Row className='Profile__FollowNBell'>
                                                {!isFollow &&
                                                    <Col className='Profile__Follow' span={6} onClick={() => { Follow() }}>
                                                        <Tooltip arrowPointAtCenter={true} placement="top" title={"Follow " + user.name} color={'#000'}>
                                                            <UserAddOutlined className='Profile__Follow__Icon' style={{ fontSize: '20px' }} />
                                                            <Text cls='Small' fontSize='14px' content='Follow'></Text>
                                                        </Tooltip>
                                                    </Col>
                                                }
                                                {isFollow &&
                                                    <Col className='Profile__Follow' span={6} onClick={() => { Follow() }}>
                                                        <Tooltip arrowPointAtCenter={true} placement="top" title={"Follow " + user.name} color={'#000'}>
                                                            <UserDeleteOutlined className='Profile__Follow__Icon' style={{ fontSize: '20px' }} />
                                                            <Text cls='Small' fontSize='14px' content='Cancel'></Text>
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
                                {isAuthor && <Row className='Profile__Sider__Fir__Row__sm'>
                                    <ToggleSwitch isSwitch={fansOrFollower} SwitchLeft='Following' SwitchRight="Fans" ChangeSwitch={() => changeFansSwitch()} />
                                </Row>}
                                {!isAuthor && <Row className='Profile__Sider__Fir__Row__sm'>
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
                            </Content>

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
                    </Media>
                </MediaContextProvider>


            }

        </>
    );


}

export default ProfilePage;