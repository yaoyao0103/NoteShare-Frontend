import React, { useEffect } from 'react'
import { Layout, Row, Col, List, Empty, Input, Avatar } from 'antd';
import "./DetailNotice.css"
import { CloseOutlined } from "@ant-design/icons";
import Text from '../Text/Text';
const { Header, Content, Sider, Footer } = Layout;

const DetailNotice = (props) => {
    const { setNoticeShow, kickUser } = props;

    return (
        <Layout className='detailNotice__Layout'>
            <Header className='detailNotice__Header'>
                <Text className="detailNotice__Header__Title" color='black' cls='Default' content={"Vote:"} fontSize='22' />
                <Text className="detailNotice__Header__Title" color='black' cls='Small' content={"Kick "} fontSize='22' />
                <p className='detailNotice__Header__Title'>
                    <Avatar className='detailNotice__Header__Avatar' style={{cursor:"pointer", marginRight:".5em"}} size={30} src={"https://gravatar.com/avatar/7fdc37318319569a920fd7d087c14d1f?s=400&d=robohash&r=x"} onClick={() => props.setPageProps({page: 'ProfilePage', email: kickUser.userObjEmail})}></Avatar>
                    <Text className='detailNotice__Header__Name' color='black' cls='Default' content={kickUser.userObjName} fontSize='15' display="inline-block" />
                </p> 
                
                {/* <Text className="detailNotice__Header__Title" color='red' cls='Default' content={kickUser} fontSize='22' /> */}
                <Text className="detailNotice__Header__Title" color='black' cls='Small' content={"out of group!!"} fontSize='22' />
                <CloseOutlined onClick={() => { setNoticeShow(false) }}/>
            </Header>
            <Layout>
                {props.children}
            </Layout>
        </Layout>
    )
}

export default DetailNotice;