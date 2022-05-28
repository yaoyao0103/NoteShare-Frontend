import React, { useState } from "react";
import { Layout, Row, Col } from "antd";
import { EllipsisOutlined } from '@ant-design/icons';
import Text from "../Text/Text";
import { Avatar } from 'antd';
import './Information.css'
const { Header, Content, Sider } = Layout;

function Information() {
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
        <Row id='qnaContent__Information__Row' className='qnaContent__Information__Row'>
            <Col id='qnaContent__School' className='qnaContent__School' >
                <Text color='black' cls='Small' content={school} fontSize='17' display="inline-block" />
            </Col>
            <Col id='qnaContent__Department' className='qnaContent__Departmentl'>
                <Text color='black' cls='Small' content={department} fontSize='17' display="inline-block" />
            </Col>
            <Col id='qnaContent__Subject' className='qnaContent__Subject'>
                <Text color='black' cls='Small' content={subject} fontSize='17' display="inline-block" />
            </Col>
        </Row>
    );
}
export default Information;