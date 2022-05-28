import React, { useState } from "react";
import { Layout, Row, Col } from "antd";
import { EllipsisOutlined } from '@ant-design/icons';
import Text from "../Text/Text";
import { Avatar } from 'antd';
import './Title.css'
const { Header, Content, Sider } = Layout;

function Title() {
    const author = 'Ting';
    const type = 'QA'
    const date = '2022-03-06';/*後端傳的是全部的要切*/
    const title = 'Interrupt vs trap';
    const school = '國立台灣海洋大學';
    const department = 'Computer Science';
    const subject = 'Operating System';
    const content = '可以解釋硬體中斷跟軟體中斷嗎？霸脫42419945492549519459154935456495649659469546956465946954'
    const price = 20;
    const comments = {
        "id": {
            "timestamp": 1650618885,
            "date": "2022-04-22T09:14:45.000+00:00"
        },
        "author": "Ting",
        "email": "00853129@email.ntou.edu.tw",
        "content": "豪棒",
        "likeCount": 0,
        "liker": [],
        "referenceNotesURL": [],
        "floor": 0,
        "date": "2022-03-06T14:53:08.137+00:00",
        "reference": false,
        "best": false

    };
    return (
        <div id='Title' className="Title">
            <Row id='Title__Row__First' className='Titile__Row__First' >
                <Col id='Title__Author' className='Title__Author' flex={3}><Text color='black' cls='Small' content={author} fontSize='20'></Text></Col>
                <Col id='Title__Date' className='Title__Date' span={24}><Text color='black' cls='Small' content={date} fontSize='12' display="inline-block" /></Col>
            </Row>
            <Row id='Title__Row__Sec' className='Titile__Row__Sec'>
                <Col id='Title__Title' className="Title__Title" flex={3}><Text color='black' cls='large' content={title} fontSize='25' display="inline-block" /></Col>
            </Row>
        </div>
        );
}
export default Title;