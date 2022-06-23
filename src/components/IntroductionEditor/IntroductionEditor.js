import React, { useState, useEffect } from 'react';
import { Input, Row, Col, Card, Statistic } from "antd";
import { UserOutlined, EditFilled, SaveOutlined } from '@ant-design/icons';
import Text from '../Text/Text';
import Button from '../Button/Button';
import { message } from 'antd';
import './IntroductionEditor.css'
const { TextArea } = Input;
function IntroductionEditor() {
    const [editing, setEditing] = useState(false);
    const [introduction, setIntroduction] = useState('您好，我是林祈安，畢業於政治大學的企業管理學系，專長是專案管理與內容行銷，對行銷擁有極大的熱情，並具備分析、解決問題的能力，以及開放積極的特質。我在大學時，曾在蝦皮的行銷部門擔任實習生，負責社群經營及線上活動執行......。');
    const Save = () => {
        // setName(value);
        setEditing(false);
        message.info('Save Introduction');
    }
    return (
        <div className='IntroductionEditor'>
            <Text className='IntroductionEditor__Title' cls='Gerneral' fontSize='26' content={'Introduction :'} />
            {!editing &&
                <EditFilled className='IntroductionEditor__Editor' style={{ fontSize: '22px' }} onClick={() => { setEditing(true); }} />}
            {!editing &&
                <div className='IntroductionEditor__Name'>
                    <Text cls='Gerneral' fontSize='22' display={'flex'} content={introduction} />
                </div>}

            {editing &&
                <TextArea rows={8} className='IntroductionEditor__Input' placeholder='Enter your new name' defaultValue={introduction} onChange={(e) => { const introduction = e.target.value; setIntroduction(introduction) }}/>}
            {editing &&
                <div className="IntroductionEditor__Save" onClick={() => Save()}>
                    <Button color={"green"}><Text color='white' cls='Large' content={"Save"} fontSize='17' display="inline-block" /></Button>
                </div>}
        </div>
    );
}
export default IntroductionEditor;