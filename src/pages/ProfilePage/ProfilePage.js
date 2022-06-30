import React, { useState, useEffect, useTransition } from 'react';
import { Layout, Avatar, Modal, message, Row, Col, Divider, Spin } from "antd";
import { EditFilled, UserAddOutlined, LoadingOutlined } from '@ant-design/icons';
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

function ProfilePage(props) {
    const page = 'ProfilePage';
    const [user, setUser] = useState({});
    const [getUserSuccess, setGetUserSuccess] = useState(false);

    const [avatarSelector, setAvatarSelector] = useState(false);
    const [avatar, setAvatar] = useState();
    const [strength,setStrength]=useState([]);
    const [profile,setProfile]=useState('');


    const [fansOrFollower, setFansOrFollower] = useState(true);//true代表fans,folder
    const [folderList, setFolderList] = useState([]);
    const [avatarCurrent, setAvatarCurrent] = useState(0);

    const [getFolderByIdSuccess, setGetFolderByIdSuccess] = useState(false);
    const [isRoot, setIsRoot] = useState(false);
    const [currentFolderId, setCurrentFolderId] = useState('');
    const [email, setEmail] = useState('');
    const [isAuthor,setIsAuthor] = useState(false);

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
            setGetFolderByIdSuccess(false);
            setFansOrFollower(false);
        }
        else {
            setGetFolderByIdSuccess(false);
            setFansOrFollower(true);
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

    const getFolderById = (id) => {
        axios.get("http://localhost:8080/folder/" + id, {
        }).then(res => {
            const list = res.data.res.children.concat(res.data.res.notes);
            //console.log(list);
            setFolderList(list);
            if (res.data.res.parent === null)
                setIsRoot(true);
            else
                setIsRoot(false);
            setGetFolderByIdSuccess(true);
        }).catch((error) => {
            //console.log(error.response.error);
        })
    };

    const SaveAvatar = () => {
        setAvatarCurrent(avatar);
        message.info('Change avatar');
    }

    const SaveProfile=(content)=>{
        axios.put("http://localhost:8080/user/profile/" +email, {profile:content}).then(res => {
            setProfile(content);
        }).catch((error) => {
            console.log(error.response.error);
        })
    };

    const AddStrength=(tag)=>{
        console.log(tag);
        const tags=[...strength,tag];
        axios.put("http://localhost:8080/user/strength/" +email, {strength:tags}).then(res => {
            console.log(...strength,tag);
            setStrength(oldArray =>[...oldArray, tag]);
        }).catch((error) => {
            console.log(error.response.error);
        })
    }
    const DeleteStrength=(key)=>{
        const tags=[...strength.slice(0, key), ...strength.slice(key + 1, strength.length)]
        axios.put("http://localhost:8080/user/strength/" +email, {strength:tags}).then(res => {
            setStrength(oldArray => [...oldArray.slice(0, key), ...oldArray.slice(key + 1, strength.oldArray)]);
        }).catch((error) => {
            console.log(error.response.error);
        })
    }

    const ClickBack = (id) => {
        axios.get("http://localhost:8080/folder/" + id, {
        }).then(res => {
            setCurrentFolderId(res.data.res.parent);
        }).catch((error) => {
            console.log(error.response.error);
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

    function getAllFolder(tempEmail) {
        axios.get("http://localhost:8080/folder/root/" + tempEmail, {
        }).then(res => {
            console.log(res.data.res[2]);
            getFolderById(res.data.res[2].id);
            setIsRoot(true);
        }).catch((error) => {
            //console.log(error.response.data);
            //setGetFolderFail(true);   
        });
    };

    function getAllNote(tempEmail) {
        axios.get("http://localhost:8080/note/all/" + tempEmail, {
        }).then(res => {
            setFolderList(res.data.res);
            setCurrentFolderId('0');
            setGetFolderByIdSuccess(true);
        }).catch((error) => {
            //console.log(error.response.data);
            //setGetFolderFail(true);
        });
    };

    function getUserByEmail(tempEmail) {

        axios.get("http://localhost:8080/user/" + tempEmail, {
        }).then(res => {
            setUser(res.data.res);
            // console.log(res.data.res.name);
            setProfile(res.data.res.profile);
            setStrength(res.data.res.strength);
            setGetUserSuccess(true);
        }).catch((error) => {
            console.log(error);
        });
    };

    useEffect(() => {
        let cookieParser = new Cookie(document.cookie);
        let tempEmail = cookieParser.getCookieByName('email')
        tempEmail = Base64.decode(tempEmail);
        if (tempEmail === props.email)
            setIsAuthor(true);
        setEmail(tempEmail);
        if (fansOrFollower && !isAuthor)
            getAllFolder(tempEmail);
        else if (!fansOrFollower && !isAuthor)
            getAllNote(tempEmail);
        if (!getUserSuccess)
            getUserByEmail(tempEmail);
    }, [props, fansOrFollower]);

    useEffect(() => {

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
                                    <Avatar className={"Profile__Avatar__Inner"} size={84} src={'https://joeschmoe.io/api/v1/' + user.headshotPhoto}></Avatar>
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
                                    <Text className='TextEditor__Name' cls='Gerneral' fontSize='20' content={'Email : ' + email} />
                                </div>
                                {!isAuthor && <div className='Profile__Follow'>
                                    <UserAddOutlined className='Profile__Follow__Icon' style={{ fontSize: '20px' }} />
                                    <Text cls='Small' fontSize={'14'} content='追蹤'></Text>
                                </div>
                                }
                            </Col>
                        </Row>
                        <div className="Profile__Fans">
                            <FansNFollower fans={user.fans.length} follower={user.subscribe.length}></FansNFollower>
                        </div>
                        <div className='Profile__Strength'>
                            <StrengthEditor strength={strength} delete={(key)=>{DeleteStrength(key)}}add={(tag)=>(AddStrength(tag))}isAuthor={isAuthor}></StrengthEditor>
                        </div>
                        <div className='Profile__Introduction'>
                            <IntroductionEditor edit={(content)=>{SaveProfile(content)}}content={profile} isAuthor={isAuthor}></IntroductionEditor>
                        </div>
                    </Content>

                    <Sider className='Profile__Sider' width='60%'>
                        <Spin className='signUpPage__Spin' indicator={antIcon} spinning={!getFolderByIdSuccess}>
                            {isAuthor && <Row className='Profile__Sider__Fir__Row'>
                                <ToggleSwitch SwitchLeft='Follower' SwitchRight="Fans" ChangeSwitch={() => changeFansSwitch()} />
                            </Row>}
                            {!isAuthor && <Row className='Profile__Sider__Fir__Row'>
                                <ToggleSwitch SwitchLeft='Note' SwitchRight="Folder" ChangeSwitch={() => changeFansSwitch()} />
                            </Row>}
                            <Divider />
                            {isAuthor && fansOrFollower && <div className='Profile_Sider__Main_Content'>
                                <FansNFollowerEditor Name='James' Avatar='https://joeschmoe.io/api/v1/james' isFans={fansOrFollower} />
                                <FansNFollowerEditor Name='Jude' Avatar='https://joeschmoe.io/api/v1/jude' isFans={fansOrFollower} />


                            </div>}
                            {isAuthor && !fansOrFollower && <div className='Profile_Sider__Main_Content'>
                                <FansNFollowerEditor Name='James' Avatar='https://joeschmoe.io/api/v1/james' isFans={fansOrFollower} />
                                <FansNFollowerEditor Name='Jude' Avatar='https://joeschmoe.io/api/v1/jude' isFans={fansOrFollower} />
                            </div>}
                            {!isAuthor && getFolderByIdSuccess && fansOrFollower && <div className='Profile_Sider__Main_Content'>
                                <FolderCard folderList={folderList} isFolder={true} isRoot={isRoot} clickBack={(id) => { ClickBack(id) }} clickFolder={(id) => { setCurrentFolderId(id); }} />

                            </div>}

                            {!isAuthor && !fansOrFollower && getFolderByIdSuccess && <div className='Profile_Sider__Main_Content'>
                                <FolderCard folderList={folderList} isFolder={true} isRoot={isRoot} clickBack={(id) => { ClickBack(id) }} clickFolder={(id) => { setCurrentFolderId(id); }} />

                            </div>}
                        </Spin>
                    </Sider>

                    <Modal
                        title="Choose your avatar"
                        centered
                        visible={avatarSelector}
                        onOk={() => SaveAvatar()}
                        onCancel={() => setAvatarSelector(false)}
                        okText="Save"
                        cancelText="Cancel"
                        width={590}
                    >
                        {AvatarsList}

                    </Modal>
                </Layout>
            }
        </>
    );


}

export default ProfilePage;