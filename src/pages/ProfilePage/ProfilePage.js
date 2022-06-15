import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import { Layout, Avatar, Modal, message } from "antd";
import { EditFilled, ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import './ProfilePage.css'
import TextEditor from '../../components/TextEditor/TextEditor';
import StrengthEditor from '../../components/StrengthEditor/StrengthEditor';
import Text from '../../components/Text/Text';
import FansNFollower from '../../components/FansNFollower/FansNFollower';
import IntroductionEditor from '../../components/IntroductionEditor/IntroductionEditor';
const { Header, Sider, Content, Footer } = Layout;

function ProfilePage() {
    const [Page, setPage] = useState('ProfilePage');
    const [avatarSelector, setAvatarSelector] = useState(false);
    const [avatar,setAvatar]=useState();
    const [avatarCurrent,setAvatarCurrent]=useState(0);
    const Avatars = ["https://joeschmoe.io/api/v1/james", "https://joeschmoe.io/api/v1/jude", "https://joeschmoe.io/api/v1/jana",
        "https://joeschmoe.io/api/v1/jabala", "https://joeschmoe.io/api/v1/jacques", "https://joeschmoe.io/api/v1/jed", "https://joeschmoe.io/api/v1/jon",
        "https://joeschmoe.io/api/v1/jane", "https://joeschmoe.io/api/v1/julie", "https://joeschmoe.io/api/v1/jess", "https://joeschmoe.io/api/v1/jordan",
        "https://joeschmoe.io/api/v1/jake", "https://joeschmoe.io/api/v1/jocelyn", "https://joeschmoe.io/api/v1/josh", "https://joeschmoe.io/api/v1/jazebelle",
        "https://joeschmoe.io/api/v1/josephine","https://joeschmoe.io/api/v1/jeri","https://joeschmoe.io/api/v1/jolee","https://joeschmoe.io/api/v1/jenni",
        "https://joeschmoe.io/api/v1/jia","https://joeschmoe.io/api/v1/jaqueline","https://joeschmoe.io/api/v1/joe","https://joeschmoe.io/api/v1/jean",
        "https://joeschmoe.io/api/v1/jerry","https://joeschmoe.io/api/v1/jai","https://joeschmoe.io/api/v1/jack","https://joeschmoe.io/api/v1/jeane",
        "https://joeschmoe.io/api/v1/jodi",
    ];
    function activateItem(t){ 
       
        t.className += " Active__Avatar"; 
     } 
    const AvatarsList=[];
    for (let i = 0; i <= Avatars.length - 1; i++) {
        let temp=-1;
        if(avatar==i)
        temp='Profile__AvatarSelector__Avatar__Active';
        else{
            temp='Profile__AvatarSelector__Avatar';
        }
        AvatarsList.push(<Avatar className={temp} size={84} src={Avatars[i]} onClick={()=>{setAvatar(i);}}></Avatar>)
    };
    const SaveAvatar = () => {
        setAvatarCurrent(avatar);
        message.info('Change avatar');
    }
    useEffect(() => {
        setPage('ProfilePage');
    }, [Page]);
    return (
        <div className='Profile'>
            <Navbar currPage={Page} changePage={(page) => { setPage(page) }} />
            <Layout className='Profile__Layout__Outer'>
                <Layout className='Profile__Layout__Inner'>
                    <Content className='Profile__Content'>
                        <div className={"Profile__Avatar__Outer"}>
                            <Avatar className={"Profile__Avatar__Inner"} size={84} src={Avatars[avatarCurrent]}></Avatar>
                            <div className={"Profile__Avatar__Editor"} onClick={() => { setAvatarSelector(true) }}>
                                <EditFilled />
                            </div>
                        </div>
                        <div className="Profile__Fans">
                            <FansNFollower></FansNFollower>
                        </div>

                    </Content>
                    <Sider className='Profile__Sider' width='75%'>
                        <div className='Profile__FirNSec__Row'>
                            <div className='Profile__TextEditor'>
                                <TextEditor ></TextEditor>
                            </div>
                            <div className='Profile__Email'>
                                <Text className='TextEditor__Name' cls='Gerneral' fontSize='26' content={'Email : ' + ' a147896325811@gmail.com'} />
                            </div>
                        </div>

                        <div className='Profile__Strength'>
                            <StrengthEditor></StrengthEditor>
                        </div>
                        <div className='Profile__Introduction'>
                            <IntroductionEditor></IntroductionEditor>
                        </div>
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
            </Layout>
        </div>
    );


}

export default ProfilePage;