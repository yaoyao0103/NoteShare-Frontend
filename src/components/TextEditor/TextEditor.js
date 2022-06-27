import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import { Input, message } from "antd";
import { EditFilled, SaveOutlined } from '@ant-design/icons';
import './TextEditor.css'
import Text from '../Text/Text';
function TextEditor(props) {
    const [editing, setEditing] = useState(false);
    const [name, setName] = useState('Plusx');
    // const Name='Plusx';//之後改成props
    // const setName=(name)=>{
    //     Name=name;
    // }
    const value = useRef('');
    const Save = () => {
        // setName(value);
        setEditing(false);
        message.info('Reset your name');
    }
    // useEffect(() => {

    // }, [editing]);
    return (
        <div className='TextEditor'>
            <Text className='TextEditor__Title' cls='Gerneral' fontSize='22' content={'Name :'} />
            {!editing &&
                <div className='TextEditor__Name'>
                    <Text  cls='Gerneral' fontSize='22' content={name} />
                </div>}
            {(!editing&&props.isAuthor) &&
                <EditFilled className='TextEditor__Editor' style={{ fontSize: '18px' }} onClick={() => { setEditing(true); }} />}
            {editing&&props.isAuthor &&
                <Input className='TextEditor__Input' placeholder='Enter your new name' defaultValue='Plusx' onChange={(e) => { const name = e.target.value; setName(name) }} />}
            {editing&&props.isAuthor &&
                <SaveOutlined className='TextEditor__Save' style={{ fontSize: '22px' }} onClick={() => { Save(); }} />}
        </div>
    );

}
export default TextEditor;