import React from 'react'
import { Layout, Row, Col, List, Empty, Input } from 'antd';
import "./DetailNotice.css"
import { CloseOutlined } from "@ant-design/icons";
import Text from '../Text/Text';
const { Header, Content, Sider, Footer } = Layout;

const DetailNotice = (props) => {
    const { setNoticeShow } = props;
    return (
        <Layout className='detailNotice__Layout'>
            <Header className='detailNotice__Header'>
                <Text className="detailNotice__Header__Title" color='black' cls='Default' content={"Vote:"} fontSize='22' />
                <Text className="detailNotice__Header__Title" color='black' cls='Small' content={"Kick "} fontSize='22' />
                <Text className="detailNotice__Header__Title" color='red' cls='Default' content={props.kickUser} fontSize='22' />
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