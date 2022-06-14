import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import { Layout, Avatar, Row, Col, Card, Statistic } from "antd";
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
                            <Avatar className={"Profile__Avatar__Inner"} size={84} src="https://joeschmoe.io/api/v1/random"></Avatar>
                            <div className={"Profile__Avatar__Editor"}>
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
                </Layout>
            </Layout>
        </div>
    );


}

export default ProfilePage;