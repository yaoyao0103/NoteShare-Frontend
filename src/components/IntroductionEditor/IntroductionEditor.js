import React, { useState, useEffect } from 'react';
import { Input, Row, Col, Card, Statistic } from "antd";
import { UserOutlined, EditFilled, SaveOutlined } from '@ant-design/icons';
import Text from '../Text/Text';
import Button from '../Button/Button';
import { message } from 'antd';
import './IntroductionEditor.css'
const { TextArea } = Input;
function IntroductionEditor(props) {
    const [editing, setEditing] = useState(false);
    const [introduction, setIntroduction] = useState('');
    const Save = () => {
        // setName(value);
        props.edit(introduction);
        setEditing(false);
        //message.success('Save Introduction');
    }
    return (
        <div className='IntroductionEditor'>
            <Text className='IntroductionEditor__Title' cls='Gerneral' fontSize='20' content={'Introduction :'} />
            {!editing&&props.isAuthor &&
                <EditFilled className='IntroductionEditor__Editor' style={{ fontSize: '16px' }} onClick={() => { setEditing(true); }} />}
            {!editing &&
                <div className='IntroductionEditor__Name'>
                    <Text cls='Gerneral' fontSize='16' display={'flex'} content={props.content} />
                </div>}

            {editing&&props.isAuthor &&
                <TextArea rows={6} size='small'className='IntroductionEditor__Input' placeholder='Enter your new name' defaultValue={props.content} onChange={(e) => { const introduction = e.target.value; setIntroduction(introduction) }}/>}
            {editing&&props.isAuthor &&
                <div className="IntroductionEditor__Save" onClick={() => Save()}>
                    <Button color={"green"}><Text color='white' cls='Large' content={"Save"} fontSize='14' display="inline-block" /></Button>
                </div>}
        </div>
    );
}
export default IntroductionEditor;