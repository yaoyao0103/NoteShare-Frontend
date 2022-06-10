import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import { Layout, Avatar, Row,Col } from "antd";
import { EditFilled } from '@ant-design/icons';
import './ProfilePage.css'
import Text from '../../components/Text/Text';
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
                            <Avatar className={"Profile__Avatar__Inner"} size={96} src="https://joeschmoe.io/api/v1/random"></Avatar>
                            <div className={"Profile__Avatar__Editor"}>
                                <EditFilled />
                            </div>

                        </div>


                    </Content>
                    <Sider className='Profile__Sider' width='75%'>
                        <Row className='Profile__First__Row'>
                            <Col className='Profile__Name' span={20}>
                            <Text cls='Gerneral' fontSize='32' content={'名字 : Plusx'} />
                            </Col>
                            <Col className='Profile__Name__Editor' span={4}>
                            <EditFilled style={{ fontSize: '32px' }} />
                            </Col>
                        </Row>
                        <Row className='Profile__Sec__Row'>
                            <Col className='Profile__Name' span={20}>
                            <Text cls='Gerneral' fontSize='32' content={'名字 : Plusx'} />
                            </Col>
                            <Col className='Profile__Name__Editor' span={4}>
                            <EditFilled style={{ fontSize: '32px' }} />
                            </Col>
                        </Row>
                        <Row className='Profile__Trd__Row'>
                            <Col className='Profile__Name' span={20}>
                            <Text cls='Gerneral' fontSize='32' content={'名字 : Plusx'} />
                            </Col>
                            <Col className='Profile__Name__Editor' span={4}>
                            <EditFilled style={{ fontSize: '32px' }} />
                            </Col>
                        </Row>
                        <Row className='Profile__Fourth__Row'>
                            <Col className='Profile__Name' span={20}>
                            <Text cls='Gerneral' fontSize='32' content={'名字 : Plusx'} />
                            </Col>
                            <Col className='Profile__Name__Editor' span={4}>
                            <EditFilled style={{ fontSize: '32px' }} />
                            </Col>
                        </Row>
                    </Sider>
                </Layout>
            </Layout>
        </div>
    );


}

export default ProfilePage;